enum States {
	loading,
	ready,
	playing,
	paused,
	gameover,
	score,
	restart
}

interface WindowSettings {
	width: number;
	height: number;
	fps: number;
}

export interface State {
	gameState: States;
	score: number;
	screen: WindowSettings;
}
