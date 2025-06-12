import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();

  const tools = [
    { title: t('age_calculator'), path: '/age-calculator', emoji: '🎂' },
    { title: t('date_diff_calculator'), path: '/date-diff', emoji: '📅' },
    { title: t('unit_converter'), path: '/unit-converter', emoji: '🧮' },
    { title: t('text_case_converter'), path: '/text-case-converter', emoji: '🔤' },
    { title: t('word_counter'), path: '/word-counter', emoji: '📝' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-purple-700 dark:text-purple-300 drop-shadow-md">
          {t('welcome') || 'Welcome to ToolzBox'}
        </h1>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {tools.map((tool, idx) => (
            <Link
              key={idx}
              to={tool.path}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all p-6 flex flex-col items-center text-center border border-purple-100 dark:border-gray-700"
            >
              <div className="text-5xl mb-4">{tool.emoji}</div>
              <div className="text-lg sm:text-xl font-semibold text-purple-800 dark:text-purple-300">{tool.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
