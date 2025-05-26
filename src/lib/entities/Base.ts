import { Entity } from './Entity';

export class Base extends Entity {
	loadedBase: HTMLImageElement;
	speed: number = 10;

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

		const imgW = this.loadedBase.width;
		const imgH = this.loadedBase.height;

		const scale = 370 / imgH;
		const drawW = imgW * scale;
		const drawH = imgH;

		ctx.drawImage(this.loadedBase, this.x, this.y, drawW, drawH);
	}

	update(dt: number): void {
		if (!this.loadedBase) return;

		this.x -= this.speed * dt;

		if (this.x + this.loadedBase.width < 0) {
			this.x = this.loadedBase.width * (370 / this.loadedBase.height);
		}
	}

	// onMount(): void {}

	// onDestroy(): void {}
}
