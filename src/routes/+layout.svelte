<script lang="ts">
  import { onMount } from "svelte";
  import { writable, get } from 'svelte/store';
  
  onMount(() => {
    window.windowSettings ??= {
      width: 256,
      height: 368,
      fps: 60,
      dpr: window.devicePixelRatio || 1,
      ctx: writable<CanvasRenderingContext2D | null>(null)
    }

    window.gameState ??= {
      gameState: 0,
      score: 0,
    };

    window.settings ??= Object.freeze({
      bird: {
        startX: 256 / 2,
        startY: 368 / 2,
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

<slot />