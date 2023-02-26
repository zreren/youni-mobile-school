export function enableZoom() {
  // Reset the maximum page scale
  const docElement = document.documentElement;
  (docElement.style as any).msContentZooming = '';
  docElement.style.touchAction = '';
  let lastTouchEnd = 0;
  // Remove event listeners that prevent double tap and pinch zoom
  document.addEventListener(
    'touchmove',
    (event) => {
      const touchEvent = event as TouchEvent & { scale: number };
      if (touchEvent.scale !== 1) {
        event.preventDefault();
      }
    },
    { passive: false, capture: false },
  );

  document.removeEventListener(
    'touchend',
    (event) => {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    // { passive: false, capture: false },
  );
  // Enable scrolling on the page
  document.body.style.overflow = 'auto';
  const style = document.body.style as any;
  style.webkitOverflowScrolling = 'touch';
}
