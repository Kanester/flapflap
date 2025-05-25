

enum States {
	loading,
	ready,
	playing,
	paused,
	gameover,
	score,
	restart
}

export interface State {
	gameState: States;
	score: number;
}
