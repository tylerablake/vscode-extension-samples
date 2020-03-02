import * as vscode from 'vscode';
const fs = require("fs");
const path = require('path');


export const GENERIC_AUTOCOMPLETE_DESCRIPTION = 'Press `=` to see possible values.';

export function isInsideOfElement(linesToCheck: string[], element: string): boolean {

	let startCount = 0;
	let endCount = 0;
	linesToCheck.map((line: string) => {

		if (line.toLowerCase().includes(`<${element.toLowerCase()}`)
		) {
			startCount = startCount + 1;
		}

		if ((line.toLowerCase().includes(`></${element.toLowerCase()}>`))) {
			endCount = endCount + 1;
		}

	});

	if (startCount > endCount) {
		return true;
	} else {
		return false;
	}
}

interface KeyValuePair {
	key: string;
	value: string[];
}

export function getWidgetPropertyPairList(): KeyValuePair[] {

	let widgetMappers: KeyValuePair[] = new Array<KeyValuePair>();
	let textFieldMapper: KeyValuePair = {
		key: "TextField",
		value: [
			"autocapitalizationtype",
			"autocorrect",
			"keyboardtype",
			"letterspacing",
			"maxlength",
			"textalignment",
			"textdecoration",
			"texttransform"
		]
	};

	widgetMappers.push(textFieldMapper);
	return widgetMappers;
}


export function getUIWidgetNameByProperty(property: string): string {

	let mapperList = getWidgetPropertyPairList();

	let mapper = mapperList.filter((pair: KeyValuePair) => pair.value.includes(property.toLowerCase()))

	if (mapper.length === 1) {
		return mapper[0].key;
	} else {
		return "";
	}
}

export function getLastWordByDocument(document: vscode.TextDocument, position: vscode.Position): string {
	const range = document.getWordRangeAtPosition(position);
	const word = document.getText(range);

	return word;
}


export function searchFilesInDirectory(dir: any, filter: any, ext: any) {
	if (!fs.existsSync(dir)) {
		console.log(`Specified directory: ${dir} does not exist`);
		return;
	}

	const files = getFilesInDirectory(dir, ext);

	if (files) {
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
export function getFilesInDirectory(dir: any, ext: string) {
	if (!fs.existsSync(dir)) {
		console.log(`Specified directory: ${dir} does not exist`);
		return;
	}

	let files: any[] = [];
	fs.readdirSync(dir).forEach((file: any) => {
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
