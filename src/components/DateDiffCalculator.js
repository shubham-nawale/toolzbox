import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function DateDiffCalculator() {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState(null);
  const [errorKey, setErrorKey] = useState('');

  const calculateDiff = () => {
    setErrorKey('');
    setResult(null);

    if (!startDate || !endDate) {
      setErrorKey('enter_correct_date');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      setErrorKey('invalid_date_range');
      return;
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const oneDay = 1000 * 60 * 60 * 24;
    const totalDays = Math.floor((end - start) / oneDay);

    setResult({ years, months, days, totalDays });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-300">
          {t('date_diff_calculator')}
        </h2>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full mb-3 p-2 rounded border dark:bg-gray-700 dark:text-white"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full mb-4 p-2 rounded border dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={calculateDiff}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          {t('calculate')}
        </button>

        {/* Dynamic error message */}
        {errorKey && (
          <p className="text-red-500 mt-4">{t(errorKey)}</p>
        )}

        {result && (
          <div className="mt-4 text-lg">
            <div>{t('difference')}:</div>
            <div className="font-medium text-purple-600 dark:text-purple-400">
              {result.years} {t('years')}, {result.months} {t('months')}, {result.days} {t('days')}
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {t('total_days')}: <span className="font-semibold">{result.totalDays}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DateDiffCalculator;
