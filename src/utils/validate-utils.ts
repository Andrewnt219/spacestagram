import { HasMessage } from '@common';

export function hasMessage(obj: unknown): obj is HasMessage {
  return typeof obj === 'object' && obj !== null && 'message' in obj;
}
