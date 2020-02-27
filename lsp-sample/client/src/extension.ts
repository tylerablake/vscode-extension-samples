import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let provider1 = vscode.languages.registerCompletionItemProvider('html', {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

			// a simple completion item which inserts `Hello World!`
			// const simpleCompletion = new vscode.CompletionItem('Hello World!');

			// a completion item that inserts its text as snippet,
			// the `insertText`-property is a `SnippetString` which will be
			// honored by the editor.
			// const snippetCompletion = new vscode.CompletionItem('Good part of the day');
			// snippetCompletion.insertText = new vscode.SnippetString('Good ${1|morning,afternoon,evening|}. It is ${1}, right?');
			// snippetCompletion.documentation = new vscode.MarkdownString("Inserts a snippet that lets you select the _appropriate_ part of the day for your greeting.");

			// a completion item that can be accepted by a commit character,
			// the `commitCharacters`-property is set which means that the completion will
			// be inserted and then the character will be typed.
			const commitCharacterCompletion = new vscode.CompletionItem('console');
			commitCharacterCompletion.commitCharacters = ['.'];
			commitCharacterCompletion.documentation = new vscode.MarkdownString('Press `.` to get `console.`');

			// a completion item that retriggers IntelliSense when being accepted,
			// the `command`-property is set which the editor will execute after 
			// completion has been inserted. Also, the `insertText` is set so that 
			// a space is inserted after `new`
			// const commandCompletion = new vscode.CompletionItem('new');
			// commandCompletion.kind = vscode.CompletionItemKind.Keyword;
			// commandCompletion.insertText = 'new ';
			// commandCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };



			const keyboardTypeCompletion = new vscode.CompletionItem('keyboardType');
			keyboardTypeCompletion.commitCharacters = ['='];
			keyboardTypeCompletion.documentation = new vscode.MarkdownString('Press `=` to get `keyboardTypes.`');

			const autocapitalizationTypeCompletion = new vscode.CompletionItem('autocapitalizationType');
			autocapitalizationTypeCompletion.commitCharacters = ['='];
			autocapitalizationTypeCompletion.documentation = new vscode.MarkdownString('Press `=` to get `autocapitalizationTypes.`');



			// return all completion items as array
			return [								
				commitCharacterCompletion,				
				keyboardTypeCompletion,
				autocapitalizationTypeCompletion
			];
		}
	});

	const provider2 = vscode.languages.registerCompletionItemProvider(
		'plaintext',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				// get all text until the `position` and check if it reads `console.`
				// and if so then complete if `log`, `warn`, and `error`
				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('console.')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem('log', vscode.CompletionItemKind.Method),
					new vscode.CompletionItem('warn', vscode.CompletionItemKind.Method),
					new vscode.CompletionItem('error', vscode.CompletionItemKind.Method),
				];
			}
		},
		'.' // triggered whenever a '.' is being typed
	);

	const keyboardTypeProvider = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				// get all text until the `position` and check if it reads `console.`
				// and if so then complete if `log`, `warn`, and `error`
				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('keyboardType=')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem("'email'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'phone'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'number'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'integer'", vscode.CompletionItemKind.Value)
				];
			}
		},
		'=' // triggered whenever a '.' is being typed
	);

	const autocapitalizationTypeProvider = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				// get all text until the `position` and check if it reads `console.`
				// and if so then complete if `log`, `warn`, and `error`
				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('autocapitalizationType=')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem("'none'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'words'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'sentences'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'allCharacters'", vscode.CompletionItemKind.Value)
				];
			}
		},
		'=' // triggered whenever a '.' is being typed
	);



	context.subscriptions.push(
		provider1,
		provider2,
		keyboardTypeProvider,
		autocapitalizationTypeProvider);
}
