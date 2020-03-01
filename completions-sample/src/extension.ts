import * as vscode from 'vscode';
import { join } from 'path';
import *  as Utils from './utils';
import { isInsideOfElement, getLastWordByDocument, getUIWidgetNameByProperty } from './utils';
const fs = require("fs");
const path = require('path');

export function activate(context: vscode.ExtensionContext) {

	// TODO: Future
	vscode.languages.registerDefinitionProvider('*', {
		provideDefinition(document, position, token) {
			// const range = document.getWordRangeAtPosition(position);
			// const word = document.getText(range);
			const word = getLastWordByDocument(document,position);

			// vscode.window.showInformationMessage(`Searching for definition for '${word}'.`);
			
			const definitionDoc = vscode.Uri.file(join(document.fileName, "../node_modules/types/index.d.ts"));
			// const definitionDoc = vscode.Uri.file(join(document.fileName, "~/node_modules/types/index.d.ts"));

			// searchFilesInDirectory(vscode.Uri.file(join(document.fileName, "../")),)
			let tnsCoreModulesDirectory = join(document.fileName, "../test/node_modules/tns-core-modules");

			let tnsCoreModulesFiles = getFilesInDirectory(tnsCoreModulesDirectory, ".d.ts");			
			
			// let definitionFile = searchFilesInDirectory(tnsCoreModulesDirectory, word ,'.d.ts');

			// if(tnsCoreModulesFiles) {
			// 	tnsCoreModulesFiles.forEach(file => {
			// 		const fileContent = fs.readFileSync(file);
		
			// 		// We want full words, so we use full word boundary in regex.
			// 		const regex = new RegExp('\\b' + word + '\\b');
			// 		if (regex.test(fileContent)) {
			// 			console.log(`Your word was found in file: ${file}`);
			// 		}
			// 	});	
			// }
			

			const test = vscode.Uri.file(join(document.fileName, "../test/node_modules/tns-core-modules/ui/enums/enums.d.ts"));
			let lineNumber = 0;
			let startPosition = 0;
			let file = fs.readFileSync(test.fsPath, "utf8");

			let arr = file.split(/\r?\n/);
			arr.forEach((line: any, idx: number)=> {
				if(line.toLowerCase().includes(` ${word.toLowerCase()} `)){				
					let temp = [];
					startPosition = (line.toLowerCase().indexOf(` ${word.toLowerCase()} `)) + 1;
					lineNumber = (idx);
				}
			});


			if(!lineNumber && !startPosition) {
				vscode.window.showInformationMessage(`Unable to find definition for '${word}'.`);
			}

			return new vscode.Location(test, new vscode.Range( new vscode.Position(lineNumber,startPosition), new vscode.Position(lineNumber,word.length)));
		}
	});

	function searchFilesInDirectory(dir:any, filter:any, ext:any) {
		if (!fs.existsSync(dir)) {
			console.log(`Specified directory: ${dir} does not exist`);
			return;
		}
	
		const files = getFilesInDirectory(dir, ext);
	
		if(files) {
			files.forEach(file => {
				const fileContent = fs.readFileSync(file);
		
				// We want full words, so we use full word boundary in regex.
				const regex = new RegExp('\\b' + filter + '\\b');
				if (regex.test(fileContent)) {
					console.log(`Your word was found in file: ${file}`);
				}
			});
		}

	}
	
	// Using recursion, we find every file with the desired extention, even if its deeply nested in subfolders.
	function getFilesInDirectory(dir: any, ext: string) {
		if (!fs.existsSync(dir)) {
			console.log(`Specified directory: ${dir} does not exist`);
			return;
		}
	
		let files: any[] = [];
		fs.readdirSync(dir).forEach((file:any) => {
			const filePath = path.join(dir, file);
			const stat = fs.lstatSync(filePath);
	
			// If we hit a directory, apply our function to that dir. If we hit a file, add it to the array of files.
			if (stat.isDirectory()) {
				const nestedFiles = getFilesInDirectory(filePath, ext);
				files = files.concat(nestedFiles);
			} else {
				if (path.extname(file) === ext) {
					files.push(filePath);
				}
			}
		});
	
		return files;
	}

	

	vscode.languages.registerHoverProvider('*', {
        provideHover(document, position, token) {

            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);
			
            if (word == "autocapitalizationType") {
				
				let autocapDescription: vscode.MarkdownString = new vscode.MarkdownString()
				// .appendMarkdown(`AutocapitalizationType`)
				.appendText(`Represents the auto-capitalization style for a text input.\n`)
				// .appendMarkdown(`### Values:\n`)				
				.appendMarkdown(`**none** - Do not capitalize any text automatically.\n\n`)
				.appendMarkdown(`**words** - Do not capitalize any text automatically. \n\n`)
				.appendMarkdown(`**sentences** - Do not capitalize any text automatically.\n\n`)
				.appendMarkdown(`**allCharacters** - Do not capitalize any text automatically.\n\n`)
				.appendMarkdown(`\n\n[{N} Reference](https://docs.nativescript.org/api-reference/modules/_ui_enums_.autocapitalizationtype)\n\n`)
				autocapDescription.isTrusted = true;				
				
				return new vscode.Hover(autocapDescription);
            }
        }
    });


	let genericDescription = 'Press `=` to see possible values.';

	let completionsProvider = vscode.languages.registerCompletionItemProvider('html', {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

			// For now check the current and past 2 lines to see which element to give completion for
			let previousLine2:string = document.lineAt(position.line - 2).text;
			let previousLine1:string = document.lineAt(position.line - 1).text;
			let currentLineText:string = document.lineAt(position).text.substr(0, position.character);

			let linesToCheck = [
				previousLine2,
				previousLine1,
				currentLineText
			];
			
			
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

			// return all completion items as array

			let widgetName = getUIWidgetNameByProperty(getLastWordByDocument(document,position).toLowerCase());
			console.log(`widgetName: ${widgetName}`);

			if(isInsideOfElement(linesToCheck,"TextField") && widgetName.toLowerCase() === "textfield"){
				return [
					autocapitalizationTypeCompletion,
					keyboardTypeCompletion,
					returnKeyTypeCompletion,
					fontStyleCompletion,
					textAlignmentCompletion,
					textDecorationCompletion,
					textTransformCompletion,
					visibilityCompletion,
					verticalAlignmentCompletion,
					horizontalAlignmentCompletion
				];
			}


			if(isInsideOfElement(linesToCheck,"Label")){
				return [
					textAlignmentCompletion,
					textDecorationCompletion,
					textTransformCompletion,
					visibilityCompletion,
					verticalAlignmentCompletion,
					horizontalAlignmentCompletion
				]
			}
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
