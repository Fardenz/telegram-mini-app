export default function promisifiedSetTimeout(ms: number): Promise<undefined> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
