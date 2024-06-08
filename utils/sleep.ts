export function sleep(ms: number) {
  return new Promise<void>((rs) => {
    setTimeout(() => {
      return rs();
    }, ms);
  });
}
