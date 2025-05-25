<script lang="ts">
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  
  let dpr: number;
  let width: number;
  let height: number;

  function init(): void {
    ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("2D canvas is not supported by the browser");
      window.windowSettings?.ctx.set(null);
      return;
    }

    width = window.innerWidth;
    height = window.innerHeight;
    dpr = window.windowSettings.dpr;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.imageSmoothingEnabled = false;
    ctx?.scale(dpr, dpr);
  }

  onMount(() => {
    init();
  });
</script>

<canvas bind:this={canvas}></canvas>

<style>
  canvas {
    position: fixed;
    top: 0;
    left: 0;
  }
</style>