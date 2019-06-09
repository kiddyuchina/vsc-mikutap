const fs = require("fs");
const ws = require("ws");
const path = require("path");
const events = require("events");
const vscode = require("vscode");

const DuplexChannel = context => {
  let webSocket = null;

  const webSocketd = new ws.Server({ port: 17831 }).once(
    "connection",
    connection => {
      webSocket = connection.on("close", () => runtime.event.emit("suspend"));
    }
  );

  return {
    dispose: () => webSocketd.close(),
    postMessage: (command, data) => {
      if (webSocket) webSocket.send(JSON.stringify({ command, data }));
    }
  };
};

const WebviewPanel = context => {
  const panel = vscode.window.createWebviewPanel(
    "mikutap",
    "Mikutap",
    { preserveFocus: false, viewColumn: vscode.ViewColumn.One },
    { enableScripts: true, retainContextWhenHidden: true }
  );
  panel.webview.html = fs
    .readFileSync(
      vscode.Uri.file(path.join(context.extensionPath, "index.html")).fsPath,
      "utf-8"
    )
    .replace(
      "<base>",
      `<base href="${vscode.Uri.file(
        path.join(context.extensionPath, "/")
      ).with({ scheme: "vscode-resource" })}">`
    );
  return {
    dispose: () => panel.dispose()
  };
};

const runtime = {
  event: null,
  webviewPanel: null,
  duplexChannel: null,
  dispose: () => {
    Object.keys(runtime)
      .filter(key => typeof runtime[key] != "function" && runtime[key])
      .forEach(key => {
        if (typeof runtime[key].dispose === "function") runtime[key].dispose();
        runtime[key] = null;
      });
  },
  activate: context => {
    if (runtime.webviewPanel) return;

    runtime.event = new events.EventEmitter();
    runtime.duplexChannel = DuplexChannel(context);
    runtime.webviewPanel = WebviewPanel(context);

    vscode.workspace.onDidChangeTextDocument(event => {
      let key =
        event.contentChanges[0].text === ""
          ? "0"
          : event.contentChanges[0].text.toUpperCase().charCodeAt(0);
      key = 65 <= key ? key - 55 : 48 <= key ? key - 48 : key;
      runtime.duplexChannel.postMessage("click", {
        key: key
      });
    });

    runtime.event.on("suspend", () => runtime.dispose());
  }
};

module.exports = runtime;
