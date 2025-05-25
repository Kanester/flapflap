import { type Writable } from 'svelte/store';

export interface WindowSettings {
	fps: number;
	ctx: Writable<CanvasRenderingContext2D | null>;
}
