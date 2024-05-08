import React, { useState } from 'react';
import Select from 'react-select';
import countries from './countries'; // Імпортуємо список країн
import './App.css';

function App() {
  //const [input1, setInput1] = useState('');
  const [location, setLocation] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [keywordToInclude, setKeywordToInclude] = useState('');
  const [keywordToExclude, setKeywordToExclude] = useState('');
  const [inputsLeft, setInputsLeft] = useState([]);
  const [inputsRight, setInputsRight] = useState([]);

  const handleSearch = () => {
    // Збираємо текст з усіх інпутів з додаванням "AND" або "-"
    const inputValues = {
      input3: jobTitle ? `intitle:${jobTitle}` : '',
      input2: location ? `${location}+AND` : '',
      input5: keywordToInclude ? `${keywordToInclude}+AND` : '',
      input4: keywordToExclude ? `-${keywordToExclude}+AND` : '',
      ...inputsRight.reduce((acc, currentValue, index) => {
        acc[`input${index + 6}`] = currentValue ? `-${currentValue}+AND` : '';
        return acc;
      }, {}),
      ...inputsLeft.reduce((acc, currentValue, index) => {
        acc[`input${index + 6}`] = currentValue ? `${currentValue}+AND` : '';
        return acc;
      }, {})
    };

    // Формуємо посилання зі зібраними значеннями
    const queryString = Object.entries(inputValues)
      .map(([key, value]) => value)
      .filter(value => value !== '')
      .join('+');
    const link = `https://www.google.com/search?q=site:linkedin.com/in/ ${queryString}`;

    // Відкриваємо посилання у новому вікні
    window.open(link, '_blank');
  }

  const handleAddInputLeft = () => {
    setInputsLeft([...inputsLeft, '']);
  }

  const handleAddInputRight = () => {
    setInputsRight([...inputsRight, '']);
  }

  const handleInputChangeLeft = (index, value) => {
    const newInputs = [...inputsLeft];
    newInputs[index] = value;
    setInputsLeft(newInputs);
  }

  const handleInputChangeRight = (index, value) => {
    const newInputs = [...inputsRight];
    newInputs[index] = value;
    setInputsRight(newInputs);
  }

  const handleInputCloseLeft = (index) => {
    const newInputs = [...inputsLeft];
    newInputs.splice(index, 1);
    setInputsLeft(newInputs);
  }

  const handleInputCloseRight = (index) => {
    const newInputs = [...inputsRight];
    newInputs.splice(index, 1);
    setInputsRight(newInputs);
  }

  return (
    <div>
      <div className="header">
        <h1>Мій проект</h1>
      </div>
      
      <div className="container">
        <div className="left-container">
          <div className="input-container">
            <Select
              className="select-country"
              placeholder="Виберіть країну"
              //onChange={(selectedOption) => setInput1(selectedOption.value)}
              options={countries}
              styles={{ width: '300px', marginRight: '10px' }}
            />
          </div>
          
          <div className="input-container">
            <input type="text" placeholder="Job title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} style={{ width: '300px', height: '30px', marginTop: '10px' }} />
          </div>
          
          <div className="input-container">
            <input type="text" placeholder="Keyword to include" value={keywordToInclude} onChange={(e) => setKeywordToInclude(e.target.value)} style={{ width: '300px', height: '30px', marginTop: '10px' }} />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <button onClick={handleAddInputLeft}>Додати інпут</button>
          </div>
          
          {inputsLeft.map((value, index) => (
            <div key={index} className="input-container">
              <input type="text" placeholder={`Введіть значення для input${index + 5}`} value={value} onChange={(e) => handleInputChangeLeft(index, e.target.value)} style={{ width: '300px', height: '30px', marginRight: '10px' }} />
              <button onClick={() => handleInputCloseLeft(index)}>✖</button>
            </div>
          ))}
        </div>
        
        <div className="right-container">
          <div className="input-container">
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '300px', height: '30px', marginRight: '10px' }} />
          </div>
          
          <div className="input-container">
            <input type="text" placeholder="Keyword to exclude" value={keywordToExclude} onChange={(e) => setKeywordToExclude(e.target.value)} style={{ width: '300px', height: '30px', marginTop: '10px' }} />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <button onClick={handleAddInputRight}>Додати інпут</button>
          </div>
          
          {inputsRight.map((value, index) => (
            <div key={index} className="input-container">
              <input type="text" placeholder={`Введіть значення для input${index + 5}`} value={value} onChange={(e) => handleInputChangeRight(index, e.target.value)} style={{ width: '300px', height: '30px', marginRight: '10px' }} />
              <button onClick={() => handleInputCloseRight(index)}>✖</button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="footer">
        <p>Pytin Xyilo</p>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <button style={{ backgroundColor: 'Blue', width: '400px', height: '80px', marginRight: '10px', borderRadius: '25px' }} onClick={handleSearch}><b>X-Ray search via LinkedIn</b></button>
      </div>
    </div>
  );
}

export default App;
