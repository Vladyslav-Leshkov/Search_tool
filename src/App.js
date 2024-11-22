import React, { useState } from 'react';
import Select from 'react-select';
import countriesList from './countries';
import Header from './Header';
import './App.css';
import CreatableSelect from 'react-select/creatable';
import { Helmet } from 'react-helmet';

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});

const MultiSelectTextInput = ({ value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(value);

  const handleKeyDown = (event) => {
    if (!inputValue) return;

    if (event.key === 'Enter') {
      event.preventDefault();
      const newOption = createOption(inputValue);
      const updatedOptions = [...selectedOptions, newOption];

      setSelectedOptions(updatedOptions);
      onChange(updatedOptions);
      setInputValue('');

      setTimeout(() => {
        event.target.focus();
      }, 0);
    }
  };

  const handleBlur = () => {
    if (inputValue) {
      const newOption = createOption(inputValue);
      const updatedOptions = [...selectedOptions, newOption];

      setSelectedOptions(updatedOptions);
      onChange(updatedOptions);
      setInputValue('');
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
      styles={{
        control: (provided, state) => ({
          ...provided,
          outline: state.isFocused ? '1px solid #4A90E2' : '1px solid transparent',
          borderWidth: "1px",
          borderColor: "#898890",
        }),
        placeholder: (base) => ({
          ...base,
          color: "#b0adbd"
        }),
      }}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      value={selectedOptions}
      placeholder={placeholder}
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
      <Helmet>
        <title>X-Ray Hunt</title>
        <meta name="description" content="X-Ray Hunt helps you find top talent on LinkedIn by leveraging advanced search techniques and filters. Discover and connect with the best candidates effortlessly." />
        <meta property="og:title" content="X-Ray Hunt" />
        <meta property="og:description" content="X-Ray Hunt helps you find top talent on LinkedIn by leveraging advanced search techniques and filters." />
        <meta property="og:image" content="https://vladyslav-leshkov.github.io/Search_tool/logo192.png" />
        <meta property="og:url" content="https://vladyslav-leshkov.github.io/Search_tool/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="X-Ray Hunt" />
        <meta name="twitter:description" content="X-Ray Hunt helps you find top talent on LinkedIn by leveraging advanced search techniques and filters." />
        <meta name="twitter:image" content="https://vladyslav-leshkov.github.io/Search_tool/logo192.png" />
        <meta name="twitter:url" content="https://vladyslav-leshkov.github.io/Search_tool/" />
      </Helmet>
      <Header />
      <div className="container">
        <div className="input-container">
          <label className="label">Select a country</label>
          <Select
            className="select-country"
            options={countriesList}
            styles={{
              control: (base) => ({
                ...base,
                borderWidth: "1px",
                borderColor: "#898890",
                '&:hover': {
                  borderColor: '#b0adbd',
                },
              }),
              placeholder: (base) => ({
                ...base,
                color: "#b0adbd",
              }),
            }}
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
            placeholder="React"
          />
        </div>

        <div className="input-container">
          <label className="label">Keywords to exclude</label>
          <MultiSelectTextInput
            value={keywordsToExclude}
            onChange={(selectedOptions) => setKeywordsToExclude(selectedOptions || [])}
            placeholder="Recruiter"
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