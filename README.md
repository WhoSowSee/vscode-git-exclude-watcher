# Git Exclude Watcher

Git Exclude Watcher is a Visual Studio Code extension that addresses the issue with the `.git/info/exclude` file by automatically refreshing the Git status of affected files when this file is modified.

## Requirements

!This extension only works if Microsoft's built-in Git extension (vscode.git) is enabled in Visual Studio Code!

## The Problem

In Visual Studio Code, there is a known issue where changes to the `.git/info/exclude` file are not immediately reflected in the editor's Git status view. For example, if you add a file or directory to `.git/info/exclude` to ignore it, the file may still appear as modified (marked with 'M') or untracked (marked with 'U') in the Source Control view. This issue requires manually refreshing VS Code or interacting with the ignored file to update its status.

## The Solution

The Git Exclude Watcher extension solves this problem by:

- **Monitoring the `.git/info/exclude` file**: Constantly watches for any changes made to this file within your workspace folders.
- **Identifying affected files**: When changes are detected, the extension intelligently determines which files are affected by the new exclude patterns.
- **Refreshing Git status**: Automatically triggers a Git status refresh for all affected files, ensuring their status in the Source Control view is updated immediately.

## Benefits

- **Seamless workflow**: No more manual refreshes or file interactions needed to update Git status after modifying `.git/info/exclude`.
- **Accurate Git status**: Always see the correct Git status for your files, even when using `.git/info/exclude` for local ignores.
- **Improved productivity**: Focus on your code without distractions caused by outdated Git status information.

## Usage

Once installed, the extension automatically starts working in the background. It will monitor all your workspace folders for `.git/info/exclude` changes and refresh Git status accordingly.
