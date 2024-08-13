import React, { useState } from 'react';
import Select from 'react-select';
import countriesList from './countries';
import Header from './Header';
import './App.css';
import CreatableSelect from 'react-select/creatable';

const components = {
  DropdownIndicator: null,
};

// Функція для створення нових опцій
const createOption = (label) => ({
  label,
  value: label,
});

const MultiSelectTextInput = ({ value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(value);

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    if (event.key === 'Enter' || event.key === 'Tab') {
      const newOption = createOption(inputValue);
      const updatedOptions = [...selectedOptions, newOption];
      setSelectedOptions(updatedOptions);
      onChange(updatedOptions);
      setInputValue('');
      event.preventDefault();
    }
  };

  return (
    <CreatableSelect
      className="creatable-select"
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue) => {
        setSelectedOptions(newValue);
        onChange(newValue);
      }}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      value={selectedOptions}
      placeholder={placeholder} // Додаємо кастомний placeholder
    />
  );
};

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [location, setLocation] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [keywordsToInclude, setKeywordsToInclude] = useState([]);
  const [keywordsToExclude, setKeywordsToExclude] = useState([]);

  const handleSearch = () => {
    const encodeValue = (value) => encodeURIComponent(value);

    const inputValues = {
      input3: jobTitle ? `intitle:"${encodeValue(jobTitle)}"` : '',
      input2: location ? `"${encodeValue(location)}"+AND` : '',
      input5: keywordsToInclude.length > 0 ? `${keywordsToInclude.map(k => `"${encodeValue(k.value)}"+AND `).join('')}` : '',
      input4: keywordsToExclude.length > 0 ? `${keywordsToExclude.map(k => `-"${encodeValue(k.value)}"+AND `).join('')}` : '',
    };

    const queryString = Object.entries(inputValues)
      .map(([key, value]) => value)
      .filter(value => value !== '')
      .join('+');

    let link = 'https://www.google.com/search?q=site:linkedin.com/in ';

    if (selectedCountry && selectedCountry.value !== 'All countries') {
      const countryCode = selectedCountry.code.toLowerCase();
      link = `https://www.google.com/search?q=site:${countryCode}.linkedin.com/in `;
    }

    if (queryString) {
      link += `${queryString}`;
    }

    window.open(link, '_blank');
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="input-container">
          <label className="label">Select a country</label>
          <Select
            className="select-country"
            options={countriesList}
            getOptionLabel={(option) => option.value}
            getOptionValue={(option) => option.value}
            onChange={(selectedOption) => setSelectedCountry(selectedOption)}
          />
        </div>
        <div className="input-container">
          <label className="label">Location</label>
          <input
            type="text"
            placeholder="Kyiv"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input"
          />
        </div>
        <div className="input-container">
          <label className="label">Job title</label>
          <input
            type="text"
            placeholder="Front-End"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="input"
          />
        </div>
        <div className="input-container">
          <label className="label">Keywords to include</label>
          <MultiSelectTextInput
            value={keywordsToInclude}
            onChange={(selectedOptions) => setKeywordsToInclude(selectedOptions || [])}
            placeholder="react"
          />
        </div>

        <div className="input-container">
          <label className="label">Keywords to exclude</label>
          <MultiSelectTextInput
            value={keywordsToExclude}
            onChange={(selectedOptions) => setKeywordsToExclude(selectedOptions || [])}
            placeholder="recruiter"
          />
        </div>
      </div>
      <div className="button-container-center">
        <button className="search-button" onClick={handleSearch}><b>Start X-Ray search on LinkedIn</b></button>
      </div>
      <div className="footer">
        <p>Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo Putin Huilo</p>
      </div>
    </div>
  );
}

export default App;
