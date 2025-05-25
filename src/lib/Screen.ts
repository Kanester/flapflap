import { type Writable } from 'svelte/store';

export interface WindowSettings {
	width: number;
	height: number;
	fps: number;
	dpr: number;
	ctx: Writable<CanvasRenderingContext2D | null>;
}
