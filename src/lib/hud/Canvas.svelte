<script lang="ts">
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  
  let dpr: number;
  let width: number;
  let height: number;
  
  let lastTime = 0;
  
  let current = 0;
  let next = 1;
  
  let scrollX = 0;
  
  const scrollSpeed = 20; // pixels per second
  
  let fadeProcess = 0;
  const fadeDuration = 2; // seconds
  
  const switchInterval = 10; // seconds
  let timeSinceSwitch = 0;
  
  const bgImages = Array.from({ length: 9 }, (_, i) => window.assets.hud(`bg/Background${i + 1}.png`));
  let loadedBgImage: HTMLImageElement[] = [];

  async function load(): Promise<void> {
    const promises = bgImages.map((src) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
      });
    });

    loadedBgImage = await Promise.all(promises);
  }

  function drawBg(img: HTMLImageElement, x: number, alpha: number): void {
    ctx.globalAlpha = alpha;

    const imgW = img.width;
    const imgH = img.height;

    const scale = height / imgH;
    const drawW = imgW * scale;
    const drawH = height;

    let drawX = x % drawW;
    if (drawX > 0) drawX -= drawW;

    ctx.drawImage(img, drawX, 0, drawW, drawH);
    ctx.drawImage(img, drawX + drawW, 0, drawW, drawH);

    ctx.globalAlpha = 1;
  }

  function draw(): void {
    ctx.clearRect(0, 0, width, height);

    if (fadeProcess > 0) {
      drawBg(loadedBgImage[current], scrollX, 1 - fadeProcess);
      drawBg(loadedBgImage[next], scrollX, fadeProcess);
    } else {
      drawBg(loadedBgImage[current], scrollX, 1);
    }
  }

  function update(dt: number) {
    scrollX -= scrollSpeed * dt;

    timeSinceSwitch += dt;

    if (timeSinceSwitch >= switchInterval) {
      fadeProcess += dt / fadeDuration;
      if (fadeProcess >= 1) {
        fadeProcess = 0;
        current = next;
        next = (next + 1) % loadedBgImage.length;
        timeSinceSwitch = 0;
      }
    }
  }

  function loop(timestamp: number): void {
    if (!lastTime) lastTime = timestamp;
    const dt = (timestamp - lastTime) / 1000;

    lastTime = timestamp;

    update(dt);
    draw();
    requestAnimationFrame(loop);
  }

  async function init(): Promise<void> {
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
    
    window.windowSettings?.ctx.set(ctx);

    await load();
    
    if (loadedBgImage.length === 0) {
      console.error("No background image/s loaded");
    }
    
    requestAnimationFrame(loop);
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