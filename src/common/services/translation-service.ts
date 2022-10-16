export const TranslationServiceToken = 'TranslationService';

interface TranslateOptions {
  lang?: string;
  args?: { [key: string]: any };
}

export interface TranslationService {
  translate(key: string, options?: TranslateOptions): Promise<string>;
}
