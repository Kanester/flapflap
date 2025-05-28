<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { loadImg, loadAudio } from "$lib/load";
  
  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;
  
  let canvasW: number;
  let canvasH: number;
  let dpr: number;
  
  let lastime: number = performance.now();
  let animationId: number;
  
  function init(): void {
    context = canvas.getContext('2d');
    
    if (!context) {
      console.error("[*] 2D Canvas is not support by the current browser!");
      window.gameWindow.ctx.set(null);
      return;
    }
    
    canvasW = window.innerWidth;
    canvasH = window.innerHeight;
    dpr = window.gameWindow.dpr;
    
    canvas.width = canvasW * dpr;
    canvas.height = canvasH * dpr;
    canvas.style.width = `${canvasW}px`;
    canvas.style.height = `${canvasH}px`;
    
    context.imageSmoothingEnabled = false;
    context.scale(dpr, dpr);
    window.gameWindow.ctx.set(context)
  }
  
  function loop(now: number, entities: () => Promise<void>) {
    const dt = (now - lastime) / 1000;
    
    context.clearRect(0, 0, canvasW, canvasH);
    
    requestAnimationFrame(loop);
  }
  
  function getPath(isType: string, name: string) {
    return `assets/${isType}/${name}`;
  }
  
  onMount(() => {
    init();
    loadImg([
      getPath("bg", "Background1.png"),
      getPath("bg", "Background2.png"),
      getPath("bg", "Background3.png"),
      getPath("bg", "Background4.png"),
      getPath("bg", "Background5.png"),
      getPath("bg", "Background6.png"),
      getPath("bg", "Background7.png"),
      getPath("bg", "Background8.png"),
      getPath("bg", "Background9.png"),
      getPath("bg", "base.png")
    ]);
    
    loadAudio([
      getPath("bgx", "After_All.mp3")
    ])
    
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