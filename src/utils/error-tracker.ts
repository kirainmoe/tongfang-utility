export function registerErrorTracker() {
  window.onerror = (msg, url, lineNo, columnNo, error) => {
    console.log(`Error occurred: ${msg}`);
    console.log(`At: ${url}@${lineNo}:${columnNo}`);
    console.log(`Stack:`, error?.stack);
  };

  window.addEventListener('rejectionhandled', event => {
    console.log(`Promise Rejected: ${event.reason}`);
  });
}