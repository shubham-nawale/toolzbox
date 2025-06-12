import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './i18n';
import { useTranslation } from 'react-i18next';
import Home from './components/Home';
import AgeCalculator from './components/AgeCalculator';
import DateDiffCalculator from './components/DateDiffCalculator'; 
import UnitConverter from './components/UnitConverter';
import WordCharacterCounter from './components/WordCharacterCounter';
import TextCaseConverter from './components/TextCaseConverter';

function App() {
  const { i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  // toggle dark mode class on root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 p-4 font-sans">
        <div className="flex justify-between items-center mb-6">
        <Link to="/" className="text-3xl font-bold text-purple-700 dark:text-purple-300 hover:underline">
          🧰 ToolzBox
        </Link>
          <div className="space-x-2">
            <button onClick={() => changeLanguage('en')} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">English</button>
            <button onClick={() => changeLanguage('mr')} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">मराठी</button>
            <button onClick={() => changeLanguage('hi')} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">हिंदी</button>
            <button onClick={() => setDarkMode(!darkMode)} className="px-2 py-1 bg-purple-600 text-white rounded">
              {darkMode ? '🌞 Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/age-calculator" element={<AgeCalculator />} />
          <Route path="/date-diff" element={<DateDiffCalculator />} />
          <Route path="/unit-converter" element={<UnitConverter />} />
          <Route path="/word-counter" element={<WordCharacterCounter  />} />
          <Route path="/text-case-converter" element={<TextCaseConverter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
