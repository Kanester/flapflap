import { Entity } from './Entity';

export class Background extends Entity {
	loadedBg: HTMLImageElement[] = [];
	fadeProcess: number = 0;
	current = 0;
	next = 1;
	scrollX = 0;
	scrollSpeed = 10;
	fadeDuration = 2;
	switchInterval = 10;
	timeSinceSwitch = 0;

	constructor(x: number, y: number, z: number) {
		super(x, y, z);
	}

	async load(): Promise<void> {
		const bg = Array.from({ length: 9 }, (_, i) =>
			window.assets.getAssets('bg', `Background${i + 1}.png`)
		);

		const promises = bg.map(src => {
			return new Promise<HTMLImageElement>((resolve, reject) => {
				const img = new Image();
				img.src = src;
				img.onload = () => resolve(img);
				img.onerror = () => reject();
			});
		});
		
		console.log("loading from bg")

		this.loadedBg = await Promise.all(promises);
		console.lpg(this.loadedBg)
	}

	drawBg(
		ctx: CanvasRenderingContext2D,
		img: HTMLImageElement,
		x: number,
		a: number
	): void {
		ctx.globalAlpha = a;

		const width = img.width;
		const height = img.height;

		const scale = window.gameSettings.height / height;
		const drawW = width * scale;
		const drawH = height;

		let drawX = x % drawW;
		if (drawX > 0) drawX -= drawW;

		ctx.drawImage(img, drawX, 0, drawW, drawH);
		ctx.drawImage(img, drawX + drawW, 0, drawW, drawH);

		ctx.globalAlpha = 1;
	}

	draw(ctx: CanvasRenderingContext2D): void {
		if (!this.loadedBg.length) return;

		// console.log('drawing from bg');

		ctx.clearRect(0, 0, window.gameSettings.width, window.gameSettings.height);

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
	}

	update(dt: number): void {
		if (!this.loadedBg.length) return;

		// console.log('updating from bg');

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
