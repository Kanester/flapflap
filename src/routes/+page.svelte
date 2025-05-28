<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { loadEntities, loadImg, loadAudio } from "$lib/load";
  import { type Entity } from "$lib/Entity";
  import { Background } from "$lib/hud/Background";
  
  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D | null = null;
  
  let canvasW: number;
  let canvasH: number;
  let dpr: number;
  
  let lastime: number = performance.now();
  let animationId: number;
  
  let entities: Entity[] = []
  let resizeTimeout: number;
  
  function getPath(type: string, name: string) {
    return `assets/${type}/${name}`;
  }
  
  function handleResize() {
    window.gameWindow.canvasW = window.innerWidth;
    window.gameWindow.canvasH = window.innerHeight;
    window.gameWindow.dpr = window.devicePixelRatio || 1;
  }
  
  function init(): void {
    handleResize();
    context = canvas.getContext('2d');
    
    if (!context) {
      console.error("[*] 2D Canvas is not supported by the current browser!");
      window.gameWindow.ctx.set(null);
      return;
    }
    
    canvasW = window.gameWindow.canvasW;
    canvasH = window.gameWindow.canvasH;
    dpr = window.gameWindow.dpr;

    canvas.width = canvasW * dpr;
    canvas.height = canvasH * dpr;
    canvas.style.width = `${canvasW}px`;
    canvas.style.height = `${canvasH}px`;

    context.imageSmoothingEnabled = false;
    context.setTransform(1, 0, 0, 1, 0, 0)
    context.scale(dpr, dpr);
    
    window.gameWindow.ctx.set(context);
  }
  
  async function setup() {
    const bg = new Background(0, 0, 0);
    
    entities = [bg];
    
    await loadEntities(entities);
  }
  
  function loop(now: number) {
    if (!context) return;
    const dt = (now - lastime) / 1000;
    lastime = now;

    context.clearRect(0, 0, canvasW, canvasH);
    for (const entity of entities) {
	    entity.update?.(dt);
	    entity.draw?.(context);
    }

    animationId = requestAnimationFrame(loop);
  }
  
  const onResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      lastime = performance.now();
      init();
    }, 300);
  };
  
  onMount(async () => {
    onResize();

    loadImg([
      getPath("bg", "Background1.png"),
      getPath("bg", "Background2.png"),
      getPath("bg", "Background3.png"),
      getPath("bg", "Background4.png"),
      getPath("bg", "Background5.png"),
      getPath("bg", "base.png")
    ]);

    loadAudio([
      getPath("bgx", "After_All.mp3")
    ]);
    
    await setup();

    window.addEventListener('resize', onResize);

    animationId = requestAnimationFrame(loop);
  });
  
  onDestroy(() => {
    window.removeEventListener('resize', onResize);
    cancelAnimationFrame(animationId);
    clearTimeout(resizeTimeout)
  });
</script>

<canvas bind:this={canvas}></canvas>

<style>
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    background: transparent;
  }
</style>