export abstract class Entity {
	x: number;
	y: number;
	z: number;

	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	abstract load(): Promise<void>;
	abstract draw(ctx: CanvasRenderingContext2D): void;
	abstract update(dt: number): void;
	
	onMount?(): void;
	onDestroy?(): void;
}
