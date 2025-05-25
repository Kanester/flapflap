import { writable, type Writable } from 'svelte/store';

export const windowSize = writable({
	width: window.innerWidth,
	height: window.innerHeight
});

function updateSize() {
	windowSize.set({
		width: window.innerWidth,
		height: window.innerHeight
	});
}

let timeout: number;

window.addEventListener('resize', () => {
	clearTimeout(timeout);
	timeout = setTimeout(updateSize, 200);
});
