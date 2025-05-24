<script lang="ts">
  import { onMount } from "svelte";
  
  onMount(() => {
    const screen = {
      width: window.innerWidth,
      height: window.innerHeight,
      fps: 60,
    };

    window.gameState ??= {
      gameState: 0,
      score: 0,
      screen,
    };

    window.settings ??= Object.freeze({
      bird: {
        startX: screen.width / 2,
        startY: screen.height / 2,
        gravity: 250,
        flapForce: -100,
        maxFallSpeed: 250,
      },
      pipes: {
        speed: 150,
        gap: 100,
        distance: 50,
      },
    });

    window.assets = Object.freeze({
      entity: (p: string) => `assets/entity/${p}`,
      hud: (p: string) => `assets/hud/${p}`,
      sfx: (p: string) => `assets/sfx/${p}`,
    });

    window.gameSettings ??= {
      theme: "light",
      sfx: true,
      bgx: true,
      contrast: "normal",
      reduceMotion: false,
      difficulty: "normal",
    };
  });
</script>

<slots></slots>