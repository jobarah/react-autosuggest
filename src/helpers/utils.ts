export const debounce = (callback: Function, wait: number) => {
  let timeout: string | number | NodeJS.Timeout | undefined
  return (...args: Array<unknown>) => {
    const next = () => callback(...args)
    clearTimeout(timeout)
    timeout = setTimeout(next, wait)
  }
}