import { browser } from '$app/environment';
import { writable } from 'svelte/store';

if (browser) {
	// ---Assets---
	window.gameAssets = {
		image: {},
		audio: {}
	};

	//---Global Configuration---
	window.gameWindow = {
		targetW: 260, //256
		targetH: 370, //368
		targetFps: 60,
		dpr: window.devicePixelRatio || 1,
		ctx: writable<CanvasRenderingContext2D | null>(null)
	};
}

export const prerender = false;
