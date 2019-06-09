const vscode = require('vscode')
const runtime = require('./runtime.js')

const activate = context => {
  context.subscriptions.push(vscode.commands.registerCommand('extension.mikutap', () => runtime.activate(context)))
}
exports.activate = activate

const deactivate = () => {}
exports.deactivate = deactivate