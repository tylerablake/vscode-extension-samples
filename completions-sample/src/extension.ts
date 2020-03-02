import * as vscode from 'vscode';
import { COMPLETION_PROVIDER } from './autocomplete';
import { SUGGESTION_PROVIDERS } from './suggestion';
import { HOVER_PROVIDERS } from './hover/hover';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(COMPLETION_PROVIDER);
	
	context.subscriptions.concat(SUGGESTION_PROVIDERS);

	context.subscriptions.concat(HOVER_PROVIDERS);
}
