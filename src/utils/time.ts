export function getCurrentTime(): Promise<number> {
  return new Promise(resolve => resolve(Date.now()))
}
