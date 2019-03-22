'use strict';

import {
	createConnection, TextDocuments, TextDocument, Diagnostic, DiagnosticSeverity, ProposedFeatures,
	InitializeParams, DidChangeConfigurationNotification, CompletionItem, CompletionItemKind, TextDocumentPositionParams,
	Hover, SignatureHelp
} from 'vscode-languageserver';

import * as fs from 'fs';
import * as path from 'path';
import builtins_json from './builtins';

let connection = createConnection(ProposedFeatures.all);
let documents: TextDocuments = new TextDocuments();

let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;
let hasDiagnosticRelatedInformationCapability: boolean = false;

let completionItemList = [];

connection.onInitialize((params: InitializeParams) => {
	let capabilities = params.capabilities;

	hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
	hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
	hasDiagnosticRelatedInformationCapability =
		!!(capabilities.textDocument &&
			capabilities.textDocument.publishDiagnostics &&
			capabilities.textDocument.publishDiagnostics.relatedInformation);

	return {
		capabilities: {
			textDocumentSync: documents.syncKind,
			completionProvider: {
				resolveProvider: true,
				"triggerCharacters": ['.']
			},
			signatureHelpProvider: {
				triggerCharacters: ["(", ","],
			},
			hoverProvider: true
		}
	};
});

connection.onInitialized(() => {
	if (hasConfigurationCapability) {
		connection.client.register(
			DidChangeConfigurationNotification.type,
			undefined
		);
	}
	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders(_event => {
			connection.console.log('Workspace folder change event received.');
		});
	}

	let def_classes = (fs.readFileSync(path.join(__dirname, '..', 'src', 'classes')).toString()).split(/\r?\n/g);
	let def_constants = (fs.readFileSync(path.join(__dirname, '..', 'src', 'constants')).toString()).split(/\r?\n/g);
	let def_keywords = (fs.readFileSync(path.join(__dirname, '..', 'src', 'keywords')).toString()).split(/\r?\n/g);

	for (let _class of def_classes) {
		completionItemList.push({
			label: _class,
			kind: CompletionItemKind.Class,
			detail: _class,
		});
	}
	for (let _constant of def_constants) {
		completionItemList.push({
			label: _constant,
			kind: CompletionItemKind.Constant,
			detail: _constant,
		});
	}
	for (let _keyword of def_keywords) {
		completionItemList.push({
			label: _keyword,
			kind: CompletionItemKind.Keyword,
			detail: _keyword,
		});
	}
});

interface Settings {
	maxNumberOfProblems: number;
}

const defaultSettings: Settings = { maxNumberOfProblems: 1000 };
let globalSettings: Settings = defaultSettings;

let documentSettings: Map<string, Thenable<Settings>> = new Map();

connection.onDidChangeConfiguration(change => {
	if (hasConfigurationCapability) {
		documentSettings.clear();
	} else {
		globalSettings = <Settings>(
			(change.settings.languageServerExample || defaultSettings)
		);
	}
	documents.all().forEach(validateTextDocument);
});

function getDocumentSettings(resource: string): Thenable<Settings> {
	if (!hasConfigurationCapability) {
		return Promise.resolve(globalSettings);
	}
	let result = documentSettings.get(resource);
	if (!result) {
		result = connection.workspace.getConfiguration({
			scopeUri: resource,
			section: 'languageServerExample'
		});
		documentSettings.set(resource, result);
	}
	return result;
}

documents.onDidClose(e => {
	documentSettings.delete(e.document.uri);
});

documents.onDidChangeContent(change => {
	validateTextDocument(change.document);
});

var request = require('request');
let names: Array<any>;

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
	// In this simple example we get the settings for every validate run.
	let settings = await getDocumentSettings(textDocument.uri);

	let diagnostics: Diagnostic[] = [];

	request.post({ url: 'http://localhost:3000/parse', body: textDocument.getText() }, function optionalCallback(err, httpResponse, body) {
		let messages = JSON.parse(body).errors;
		names = JSON.parse(body).names;

		let lines = textDocument.getText().split(/\r?\n/g);
		let problems = 0;

		for (var i = 0; i < messages.length && problems < settings.maxNumberOfProblems; i++) {
			problems++;

			if (messages[i].length == 0)
				messages[i].length = lines[i].length - messages[i].character;

			diagnostics.push({
				severity: DiagnosticSeverity.Error,
				range: {
					start: { line: messages[i].line, character: messages[i].character },
					end: { line: messages[i].line, character: messages[i].character + messages[i].length }
				},
				message: messages[i].message,
				source: 'ex'
			});
		}
		// Send the computed diagnostics to VSCode.
		connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
	});
}

connection.onHover(({ textDocument, position }): Hover => {
	for (var i = 0; i < names.length; i++) {
		if (names[i].line == position.line
			&& (names[i].start <= position.character && names[i].end >= position.character)) {
			return {
				contents: names[i].text
			};
		}
	}
});

