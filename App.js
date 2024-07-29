import React, { useState } from 'react';
import Select from 'react-select';
import countriesList from './countries';
import Header from './Header';
import './App.css';

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [location, setLocation] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [keywordToInclude, setKeywordToInclude] = useState('');
  const [keywordToExclude, setKeywordToExclude] = useState('');
  const [inputsLeft, setInputsLeft] = useState([]);
  const [inputsRight, setInputsRight] = useState([]);

  const handleSearch = () => {
    const encodeValue = (value) => encodeURIComponent(value);

    const inputValues = {
      input3: jobTitle ? `intitle:${encodeValue(jobTitle)}` : '',
      input2: location ? `${encodeValue(location)}+AND` : '',
      input5: keywordToInclude ? `${encodeValue(keywordToInclude)}+AND` : '',
      input4: keywordToExclude ? `-${encodeValue(keywordToExclude)}+AND` : '',
      ...inputsLeft.reduce((acc, currentValue, index) => {
        acc[`inputL${index + 6}`] = currentValue ? `${encodeValue(currentValue)}+AND` : '';
        return acc;
      }, {}),
      ...inputsRight.reduce((acc, currentValue, index) => {
        acc[`inputR${index + 6}`] = currentValue ? `-${encodeValue(currentValue)}+AND` : '';
        return acc;
      }, {})
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

  const handleAddInputLeft = () => {
    setInputsLeft([...inputsLeft, '']);
  };

  const handleAddInputRight = () => {
    setInputsRight([...inputsRight, '']);
  };

  const handleInputChangeLeft = (index, value) => {
    const newInputs = [...inputsLeft];
    newInputs[index] = value;
    setInputsLeft(newInputs);
  };

  const handleInputChangeRight = (index, value) => {
    const newInputs = [...inputsRight];
    newInputs[index] = value;
    setInputsRight(newInputs);
  };

  const handleInputCloseLeft = (index) => {
    const newInputs = [...inputsLeft];
    newInputs.splice(index, 1);
    setInputsLeft(newInputs);
  };

  const handleInputCloseRight = (index) => {
    const newInputs = [...inputsRight];
    newInputs.splice(index, 1);
    setInputsRight(newInputs);
  };

  return (
    <div>
      <Header />

      <div className="container">
        <div className="left-container">
          <div className="input-container">
            <label>Select a country</label>
            <Select
              className="select-country"
              options={countriesList}
              getOptionLabel={(option) => option.value}
              getOptionValue={(option) => option.value}
              onChange={(selectedOption) => setSelectedCountry(selectedOption)}
            />
          </div>

          <div className="input-container">
            <label>Job title</label>
            <input
              type="text"
              placeholder="Front-End"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="input"
            />
          </div>

          <div className="input-container">
            <label>Keyword to include</label>
            <div className="input-with-button">
              <input
                type="text"
                placeholder="React"
                value={keywordToInclude}
                onChange={(e) => setKeywordToInclude(e.target.value)}
                className="input"
              />
              <button onClick={handleAddInputLeft} className="add-input-button">Add input</button>
            </div>
          </div>

          {inputsLeft.map((value, index) => (
            <div key={index} className="input-with-close">
              <label>{`Keyword to include${index + 2}`}</label>
              <input
                type="text"
                placeholder={`One more skill`}
                value={value}
                onChange={(e) => handleInputChangeLeft(index, e.target.value)}
                className="input"
              />
              <button onClick={() => handleInputCloseLeft(index)} className="close-button">✖</button>
            </div>
          ))}
        </div>

        <div className="right-container">
          <div className="input-container">
            <label>Location</label>
            <input
              type="text"
              placeholder="Kyiv"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input"
            />
          </div>

          <div className="input-container">
            <label>Keyword to exclude</label>
            <div className="input-with-button">
              <input
                type="text"
                placeholder="Recruiter"
                value={keywordToExclude}
                onChange={(e) => setKeywordToExclude(e.target.value)}
                className="input"
              />
              <button onClick={handleAddInputRight} className="add-input-button">Add input</button>
            </div>
          </div>

          {inputsRight.map((value, index) => (
            <div key={index} className="input-with-close">
              <label>{`Keyword to exclude${index + 2}`}</label>
              <input
                type="text"
                placeholder={`One more`}
                value={value}
                onChange={(e) => handleInputChangeRight(index, e.target.value)}
                className="input"
              />
              <button onClick={() => handleInputCloseRight(index)} className="close-button">✖</button>
            </div>
          ))}
        </div>
      </div>

      <div className="button-container-center">
        <button className="search-button" onClick={handleSearch}><b>X-Ray search via LinkedIn</b></button>
      </div>

      <div className="footer">
        <p>Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo Pytin Xyilo</p>
      </div>
    </div>
  );
}

export default App;
