export function generateKey(existingServerKeys: string[]): string {
  const key = Math.random()
    .toString(36)
    .slice(2)
  return existingServerKeys.includes(key)
    ? generateKey(existingServerKeys)
    : key
}
