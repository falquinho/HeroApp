export const debounce = <T extends (...args: any[]) => void>(fn: T, timeout: number = 400) => {
  let timer: NodeJS.Timeout;

  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args)
    }, timeout);
  };
  return debounced as (...args: Parameters<T>) => ReturnType<T>
}