enum Difficulties {
  easy,
  normal,
  hard
}

enum Themes {
  light,
  dark
}

enum Contrast {
  low,
  normal,
  high
}

export interface GameSettings {
	theme: Themes;
	sfx: boolean;
	bgx: boolean;
	contrast: Contrast;
	reduceMotion: boolean;
	difficulty: Difficulties;
}
