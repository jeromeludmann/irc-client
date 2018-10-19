export function computeLag(pongTime: number) {
  return new Promise<number>((resolve, reject) => {
    if (pongTime) {
      resolve(Date.now() - pongTime)
    } else {
      reject(-1)
    }
  })
}
