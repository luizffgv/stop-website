/** Error thrown when a function was called but is unimplemented. */
export class UnimplementedError extends Error {}

/**
 * Throws an `UnimplementedError` when called.
 * @throws {UnimplementedError} when called.
 */
export function unimplemented(): never {
  throw new UnimplementedError();
}

export default unimplemented;
