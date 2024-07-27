# Change Log

All notable changes to the "Git Exclude Watcher" extension will be documented in this file.

## [1.0.0] - <2024.07.26>

### Added

- Initial release of the Git Exclude Watcher extension.
- Provides automatic Git status refresh for files affected by changes in `.git/info/exclude`.

## [1.0.1] - <2024.07.27>

### Fixed

- Improved performance and readability of the code:
  - Combined the initialization logic of watchers into a single function `checkAndSetupWatchers`.
  - Simplified the check for the existence of the `.git` folder and the `exclude` file.
  - Removed duplicate code fragments for better readability and easier maintenance.
  - Optimized handling of file change events in `.git` and `.git/info/exclude`.
