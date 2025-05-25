<script lang="ts">
  import { onMount } from "svelte";
  import { windowSize } from "../utils";
  import { get } from "svelte/store";

  let canvas: HTMLCanvasElement;
  
  function init(): void {
    const context = canvas.getContext("2d");
    
    if (!context) {
      console.error("2D canvas is not supported by the browser");
      window.windowSettings?.ctx.set(null);
      return;
    }
    
    const { width, height } = get(windowSize)
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    
    context?.scale(dpr, dpr);
    window.windowSettings?.ctx.set(context);
  }
  
  onMount(() => {
    init()
    
    const unsubscribe = windowSize.subscribe(() => {
      init()
    });
    
    return unsubscribe;
  })
</script>

<canvas bind:this={canvas}></canvas>

<style>
  canvas {
    position: fixed;
    top: 0;
    left: 0;
  }
</style>