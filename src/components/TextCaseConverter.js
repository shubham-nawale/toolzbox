import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function TextCaseConverter() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toSentenceCase = (str) =>
    str
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());

  const toCapitalizedCase = (str) =>
    str
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const handleChange = (type) => {
    switch (type) {
      case 'upper':
        setText(text.toUpperCase());
        break;
      case 'lower':
        setText(text.toLowerCase());
        break;
      case 'sentence':
        setText(toSentenceCase(text));
        break;
      case 'capitalized':
        setText(toCapitalizedCase(text));
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-300">
          {t('text_case_converter')}
        </h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder={t('enter_text')}
          className="w-full mb-4 p-3 border rounded dark:bg-gray-700 dark:text-white"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-sm">
          <button
            onClick={() => handleChange('upper')}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {t('uppercase')}
          </button>
          <button
            onClick={() => handleChange('lower')}
            className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            {t('lowercase')}
          </button>
          <button
            onClick={() => handleChange('sentence')}
            className="bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
          >
            {t('sentence_case')}
          </button>
          <button
            onClick={() => handleChange('capitalized')}
            className="bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
          >
            {t('capitalized_case')}
          </button>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300 text-sm">
            {t('characters')}: {text.length}
          </span>

          <button
            onClick={handleCopy}
            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm"
          >
            {copied ? t('copied') : t('copy')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TextCaseConverter;
