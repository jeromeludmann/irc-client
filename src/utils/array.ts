export function push<T>(times: T[], time: T): Promise<number> {
  return new Promise(resolve => resolve(times.push(time)))
}

export function shift<T>(times: T[]): Promise<T> {
  return new Promise(resolve => resolve(times.shift()))
}
