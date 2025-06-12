import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function AgeCalculator() {
  const { t } = useTranslation();

  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 max-w-md w-full text-center text-gray-800 dark:text-gray-100">
        <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-6">
          {t('age_calculator_title')}
        </h1>

        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          onClick={calculateAge}
          className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition"
        >
          {t('calculate_button')}
        </button>

        {age && (
          <div className="mt-6 text-lg font-medium text-gray-700 dark:text-gray-200">
            {t('result_prefix')}{" "}
            <span className="text-purple-600 dark:text-purple-400">{age.years}</span> {t('years')},{" "}
            <span className="text-purple-600 dark:text-purple-400">{age.months}</span> {t('months')},{" "}
            <span className="text-purple-600 dark:text-purple-400">{age.days}</span> {t('days')}{" "}
            {t('result_suffix')}
          </div>
        )}
      </div>
    </div>
  );
}

export default AgeCalculator;
