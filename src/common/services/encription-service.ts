export const EncryptionServiceToken = 'EncryptionService';

export interface EncryptionService {
  encrypt(text: string): string;
  compare(text: string, hashed: string): boolean;
}
