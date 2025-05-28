import { Entity } from '../Entity';

export class Background extends Entity {
	loadedBg: HTMLImageElement[] = [];
	loadedBase: HTMLImageElement;
	fadeProcess: number = 0;
	current = 0;
	next = 1;
	scrollX = 0;
	scrollSpeed = 5;
	fadeDuration = 2;
	switchInterval = 50;
	timeSinceSwitch = 0;

	constructor(x: number, y: number, z: number) {
		super(x, y, z);
	}

	getPath(isType: string) {
		return window.gameAssets.image[`assets/bg/${isType}`];
	}

	async load(): Promise<void> {
		const bg = [
			'Background1.png',
			'Background2.png',
			'Background3.png',
			'Background4.png',
			'Background5.png'
		];

		this.loadedBg = bg.map(src => this.getPath(src));
		this.loadedBase = this.getPath('base.png');

		if (!this.loadedBg.every(Boolean) || !this.loadedBase)
			console.error('[!] Some background/s are failed to load!');
	}

	drawBase(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number) {
		const imgW = img.width;
		const imgH = img.height;

		const scale = window.gameWindow.targetW / imgW;
		const drawW = imgW * scale;
		const drawH = imgH * scale;

		let drawX = x % drawW;
		if (drawX > 0) drawX -= drawW;

		ctx.drawImage(img, drawX, window.innerHeight - 50, drawW, drawH);
		ctx.drawImage(img, drawX + drawW, window.innerHeight - 50, drawW, drawH);
	}

	drawBg(
		ctx: CanvasRenderingContext2D,
		img: HTMLImageElement,
		x: number,
		a: number
	): void {
		ctx.globalAlpha = a;

		const imgW = img.width;
		const imgH = img.height;

		const scale = window.gameWindow.targetH / imgH;
		const drawW = imgW * scale;
		const drawH = window.windowSettings.height;
		const baseY = (drawH - 50) * scale;

		let drawX = x % drawW;
		if (drawX > 0) drawX -= drawW;

		ctx.drawImage(img, drawX, baseY, drawW, drawH);
		ctx.drawImage(img, drawX + drawW, baseY, drawW, drawH);

		ctx.globalAlpha = 1;
	}

	draw(ctx: CanvasRenderingContext2D): void {
		if (!this.loadedBg.length) return;
		if (!this.loadedBase) return;

		if (this.fadeProcess > 0) {
			this.drawBg(
				ctx,
				this.loadedBg[this.current],
				this.scrollX,
				1 - this.fadeProcess
			);
			this.drawBg(
				ctx,
				this.loadedBg[this.next],
				this.scrollX,
				this.fadeProcess
			);
		} else {
			this.drawBg(ctx, this.loadedBg[this.current], this.scrollX, 1);
		}

		this.drawBase(ctx, this.loadedBase, this.scrollX);
	}

	update(dt: number): void {
		if (!this.loadedBg.length) return;
		if (!this.loadedBase) return;

		this.scrollX -= this.scrollSpeed * dt;
		this.timeSinceSwitch += dt;

		if (this.timeSinceSwitch >= this.switchInterval) {
			this.fadeProcess += dt / this.fadeDuration;

			if (this.fadeProcess >= 1) {
				this.fadeProcess = 0;
				this.current = this.next;
				this.next = (this.next + 1) % this.loadedBg.length;
				this.timeSinceSwitch = 0;
			}
		}
	}
}
