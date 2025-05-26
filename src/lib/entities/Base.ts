import { Entity } from './Entity';

export class Base extends Entity {
	loadedBase: HTMLImageElement;
	speed: number = 60;

	scale: number;
	drawW: number;
	drawH: number;

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

		this.scale = 256 / this.loadedBase.width;
		this.drawW = this.loadedBase.width * this.scale;
		this.drawH = this.loadedBase.height * this.scale;
	}

	draw(ctx: CanvasRenderingContext2D): void {
		if (!this.loadedBase) return;

		ctx.drawImage(this.loadedBase, this.x, this.y, this.drawW, this.drawH);
		ctx.drawImage(
			this.loadedBase,
			this.x + this.drawW,
			this.y,
			this.drawW,
			this.drawH
		);
	}

	update(dt: number): void {
		if (!this.loadedBase) return;

		this.x -= this.speed * dt;

		if (this.x <= -this.drawW) {
			this.x = 0;
		}
	}
}
