export function cleanNonSet<T>(toClean: Record<string, T | undefined>): Record<string, T> {
  const result: Record<string, T> = {}

  Object.entries(toClean).forEach(([key, value]) => {
    if (value !== undefined) result[key] = value
  })

  return result
}

export default cleanNonSet
