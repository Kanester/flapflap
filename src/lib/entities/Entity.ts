abstract class Entity {
	x: number;
	y: number;
	z: number;

	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	abstract load(): Promise<void>;

	abstract update(dt: number): void;

	abstract draw(ctx: CanvasRenderingContext2D): void;

	onMount?(): void;
	onDestroy?(): void;
}
