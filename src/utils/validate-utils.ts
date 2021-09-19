import { HasMessage } from '@common';

/** Check if object has a message properties in the first nested level */
export function hasMessage(obj: unknown): obj is HasMessage {
  return typeof obj === 'object' && obj !== null && 'message' in obj;
}

/** Check if the obj is null or undefined */
export function isNullOrUndeinfed(obj: unknown): obj is null | undefined {
  return obj === null || obj === undefined;
}

/** Check if the obj has a value that is not null or undefined */
export function hasValue<T>(obj: null | undefined | T): obj is T {
  return obj !== null && obj !== undefined;
}
