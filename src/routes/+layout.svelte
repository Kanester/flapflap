<script lang="ts">
  import { browser } from '$app/environment';
  import { writable } from 'svelte/store';
  import { onDestroy } from 'svelte';

  if (browser) {
    // --- ASSETS ---
    window.assets ??= {
      ui:    (p: string) => `assets/ui/${p}`,
      bg:    (p: string) => `assets/bg/${p}`,
      entity:(p: string) => `assets/entity/${p}`,
      bgx:   (p: string) => `assets/bgx/${p}`,
      sfx:   (p: string) => `assets/sfx/${p}`,
      getAssets(type: AssetType, path: string) {
        return this[type]?.(path) ?? path;
      }
    };

    // --- WINDOW SETTINGS ---
    function initWindowSettings() {
      window.windowSettings = {
        width:  window.innerWidth,
        height: window.innerHeight,
        fps:    60,
        dpr:    window.devicePixelRatio || 1,
        ctx:    writable<CanvasRenderingContext2D | null>(null)
      };
    }

    initWindowSettings();

    const onResize = () => {
      window.windowSettings!.width  = window.innerWidth;
      window.windowSettings!.height = window.innerHeight;
      window.windowSettings!.dpr    = window.devicePixelRatio || 1;
    };
    window.addEventListener('resize', onResize);

    // --- GAME STATE & SETTINGS ---
    window.state ??= {
      gameState: 0,
      score: 0
    };

    window.settings ??= Object.freeze({
      bird: {
        startX: window.windowSettings.width  / 2,
        startY: window.windowSettings.height / 2,
        gravity: 250,
        flapForce: -100,
        maxFallSpeed:250
      },
      pipes: {
        speed: 150,
        gap: 100,
        distance: 50
      }
    });

    window.gameSettings ??= {
      theme: 'light',
      sfx: true,
      bgx: true,
      contrast: 'normal',
      reduceMotion: false,
      difficulty: 1
    };
    
    onDestroy(() => {
      window.removeEventListener('resize', onResize);
    });
  }
</script>

<slot />