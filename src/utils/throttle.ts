// eslint-disable-next-line @typescript-eslint/no-explicit-any
const throttle = <T extends any[]>(
  callback: (...args: T) => void,
  ms: number,
) => {
  let isThrottling = false;
  return (...args: T) => {
    if (isThrottling) return;
    isThrottling = true;
    setTimeout(() => {
      callback(...args);
      isThrottling = false;
    }, ms);
  };
};

export default throttle;
