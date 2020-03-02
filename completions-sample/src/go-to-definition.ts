import * as vscode from 'vscode';
import { join } from 'path';
import *  as UTILS from './utils';
import { getFilesInDirectory } from './utils';
const fs = require("fs");
const path = require('path');


// TODO: Future
vscode.languages.registerDefinitionProvider('*', {
	provideDefinition(document, position, token) {
		// const range = document.getWordRangeAtPosition(position);
		// const word = document.getText(range);
		const word = UTILS.getLastWordByDocument(document, position);

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
		arr.forEach((line: any, idx: number) => {
			if (line.toLowerCase().includes(` ${word.toLowerCase()} `)) {
				let temp = [];
				startPosition = (line.toLowerCase().indexOf(` ${word.toLowerCase()} `)) + 1;
				lineNumber = (idx);
			}
		});


		if (!lineNumber && !startPosition) {
			vscode.window.showInformationMessage(`Unable to find definition for '${word}'.`);
		}

		return new vscode.Location(test, new vscode.Range(new vscode.Position(lineNumber, startPosition), new vscode.Position(lineNumber, word.length)));
	}
});