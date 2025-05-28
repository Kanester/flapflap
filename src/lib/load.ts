import type { Entity } from './Entity';

export async function loadEntities(entities: Entity[]): Promise<any[]> {
	const result = Promise.allSettled(
		entities.map(async e => {
			const res = await Promise.all(e.load?.());
			e.onMount?.();
			return res;
		})
	);

	return result;
}

async function loadImg(imgPaths: string[]) {
	let assets: Record<string, HTMLImageElement> = {};

	const promises = imgPaths.map(src => {
		return new Promise<{ path: string; img: HTMLImageElement }>(
			(resolve, reject) => {
				const img = new Image();
				img.src = src;
				img.onload = () => resolve({ path: src, img });
				img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
			}
		);
	});

	const results = await Promise.all(promises);
	assets = Object.fromEntries(results.map(({ path, img }) => [path, img]));

	window.gameAssets.image = assets;
}

async function loadAudio(audioPaths: string[]) {
	let assets: Record<string, HTMLAudioElement> = {};

	const promises = audioPaths.map(path => {
		return new Promise<{ path: string; audio: HTMLAudioElement }>(
			(resolve, reject) => {
				const audio = new Audio();
				audio.src = path;

				audio.oncanplaythrough = () => resolve({ path, audio });
				audio.onerror = e => reject(`Failed to load ${path}`);
			}
		);
	});

	const results = await Promise.all(promises);
	assets = Object.fromEntries(results.map(({ path, audio }) => [path, audio]));

	window.gameAssets.audio = assets;
}
