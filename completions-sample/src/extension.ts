import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {



	// 		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

	// 			let linePrefix = document.lineAt(position).text.substr(0, position.character);
	// 			if (!linePrefix.endsWith('ios.')) {
	// 				return undefined;
	// 			}

	// 			return [
	// 				new vscode.CompletionItem('position', vscode.CompletionItemKind.Value),
	// 				new vscode.CompletionItem('systemIcon', vscode.CompletionItemKind.Value),
	// 			];
	// 		}
	// 	},


	// let hoverProvider = vscode.languages.registerHoverProvider('html', {
	// 	provideHover(document, position, token) {

	// 		let linePrefix = document.lineAt(position).text.substr(0, position.character);
	// 		if (!linePrefix.endsWith('autocapitalizationType')) {
	// 			return undefined;
	// 		}

	// 		const autocapitalizationTypeHover = new vscode.Hover('autocapitalizationType');

	// 		return {
	// 			contents: ['Hover Content']
	// 		};							
	// 	}
	// });

	vscode.languages.registerHoverProvider('*', {
        provideHover(document, position, token) {

            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);
			
            if (word == "autocapitalizationType") {
				
				let autocapDescription: vscode.MarkdownString = new vscode.MarkdownString()
				// .appendMarkdown(`AutocapitalizationType`)
				.appendText(`Represents the auto-capitalization style for a text input.\n`)
				// .appendMarkdown(`### Values:\n`)				
				// .appendMarkdown(`**none** - Do not capitalize any text automatically.\n\n`)
				// .appendMarkdown(`**words** - Do not capitalize any text automatically. \n\n`)
				// .appendMarkdown(`**sentences** - Do not capitalize any text automatically.\n\n`)
				// .appendMarkdown(`**allCharacters** - Do not capitalize any text automatically.\n\n`)
				.appendMarkdown(`\n\n[{N} Reference](https://docs.nativescript.org/api-reference/modules/_ui_enums_.autocapitalizationtype)\n\n`)
				autocapDescription.isTrusted = true;				
				
				return new vscode.Hover(autocapDescription);
            }
        }
    });


	let genericDescription = 'Press `=` to see possible values.';

	let completionsProvider = vscode.languages.registerCompletionItemProvider('html', {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

			// a simple completion item which inserts `Hello World!`
			// const simpleCompletion = new vscode.CompletionItem('Hello World!');

			const autocapitalizationTypeCompletion = new vscode.CompletionItem('autocapitalizationType');
			autocapitalizationTypeCompletion.commitCharacters = ['='];
			autocapitalizationTypeCompletion.documentation = new vscode.MarkdownString(genericDescription);

			const keyboardTypeCompletion = new vscode.CompletionItem('keyboardType');
			keyboardTypeCompletion.commitCharacters = ['='];
			keyboardTypeCompletion.documentation = new vscode.MarkdownString(genericDescription);

			const returnKeyTypeCompletion = new vscode.CompletionItem('returnKeyType');
			returnKeyTypeCompletion.commitCharacters = ['='];
			returnKeyTypeCompletion.documentation = new vscode.MarkdownString(genericDescription);

			const tabBackgroundColorCompletion = new vscode.CompletionItem('tabBackgroundColor');
			tabBackgroundColorCompletion.commitCharacters = ['='];
			tabBackgroundColorCompletion.documentation = new vscode.MarkdownString(genericDescription);


			const selectedTabTextColorCompletion = new vscode.CompletionItem('selectedTabTextColor');
			selectedTabTextColorCompletion.commitCharacters = ['='];
			selectedTabTextColorCompletion.documentation = new vscode.MarkdownString(genericDescription);

			const tabTextColorCompletion = new vscode.CompletionItem('tabTextColor');
			tabTextColorCompletion.commitCharacters = ['='];
			tabTextColorCompletion.documentation = new vscode.MarkdownString(genericDescription);


			const orientationCompletion = new vscode.CompletionItem('orientation');
			tabTextColorCompletion.commitCharacters = ['='];
			tabTextColorCompletion.documentation = new vscode.MarkdownString(genericDescription);


			const fontStyleCompletion = new vscode.CompletionItem('fontStyle');
			fontStyleCompletion.commitCharacters = ['='];
			fontStyleCompletion.documentation = new vscode.MarkdownString(genericDescription);

			const textAlignmentCompletion = new vscode.CompletionItem('textAlignment');
			textAlignmentCompletion.commitCharacters = ['='];
			textAlignmentCompletion.documentation = new vscode.MarkdownString(genericDescription);


			const textDecorationCompletion = new vscode.CompletionItem('textDecoration');
			textDecorationCompletion.commitCharacters = ['='];
			textDecorationCompletion.documentation = new vscode.MarkdownString(genericDescription);


			const textTransformCompletion = new vscode.CompletionItem('textTransform');
			textTransformCompletion.commitCharacters = ['='];
			textTransformCompletion.documentation = new vscode.MarkdownString(genericDescription);

			const visibilityCompletion = new vscode.CompletionItem('visibility');
			visibilityCompletion.commitCharacters = ['='];
			visibilityCompletion.documentation = new vscode.MarkdownString(genericDescription);

			const verticalAlignmentCompletion = new vscode.CompletionItem('verticalAlignment');
			verticalAlignmentCompletion.commitCharacters = ['='];
			verticalAlignmentCompletion.documentation = new vscode.MarkdownString(genericDescription);


			const horizontalAlignmentCompletion = new vscode.CompletionItem('horizontalAlignment');
			horizontalAlignmentCompletion.commitCharacters = ['='];
			horizontalAlignmentCompletion.documentation = new vscode.MarkdownString(genericDescription);
			// a completion item that retriggers IntelliSense when being accepted,
			// the `command`-property is set which the editor will execute after 
			// completion has been inserted. Also, the `insertText` is set so that 
			// a space is inserted after `new`
			// const commandCompletion = new vscode.CompletionItem('new');
			// commandCompletion.kind = vscode.CompletionItemKind.Keyword;
			// commandCompletion.insertText = 'new ';
			// commandCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };

			// return all completion items as array
			return [
				autocapitalizationTypeCompletion,
				keyboardTypeCompletion,
				returnKeyTypeCompletion,
				tabBackgroundColorCompletion,
				selectedTabTextColorCompletion,
				tabTextColorCompletion,
				orientationCompletion,
				fontStyleCompletion,
				textAlignmentCompletion,
				textDecorationCompletion,
				textTransformCompletion,
				visibilityCompletion,
				verticalAlignmentCompletion,
				horizontalAlignmentCompletion
			];
		}
	});


	// *****************************************************************************************************************************
	// ************************************************ Autocomplete & Suggestions *************************************************
	// *****************************************************************************************************************************

	const iosSuggestionProvider = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('ios.')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem('position', vscode.CompletionItemKind.Value),
					new vscode.CompletionItem('systemIcon', vscode.CompletionItemKind.Value),
				];
			}
		},
		'.' // triggered whenever a '.' is being typed
	);

	const keyboardTypeSuggestionProvider = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('keyboardType=')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem("'email'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'phone'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'number'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'integer'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'datetime'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'url'", vscode.CompletionItemKind.Value),
				];
			}
		},
		'=' // triggered whenever a '.' is being typed
	);

	const autocapitalizationTypeSuggestionProvider = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

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

	const returnKeyTypeSuggestionProvider = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('returnKeyType=')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem("'done'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'next'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'go'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'search'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'send'", vscode.CompletionItemKind.Value)
				];
			}
		},
		'=' // triggered whenever a '.' is being typed
	);

	const tabBackgroundColorSuggestionProvider = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('tabBackgroundColor=')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem("'gray'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'#FF0000'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'rgb(200,100,200)'", vscode.CompletionItemKind.Value),
				];
			}
		},
		'=' // triggered whenever a '.' is being typed
	);


	const selectedTabTextColorSuggestionProvider = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('selectedTabTextColor=')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem("'gray'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'#FF0000'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'rgb(200,100,200)'", vscode.CompletionItemKind.Value),
				];
			}
		},
		'=' // triggered whenever a '.' is being typed
	);


	const tabTextColorSuggestionProvider = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('tabTextColor=')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem("'gray'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'#FF0000'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'rgb(200,100,200)'", vscode.CompletionItemKind.Value),
				];
			}
		},
		'=' // triggered whenever a '.' is being typed
	);


	const orientationSuggestionProvider = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('orientation=')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem("'vertical'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'horizontal'", vscode.CompletionItemKind.Value)
				];
			}
		},
		'=' // triggered whenever a '.' is being typed
	);

	const fontStyleSuggestionProvider = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('fontStyle=')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem("'normal'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'italic'", vscode.CompletionItemKind.Value)
				];
			}
		},
		'=' // triggered whenever a '.' is being typed
	);


	const textAlignmentSuggestionProvider = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('textAlignment=')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem("'left'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'center'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'right'", vscode.CompletionItemKind.Value)
				];
			}
		},
		'=' // triggered whenever a '.' is being typed
	);

	const textDecorationSuggestionProvider = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				// Only show suggestions if inside of a textfield
				if (!document.getText().includes("<TextField") || !document.getText().includes("<TextView")) {
					return undefined;
				}

				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('textDecoration=')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem("'none'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'underline'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'line-through'", vscode.CompletionItemKind.Value)
				];
			}
		},
		'=' // triggered whenever a '.' is being typed
	);

	const textTransformSuggestionProvider = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('textTransform=')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem("'none'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'capitalize'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'uppercase'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'lowercase'", vscode.CompletionItemKind.Value),
				];
			}
		},
		'=' // triggered whenever a '.' is being typed
	);

	const dockSuggestionProvider = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('dock=')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem("'top'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'left'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'right'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'bottom'", vscode.CompletionItemKind.Value),
				];
			}
		},
		'=' // triggered whenever a '.' is being typed
	);


	const stretchSuggestionProvider = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('stretch=')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem("'aspectFit'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'none'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'fill'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'aspectFill'", vscode.CompletionItemKind.Value),
				];
			}
		},
		'=' // triggered whenever a '.' is being typed
	);

	const visibilitySuggestionProvider = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('visibility=')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem("'visible'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'collapsed'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'hidden'", vscode.CompletionItemKind.Value)
				];
			}
		},
		'=' // triggered whenever a '.' is being typed
	);

	const verticalAlignmentSuggestionProvider = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('verticalAlignment=')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem("'stretch'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'top'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'center'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'middle'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'bottom'", vscode.CompletionItemKind.Value)
				];
			}
		},
		'=' // triggered whenever a '.' is being typed
	);

	const horizontalAlignmentSuggestionProvider = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('horizontalAlignment=')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem("'stretch'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'center'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'left'", vscode.CompletionItemKind.Value),
					new vscode.CompletionItem("'right'", vscode.CompletionItemKind.Value)
				];
			}
		},
		'=' // triggered whenever a '.' is being typed
	);

	context.subscriptions.push(
		completionsProvider,
		// hoverProvider,
		iosSuggestionProvider,
		keyboardTypeSuggestionProvider,
		autocapitalizationTypeSuggestionProvider,
		returnKeyTypeSuggestionProvider,
		tabBackgroundColorSuggestionProvider,
		selectedTabTextColorSuggestionProvider,
		tabTextColorSuggestionProvider,
		orientationSuggestionProvider,
		fontStyleSuggestionProvider,
		textAlignmentSuggestionProvider,
		textDecorationSuggestionProvider,
		textTransformSuggestionProvider,
		dockSuggestionProvider,
		stretchSuggestionProvider,
		visibilitySuggestionProvider,
		verticalAlignmentSuggestionProvider,
		horizontalAlignmentSuggestionProvider
	);
}
