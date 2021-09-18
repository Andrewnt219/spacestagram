import { HasMessage } from '@common';

export function hasMessage(obj: unknown): obj is HasMessage {
  return typeof obj === 'object' && obj !== null && 'message' in obj;
}

export function isNullOrUndeinfed(obj: unknown): obj is null | undefined {
  return obj === null || obj === undefined;
}

export function hasValue<T>(obj: null | undefined | T): obj is T {
  return obj !== null && obj !== undefined;
}
