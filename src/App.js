import React, { useState } from 'react';
import Select from 'react-select';
import countries from './countries'; // Імпортуємо список країн
import './App.css';

function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [inputs, setInputs] = useState([]);

  const handleSearch = () => {
    // Збираємо текст з усіх інпутів з додаванням "AND"
    const inputValues = {
      input1: input1 ? `${input1}+AND` : '',
      input2: input2 ? `${input2}+AND` : '',
      input3: input3 ? `${input3}+AND` : '',
      input4: input4 ? `${input4}+AND` : '',
      ...inputs.reduce((acc, currentValue, index) => {
        acc[`input${index + 5}`] = currentValue ? `${currentValue}+AND` : '';
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

  const handleAddInput = () => {
    setInputs([...inputs, '']);
  }

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  }

  const handleInputClose = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  }

  return (
    <div style={{ marginLeft: '200px' }}>
      <header>
        <h1>Мій проект</h1>
      </header>

      <div className="input-container">
        <Select
          className="select-country"
          placeholder="Виберіть країну"
          onChange={(selectedOption) => setInput1(selectedOption.value)}
          options={countries}
          styles={{ width: '300px', marginRight: '10px' }}
        />
        <input type="text" placeholder="Введіть значення для input2" value={input2} onChange={(e) => setInput2(e.target.value)} style={{ width: '300px', height: '30px' }} />
      </div>

      <div className="input-container">
        <input type="text" placeholder="Введіть значення для input3" value={input3} onChange={(e) => setInput3(e.target.value)} style={{ width: '300px', height: '30px', marginRight: '10px' }} />
        <input type="text" placeholder="Введіть значення для input4" value={input4} onChange={(e) => setInput4(e.target.value)} style={{ width: '300px', height: '30px' }} />
      </div>

      {inputs.map((value, index) => (
        <div key={index} className="input-container">
          <input type="text" placeholder={`Введіть значення для input${index + 5}`} value={value} onChange={(e) => handleInputChange(index, e.target.value)} style={{ width: '300px', height: '30px', marginRight: '10px' }} />
          <button onClick={() => handleInputClose(index)}>✖</button>
        </div>
      ))}
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleAddInput}>Додати інпут</button>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <button style={{ backgroundColor: 'yellow', width: '100px', height: '50px', marginRight: '10px', borderRadius: '25px' }} onClick={handleSearch}><b>Пошук</b></button>
      </div>

      <footer>
        <p>Мій футер</p>
      </footer>
    </div>
  );
}

export default App;
