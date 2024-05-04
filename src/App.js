import React, { useState } from 'react';

function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [newInput, setNewInput] = useState('');
  
  const handleSearch = () => {
    // Генерація посилання з введених даних
    const link = `https://example.com/?input1=${input1}&input2=${input2}&input3=${input3}&input4=${input4}`;
    // Перенаправлення на нову вкладку
    window.open(link, '_blank');
  }

  const handleAddInput = () => {
    // Додавання нового інпуту
    // Якщо потрібно, ви можете додати валідацію для нового інпуту тут
    // Наприклад, перевірку на максимальну кількість інпутів або на наявність значення
    setNewInput('');
  }

  return (
    <div>
      {/* Хедер */}
      <header>
        <h1>Мій проект</h1>
      </header>

      {/* Інпути */}
      <div>
        <input type="text" value={input1} onChange={(e) => setInput1(e.target.value)} />
        <input type="text" value={input2} onChange={(e) => setInput2(e.target.value)} />
      </div>
      <div>
        <input type="text" value={input3} onChange={(e) => setInput3(e.target.value)} />
        <input type="text" value={input4} onChange={(e) => setInput4(e.target.value)} />
      </div>

      {/* Додавання нових інпутів */}
      <div>
        <input type="text" value={newInput} onChange={(e) => setNewInput(e.target.value)} />
        <button onClick={handleAddInput}>Додати інпут</button>
      </div>

      {/* Кнопка Search */}
      <button style={{ backgroundColor: 'yellow' }} onClick={handleSearch}>Search</button>

      {/* Футер */}
      <footer>
        <p>Мій футер</p>
      </footer>
    </div>
  );
}

export default App;
