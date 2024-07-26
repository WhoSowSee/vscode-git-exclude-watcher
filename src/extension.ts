import * as vscode from 'vscode'
import * as path from 'path'
import * as fs from 'fs/promises'
import { watch } from 'fs'
import debounce from 'lodash/debounce'

export function activate(context: vscode.ExtensionContext) {
	const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath
	if (!workspaceFolder) {
		vscode.window.showErrorMessage('No workspace folder found')
		return
	}

	const excludeFilePath = path.join(workspaceFolder, '.git', 'info', 'exclude')

	fs.access(excludeFilePath)
		.then(() => {
			const watcher = watch(excludeFilePath)

			const refreshGitStatus = debounce(async () => {
				try {
					await vscode.commands.executeCommand('git.refresh')
				} catch (err) {
					vscode.window.showErrorMessage(`Failed to refresh Git status: ${err}`)
				}
			}, 400)

			watcher.on('change', refreshGitStatus)

			context.subscriptions.push({
				dispose: () => {
					watcher.close()
					refreshGitStatus.cancel()
				},
			})
		})
		.catch(() => {
			vscode.window.showErrorMessage(`File ${excludeFilePath} does not exist`)
		})
}

export function deactivate() {}
