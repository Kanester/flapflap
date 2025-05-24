type AssetPathFn = (p: string) => string;

export interface Assets {
	entity: AssetPathFn;
	hud: AssetPathFn;
	sfx: AssetPathFn;
}
