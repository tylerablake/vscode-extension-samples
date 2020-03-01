import * as vscode from 'vscode';

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

export function getLastWordByDocument(document: vscode.TextDocument, position: vscode.Position): string{
	const range = document.getWordRangeAtPosition(position);
	const word = document.getText(range);

	return word;
}
