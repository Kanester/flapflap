import { Settings } from '$lib/Settings';
import { GameSettings } from '$lib/Game';
import { State } from '$lib/State';
import { WindowSettings } from '$lib/Screen';
import { Assets } from "$lib/Assets"

declare global {
	interface Window {
	  assets: Assets;
		settings?: Settings;
		gameSettings?: GameSettings;
		state?: State;
		windowSettings?: WindowSettings;
	}
}
