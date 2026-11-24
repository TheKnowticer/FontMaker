# Glyphwright desktop

## Install and run

Run `release\Glyphwright Setup 1.0.0.exe` on 64-bit Windows. The installer includes the app and its runtime; Node.js, a browser, and a local web server are not needed. Choose an installation folder when prompted. Start Glyphwright from the desktop or Start menu.

Save project writes a `.glyphwright.json` file that can be reopened with Open font or project. Export font writes an `.otf` file. The current project is also kept in the desktop app's local storage; export project files for portable backups.

The installer is unsigned, so Windows may display a publisher warning. New versions can be installed using their installer; there is no automatic update service configured.

## Build from source

Install Node.js and npm, then run `powershell -ExecutionPolicy Bypass -File .\build-installer.ps1`. The script installs the locked build dependencies and builds a new installer in `release`. To deliberately update build dependencies, update the versions in `package.json` and regenerate `package-lock.json` with `npm install` before running the script. End users do not need these build tools.

The editor is based on the browser-delivered source of https://glyphwright.pages.dev/app/ and retains its original attribution.
