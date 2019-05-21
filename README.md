# GDScript_LSP_Extension
Integrates support of Language server for GDScript. Currently in development, this extension has been tested on VS Code. Till now it can provide features such as - Syntax Highlighting & Language structure, Autocomplete, Hover provider, Function signature, Diagnostics using Language Server Protocol. Hover implementation can be enhanced through LSP provider, however it still hasn't been fully implemented.

<p align="center">
	<img src="https://media.giphy.com/media/YWWlWXJVGYzBbUSENR/giphy.gif">
</p>

To use the project, make following changes in the latest fork of [godot source code](https://github.com/godotengine/godot)<br>

modules/gdscript/gdscript.h
```c++
// Headers
#include <pthread.h>
#include <cstdlib>
// Inside GDScript class

pthread_t thread_id;
static bool initialized_listener;
```

modules/gdscript/gdscript.cpp
```c++
// Before GDScript constructor
#include <netinet/in.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>
#include <thread>

#define PORT 3000

bool GDScript::initialized_listener = false;

void *start_listening(void *vargp) {

    int server_fd, new_socket;
    long valread;
    struct sockaddr_in address;
    int addrlen = sizeof(address);

    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0)
        exit(EXIT_FAILURE);

    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    memset(address.sin_zero, '\0', sizeof address.sin_zero);

    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0 || listen(server_fd, 10) < 0)
        exit(EXIT_FAILURE);

	GDScriptParser parser;
	while (true)
    {
		if ((new_socket = accept(server_fd, (struct sockaddr *)&address, (socklen_t *)&addrlen)) < 0)
			exit(EXIT_FAILURE);

		char buffer[30000] = {0};
		valread = read(new_socket, buffer, 30000);

		int new_line_count = 0;
		int character_count = 0;
		String content = "";
		while (buffer[character_count] != '\0')
		{
			if (new_line_count > 4)
				content += buffer[character_count];
			else if (buffer[character_count] == '\n')
				new_line_count++;

			character_count++;
		}

		Error err = parser.parse(content);
		int err_line, err_column;
		String err_msg;
		if (err)
		{
			err_line = parser.get_error_line() - 1;
			err_column = parser.get_error_column() - 1;
			err_msg = parser.get_error();
		}

		String response = "HTTP/1.1 200 OK\nContent-Type: application/json\nContent-Length: 256\n\n";
		response += "{";
		response += "\"errors\": ";
		response += "[";
		response += "{";
		response += "\"message\": \"" + err_msg + "\",";
		response += "\"line\": " + String::num(err_line) + ",";
		response += "\"character\": " + String::num(err_column) +",";
		response += "\"symbol\": \"a\",";
		response += "\"length\": 5";
		response += "}";
		response += "],";
		response += "\"names\": ";
		response += "[";
		response += "{";
		response += "\"text\": \"Hello World!!\",";
		response += "\"line\": 4,";
		response += "\"start\": 1,";
		response += "\"end\": 5";
		response += "}";
		response += "]";
		response += "}";
        write(new_socket, response.utf8().get_data(), response.length());
        close(new_socket);
    }
}

// Inside constructor
if (!initialized_listener) {
	initialized_listener = true;
	pthread_create(&thread_id, NULL, start_listening, NULL);
}
```

Run npm install in lsp-extension folder, then build and run the engine first opening an existing or a new game project. Now, open lsp-extension project in visual studio code. Press Ctrl + Shift + B to initiate a build task first. After that, simply run the client and server extension using F5.

In case you see Namespace "vscode" has no exported member 'DocumentSymbol' while building the project simple run npm run update-vscode in client folder then again run num install in lsp-extension folder.