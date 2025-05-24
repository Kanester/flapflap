interface BirdSettings {
	startX: number;
	startY: number;
	gravity: number;
	flapForce: number;
	maxFallSpeed: number;
}

interface PipeSettings {
	speed: number;
	gap: number;
	distance: number;
}

export interface Settings {
	bird: BirdSettings;
	pipes: PipeSettings;
}
