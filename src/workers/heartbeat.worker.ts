let timerId: ReturnType<typeof setInterval> | null = null;

self.onmessage = (event: MessageEvent<{ type?: string; interval?: number }>) => {
  const { type, interval } = event.data || {};
  if (type === "start") {
    if (timerId) clearInterval(timerId);
    timerId = setInterval(() => {
      self.postMessage({ type: "tick", timestamp: Date.now() });
    }, interval || 15000);
  } else if (type === "stop" && timerId) {
    clearInterval(timerId);
    timerId = null;
  }
};
