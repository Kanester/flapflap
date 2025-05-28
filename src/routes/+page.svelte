<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  
  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;
  
  let canvasW: number;
  let canvasH: number;
  let dpr: number;
  
  let lastime: number = performance.now();
  let animationId: number;
  
  function init(): void {
    context = canvas.getContext('2D');
    
    if (!context) {
      console.error("[*] 2D Canvas is not support by the current browser!");
      window.windowSettings.ctx.set(null);
      return;
    }
    
    canvasW = window.windowSettings.width;
    canvasH = window.windowSettings.height;
    dpr = window.windowSettings.dpr;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    context.imageSmoothingEnabled = false;
    context.scale(dpr, dpr);
    window.windowSettings.ctx.set(context)
  }
  
  function loop(now: number, entities: () => Promise<void>) {
    const dt = (now - lastime) / 1000;
    
    ctx.clearRect(0, 0, height, width);
    
    requestAnimationId(loop);
  }
  
  onMount(() => {
    init();
    loop(lastime);
  })
  
  onDestroy(() => {
    cancelAnimationFrame(loop);
  })
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