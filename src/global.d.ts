import { type Writable } from 'svelte/store';

/*
type AssetTypes = Exclude<keyof Assets, 'getAssets'>;

interface Assets {
	ui: (p: string) => string;
	bg: (p: string) => string;
	entity: (p: string) => string;
	bgx: (p: string) => string;
	sfx: (p: string) => string;
	getAssets?: (type: AssetTypes, path: string) => string;
}

interface BirdSettings {
	startX: number;
	startY: number;
	gravity: number;
	flapForce: number;
	maxFallSpeed: number;
}

interface PipeSettings {
	speed: number;
	gap: number;
	distance: number;
}

interface Settings {
	bird: BirdSettings;
	pipes: PipeSettings;
}

enum Difficulties {
	easy,
	normal,
	hard
}

enum Themes {
	light,
	dark
} // might add new theme

export interface GameSettings {
	theme: Themes;
	sfx: boolean;
	bgx: boolean;
	contrast: 'normal' | 'high';
	reduceMotion: boolean;
	difficulty: Difficulties;
}

enum States {
	loading,
	ready,
	playing,
	paused,
	gameover,
	score,
	restart
}

export interface State {
	gameState: States;
	score: number;
}

export interface WindowSettings {
	width: number;
	height: number;
	fps: number;
	dpr: number;
	ctx: Writable<CanvasRenderingContext2D | null>;
}
*/

interface Assets {
	image: Record<string, HTMLImageElement>;
	audio: Record<string, HTMLAudioElement>;
}

interface GameWindow {
	targetW: number;
	targetH: number;
	canvasW: number;
	canvasH: number;
	dpr: number;
	ctx: Writable<CanvasRenderingContext2D | null>;
}

declare global {
	interface Window {
		gameAssets: Assets;
		gameWindow: GameWindow;
	}
}

export {};
