export const CRLF = '\r\n'

export const IRC_MESSAGE_LENGTH = 512 - CRLF.length

export const CHANNEL_REGEXP = /^([&|#|\+|!]\S+)$/

export function generateServerKey(existingServerKeys: string[]): string {
  const key = Math.random()
    .toString(36)
    .slice(2)
  return existingServerKeys.includes(key)
    ? generateServerKey(existingServerKeys)
    : key
}
