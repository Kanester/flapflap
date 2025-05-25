import { Settings } from '$lib/Settings';
import { GameSettings } from '$lib/Game';
import { Assets } from '$lib/Assets';
import { State } from '$lib/State';
import { WindowSettings } from '$lib/Screen';

declare global {
	interface Window {
	  bgImage?: HTMLImageElement;
		settings?: Settings;
		assets?: Assets;
		gameSettings?: GameSettings;
		state?: State;
		windowSettings?: WindowSettings;
	}
}
