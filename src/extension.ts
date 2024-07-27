import * as vscode from 'vscode'
import * as path from 'path'
import * as fs from 'fs'

export function activate(context: vscode.ExtensionContext) {
	const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath
	if (!workspaceFolder) {
		return
	}

	const gitFolderPath = path.join(workspaceFolder, '.git')
	const excludeFilePath = path.join(gitFolderPath, 'info', 'exclude')

	const refreshGitStatus = async () => {
		try {
			await vscode.commands.executeCommand('git.refresh')
		} catch (err) {
			console.error(`Failed to refresh Git status: ${err}`)
		}
	}

	const setupExcludeFileWatcher = () => {
		if (fs.existsSync(excludeFilePath)) {
			const watcher = fs.watch(excludeFilePath, (eventType, filename) => {
				if (filename && eventType === 'change') {
					refreshGitStatus()
				}
			})

			context.subscriptions.push({
				dispose: () => watcher.close(),
			})
		}
	}

	const setupGitWatcher = () => {
		const gitWatcher = vscode.workspace.createFileSystemWatcher(
			new vscode.RelativePattern(workspaceFolder, '.git/**')
		)

		gitWatcher.onDidCreate(uri => {
			if (uri.fsPath === excludeFilePath) {
				setupExcludeFileWatcher()
			}
		})

		gitWatcher.onDidChange(uri => {
			if (uri.fsPath === excludeFilePath) {
				refreshGitStatus()
			}
		})

		context.subscriptions.push(gitWatcher)
	}

	const checkAndSetupWatchers = () => {
		if (fs.existsSync(gitFolderPath)) {
			setupGitWatcher()
			setupExcludeFileWatcher()
		} else {
			const checkGitFolderExistence = setInterval(() => {
				if (fs.existsSync(gitFolderPath)) {
					clearInterval(checkGitFolderExistence)
					setupGitWatcher()
					setupExcludeFileWatcher()
				}
			}, 1000)

			context.subscriptions.push({
				dispose: () => clearInterval(checkGitFolderExistence),
			})
		}
	}

	checkAndSetupWatchers()
}

export function deactivate() {}
