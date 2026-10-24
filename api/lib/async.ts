/**
 * Asynchronous execution deadline utility.
 * Wraps a promise with a hard timeout, rejecting if the promise does not settle within timeoutMs.
 * Prevents serverless function hangs and 504 Gateway Timeouts.
 *
 * @param promise - The asynchronous promise to execute
 * @param timeoutMs - Maximum execution duration in milliseconds before timeout
 * @param operationName - Human-readable label for debugging and error logging
 * @returns Resolves with the promise value if completed within deadline
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  operationName: string = "Operation"
): Promise<T> {
  let timerId: NodeJS.Timeout | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timerId = setTimeout(() => {
      reject(new Error(`${operationName} timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timerId) {
      clearTimeout(timerId);
    }
  }
}

export default withTimeout;
