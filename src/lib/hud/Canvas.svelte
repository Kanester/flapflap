<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import type { Entity } from "$lib/entities/Entity";
	import { Background } from "$lib/entities/Background";
	//import { Base } from "$lib/entities/Base";

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let dpr: number;
	let width: number;
	let height: number;

	let entities: Entity[] = [];
	let animationId: number;
	let lastTime: number = 0;

	function init(): void {
		ctx = canvas.getContext("2d");

		if (!ctx) {
			console.error("2D canvas is not supported by the browser");
			window.windowSettings?.ctx.set(null);
			return;
		}

		width = window.windowSettings.width;
		height = window.windowSettings.height;
		dpr = window.windowSettings.dpr;

		canvas.width = width * dpr;
		canvas.height = height * dpr;
		canvas.style.width = width + "px";
		canvas.style.height = height + "px";

		ctx.imageSmoothingEnabled = false;
		ctx.scale(dpr, dpr);

		window.windowSettings.ctx.set(ctx);
	}

	async function setupEntities() {
		const bg = new Background(0, 0, 0);
		//const base = new Base(0, height - 50, 1, "base.png");

		entities = [bg]; //[bg, base];
		await Promise.all(entities.map(e => e.load()));
		entities.forEach(e => e.onMount?.());
	}

	function loop(timestamp: number) {
		const dt = (timestamp - lastTime) / 1000;
		lastTime = timestamp;

		entities.forEach(e => e.update(dt));

		ctx.clearRect(0, 0, width, height);
		entities
			.sort((a, b) => a.z - b.z)
			.forEach(e => e.draw(ctx));
			
		console.log(entities)

		animationId = requestAnimationFrame(loop);
	}

	onMount(async () => {
		init();
		await setupEntities();
		lastTime = performance.now();
		loop(lastTime);
	});

	onDestroy(() => {
		cancelAnimationFrame(animationId);
		entities.forEach(e => e.onDestroy?.());
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		position: fixed;
		top: 0;
		left: 0;
	}
</style>