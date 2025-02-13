type Props<T extends unknown[]> = {
  fn: (...args: T) => void
  delay?: number
}

export const debounce = <T extends unknown[]>({
  fn,
  delay = 1000,
}: Props<T>) => {
  let timerId: ReturnType<typeof setTimeout> | undefined

  return (...args: T) => {
    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => fn(...args), delay)
  }
}
