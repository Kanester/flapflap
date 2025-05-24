import { Settings } from '$lib/Settings';
import { GameSettings } from '$lib/Game';
import { Assets } from '$lib/Assets';
import { State } from '$lib/State';

declare global {
	interface Window {
		settings?: Settings;
		assets?: Assets;
		gameSettings?: GameSettings;
		state?: State;
	}
}
