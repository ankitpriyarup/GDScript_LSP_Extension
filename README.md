# GDScript_LSP_Extension
Integrates support of Language server for GDScript. Currently in development, this extension has been tested on VS Code. Till now it can provide features such as - Syntax Highlighting & Language structure, Autocomplete, Hover provider, Function signature, Diagnostics using Language Server Protocol. Hover implementation can be enhanced through LSP provider, however it still hasn't been fully implemented.

<p align="center">
  <img src="https://media.giphy.com/media/YWWlWXJVGYzBbUSENR/giphy.gif">
</p>

To use the project, copy and paste gdscript module from here to the godot source code then build and run the engine first opening an existing or a new game project. Now, open lsp-extension project in visual studio code. Press Ctrl + Shift + B to initiate a build task first. After that, simply run the client and server extension using F5.