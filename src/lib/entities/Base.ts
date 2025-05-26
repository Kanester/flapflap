import { Entity } from './Entity';

export class Base extends Entity {
	loadedBase: HTMLImageElement;

	constructor(x: number, y: number, z: number) {
		super(x, y, z);
	}

	async load(): Promise<void> {
		const base = window.assets.getAssets('bg', 'base.png');

		const promise = new Promise<HTMLImageElement>((resolve, reject) => {
			const img = new Image();
			img.src = base;
			img.onload = () => resolve(img);
			img.onerror = () => reject();
		});

		this.loadedBase = await promise;
	}

	draw(ctx: CanvasRenderingContext2D): void {
		if (!this.loadedBase) return;

		ctx.clearRect(
			0,
			0,
			window.windowSettings.width,
			window.windowSettings.height
		);

		const imgW = this.loadedBase.width;
		const imgH = this.loadedBase.height;

		const scale = 368 / imgH;
		const drawW = imgW * scale;
		const drawH = window.windowSettings.height;

		ctx.drawImage(this.loadedBase, 0, 0, drawW, drawH);
	}

	update(dt: number): void {
		if (!this.loadedBase) return;
	}

	// onMount(): void {}

	// onDestroy(): void {}
}
