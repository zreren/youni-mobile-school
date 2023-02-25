export function enableZoom() {
    // Set the maximum page scale to 10 (or remove the max scale limit)
    const docElement = document.documentElement;
    (docElement.style as any).msContentZooming = 'initial';
    docElement.style.touchAction = 'auto';
  
    // Remove event listeners that prevent double tap and pinch zoom
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  
    // Enable scrolling on the page
    document.body.style.overflow = 'auto';
    const style =  document.body.style as any
    style.webkitOverflowScrolling = 'auto';
  }
  let lastTouchEnd = 0;
  function handleTouchMove(event: TouchEvent) {
    const touchEvent = event as TouchEvent & { scale: number };
    if (touchEvent.scale !== 1) {
      event.preventDefault();
    }
  }
  
  function handleTouchEnd(event: TouchEvent) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }