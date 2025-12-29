import React from 'react';
import FeedbackForm from './FeedbackForm';

function App() {
  return (
    <div className="App">
      <header style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Тестовое задание</h1>
        <p>Нажмите на кнопку ниже, чтобы проверить функционал.</p>
        
        {/* Компонент с кнопкой и формой */}
        <FeedbackForm />
        
      </header>
    </div>
  );
}

export default App;