connection.onDidChangeWatchedFiles(_change => {
	connection.console.log('We received an file change event');
});

for (let builtin of builtins_json) {
	completionItemList.push({
		label: builtin.name,
		kind: CompletionItemKind.Function,
		detail: builtin.text,
		documentation: builtin.brief,
	});
}

let builtinsMap = {};
for (let builtin of builtins_json) {
	builtinsMap[builtin.name] = builtin;
}

function parseFuncDecls(uri: string) {
	let userFunctions = [];
	let text = documents.get(uri).getText();
	let regex = /^[^"]*?([a-z]+)\s+([a-zA-Z0-9_]+)\s*\(\s*(([a-z]+\s+[a-zA-Z0-9_]+\s*,?\s*)*)\)/gm;
	let match = null;
	while ((match = regex.exec(text)) !== null) {
		let type = match[1];
		let funcName = match[2];
		let args = match[3].split(',').map((x) => x.trim());
		let signature = type + ' ' + funcName + ' (' + args.join(', ') + ')';
		userFunctions.push({
			type: type,
			name: funcName,
			args: args,
			text: signature,
		});
	}
	return userFunctions;
}

function getNumQuotes(text: string, offset: number) {
	let result = 0;
	while (offset >= 0 && text[offset] != '\n') {
		if (text[offset] == '"' && text[offset-1] != '\\')
			result++;
		offset--;
	}
	return result;
}

connection.onHover((textDocumentPosition: TextDocumentPositionParams): Hover => {
	let doc = documents.get(textDocumentPosition.textDocument.uri);
	let text = doc.getText();
	let offset = doc.offsetAt(textDocumentPosition.position) - 1;
	let value = null;
	if (getNumQuotes(text, offset) % 2 == 0) {
		let start = offset;
		let end = offset + 1;
		while (start >= 0 && /[a-zA-Z0-9_]/.test(text[start])) { start--; }
		while (end < text.length && /[a-zA-Z0-9_]/.test(text[end])) { end++; }
		let name = text.substr(start + 1, end - start - 1);
		if (builtinsMap[name]) {
			value = builtinsMap[name].text;
		}
		else {
			for (let func of parseFuncDecls(textDocumentPosition.textDocument.uri)) {
				if (func.name === name) {
					value = func.text;
					break;
				}
			}
		}
	}
	return {
		contents: value === null ? [] : [{ language: 'ns', value: value }]
	};
});

connection.onCompletion(
	(_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
		let userFunctions = parseFuncDecls(_textDocumentPosition.textDocument.uri);
		return completionItemList.concat(userFunctions.map((f) => {
			return {
				label: f.name,
				kind: CompletionItemKind.Function,
				detail: f.text,
			}
		}));
	}
);

connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
	return item;
});

function getFuncName(text: string, offset: number) {
	let result = null;
	let lastSpace = offset + 1;
	while (offset >= 0) {
		if (/\s/.test(text[offset])) {
			if (result !== null)
				break;
			lastSpace = offset;
		}
		else if (/[a-zA-Z0-9_]/.test(text[offset])) {
			result = offset;
		}
		else {
			break;
		}
		offset--;
	}
	if (result === null)
		return null;
	return text.substr(result, lastSpace - result);
}

connection.onSignatureHelp((textDocumentPosition: TextDocumentPositionParams): SignatureHelp => {
	let doc = documents.get(textDocumentPosition.textDocument.uri);
	let text = doc.getText();
	let offset = doc.offsetAt(textDocumentPosition.position) - 1;
	let funcName = null;
	let paramNum = 0;
	let nestLevel = 0;
	let inString = (getNumQuotes(text, offset) % 2 == 1);

	while (inString || text[offset] != ';') {
		if (inString) {
			if ((text[offset] == '"' && text[offset-1] != '\\') || text[offset] == '\n')
				inString = false;
		}
		else if (text[offset] == '"') {
			inString = true;
		}
		else if (text[offset] == '(') {
			if (nestLevel == 0) {
				funcName = getFuncName(text, offset - 1);
				if (funcName != null)
					break;
			}
			else {
				nestLevel--;
			}
		}
		else if (text[offset] == ')') {
			nestLevel++;
		}
		else if (text[offset] == ',' && nestLevel == 0) {
			paramNum++;
		}
		offset--;
		if (offset < 0)
			break;
	}

	if (builtinsMap[funcName]) {
		return {
			signatures: [builtinsMap[funcName].signature],
			activeSignature: 0,
			activeParameter: paramNum
		}
	}
	else {
		let userFunctions = parseFuncDecls(textDocumentPosition.textDocument.uri);
		for (let func of userFunctions) {
			if (func.name == funcName) {
				return {
					signatures: [{
						label: func.text,
						parameters: func.args.map((param) => {
							return { label: param };
						})
					}],
					activeSignature: 0,
					activeParameter: paramNum,
				};
			}
		}
	}
});

documents.listen(connection);
connection.listen();
