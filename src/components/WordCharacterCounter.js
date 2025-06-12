import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function WordCharacterCounter() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-300">
          {t('word_char_counter')}
        </h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder={t('enter_text')}
          className="w-full p-3 mb-4 border rounded-md dark:bg-gray-700 dark:text-white"
        />

        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            {t('words')}: <span className="font-semibold text-purple-600 dark:text-purple-300">{wordCount}</span> | {t('characters')}: <span className="font-semibold text-purple-600 dark:text-purple-300">{charCount}</span>
          </div>

          <button
            onClick={handleCopy}
            className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition text-sm"
          >
            {copied ? t('copied') : t('copy')}
          </button>
        </div>

        <div className="border-t pt-4 text-sm text-gray-600 dark:text-gray-400">
          <strong>{t('preview')}:</strong>
          <p className="mt-2">{text || t('no_text')}</p>
        </div>
      </div>
    </div>
  );
}

export default WordCharacterCounter;
