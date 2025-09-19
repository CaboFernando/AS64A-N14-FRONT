import React, { useState } from 'react';
import Item from './components/Item';

const App = () => {
  // 2.1 – controle da visibilidade
  const [visible, setVisible] = useState(true);

  // 2.2 – input com validação
  const [inputValue, setInputValue] = useState('');
  const isInputValid = inputValue.length >= 3;

  // 2.3 – lista de itens (ul + li)
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const handleAddItem = (e) => {
    if (e.key === 'Enter' && newItem.trim() !== '') {
      setItems([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      {/* 2.1 Botão de visibilidade */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'Ocultar' : 'Mostrar'} Elemento
        </button>
        {visible && <span style={{ marginLeft: '1rem' }}>👀 Elemento visível</span>}
      </div>

      {/* 2.2 Input com validação */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Digite ao menos 3 caracteres"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {!isInputValid && (
          <span style={{ color: 'red', marginLeft: '1rem' }}>
            Mínimo de 3 caracteres!
          </span>
        )}
      </div>

      {/* 2.3 Input + Enter para adicionar item na lista */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Adicione um item e pressione Enter"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleAddItem}
        />
      </div>

      {/* 2.4 e 2.5 Lista com componente Item e cores alternadas */}
      <ul>
        {items.map((item, index) => (
          <Item
            key={index}
            text={item}
            bgColor={index % 2 === 0 ? '#0b0c63' : '#1b630b'}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
