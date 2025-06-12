import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const unitOptions = {
  length: ['meter', 'kilometer', 'mile', 'foot', 'inch'],
  weight: ['gram', 'kilogram', 'pound', 'ounce'],
  temperature: ['celsius', 'fahrenheit', 'kelvin']
};

const unitEmojis = {
  length: '📏',
  weight: '⚖️',
  temperature: '🌡️'
};

const convertValue = (category, value, from, to) => {
  value = parseFloat(value);
  if (isNaN(value)) return '';

  switch (category) {
    case 'length': {
      const meters = {
        meter: 1,
        kilometer: 1000,
        mile: 1609.34,
        foot: 0.3048,
        inch: 0.0254
      };
      return (value * meters[from]) / meters[to];
    }
    case 'weight': {
      const grams = {
        gram: 1,
        kilogram: 1000,
        pound: 453.592,
        ounce: 28.3495
      };
      return (value * grams[from]) / grams[to];
    }
    case 'temperature': {
      if (from === to) return value;
      let celsius;

      // Convert to Celsius first
      if (from === 'celsius') celsius = value;
      else if (from === 'fahrenheit') celsius = (value - 32) * (5 / 9);
      else if (from === 'kelvin') celsius = value - 273.15;

      // Convert from Celsius to target
      if (to === 'celsius') return celsius;
      else if (to === 'fahrenheit') return celsius * (9 / 5) + 32;
      else if (to === 'kelvin') return celsius + 273.15;
    }
    default:
      return '';
  }
};

function UnitConverter() {
  const { t } = useTranslation();

  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const handleConvert = () => {
    const converted = convertValue(category, value, fromUnit, toUnit);
    
    if (typeof converted === 'number' && !isNaN(converted)) {
      setResult(converted.toFixed(4));
    } else {
      setResult('');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-300">
          {unitEmojis[category]} {t('unit_converter')}
        </h2>

        {/* Category Selector */}
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{t('category')}</label>
        <select
          className="w-full mb-4 p-2 rounded border dark:bg-gray-700 dark:text-white"
          value={category}
          onChange={(e) => {
            const newCat = e.target.value;
            setCategory(newCat);
            setFromUnit(unitOptions[newCat][0]);
            setToUnit(unitOptions[newCat][1]);
            setResult('');
          }}
        >
          <option value="length">{t('length')}</option>
          <option value="weight">{t('weight')}</option>
          <option value="temperature">{t('temperature')}</option>
        </select>

        {/* Value Input */}
        <input
          type="number"
          placeholder={t('value')}
          className="w-full mb-4 p-2 rounded border dark:bg-gray-700 dark:text-white"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {/* From and To Units */}
        <div className="flex gap-2 mb-4">
          <select
            className="w-1/2 p-2 rounded border dark:bg-gray-700 dark:text-white"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
          >
            {unitOptions[category].map((unit) => (
              <option key={unit} value={unit}>{t(unit)}</option>
            ))}
          </select>
          <select
            className="w-1/2 p-2 rounded border dark:bg-gray-700 dark:text-white"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
          >
            {unitOptions[category].map((unit) => (
              <option key={unit} value={unit}>{t(unit)}</option>
            ))}
          </select>
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          className="bg-purple-600 text-white w-full py-2 rounded hover:bg-purple-700 transition"
        >
          {t('convert')}
        </button>

        {/* Result */}
        {result && (
          <div className="mt-4 text-lg text-purple-700 dark:text-purple-300 font-semibold">
            {t('converted_value')}: {result} {t(toUnit)}
          </div>
        )}
      </div>
    </div>
  );
}

export default UnitConverter;
