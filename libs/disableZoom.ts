// Disable zooming on the page
export function disableZoom() {
  // Set the maximum page scale to 1
  const docElement = document.documentElement;
  (docElement.style as any).msContentZooming = 'none';
  docElement.style.touchAction = 'manipulation';

  // Add event listeners to prevent double tap and pinch zoom
  document.addEventListener('touchmove', event => {
    const touchEvent = event as TouchEvent & { scale: number };
    if (touchEvent.scale !== 1) {
      event.preventDefault();
    }
  }, { passive: false });

  let lastTouchEnd = 0;
  document.addEventListener('touchend', event => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });

  // Enable scrolling on the page
  document.body.style.overflow = 'auto';
  const style =  document.body.style as any
  style.webkitOverflowScrolling = 'touch';
}