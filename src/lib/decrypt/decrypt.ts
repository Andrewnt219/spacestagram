import crypto from 'crypto';

const ALGORITHM = 'aes-128-cbc';

/**
 * @param source get from https://www.devglan.com/online-tools/aes-encryption-decryption
 */
export const decrypt = <Result>(
  source: string,
  key: string,
  iv: string
): Result => {
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

  let decrypted = decipher.update(source, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  return JSON.parse(decrypted);
};
