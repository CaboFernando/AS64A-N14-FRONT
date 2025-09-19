import React from 'react';

const Item = ({ text, bgColor }) => {
  return (
    <li style={{ backgroundColor: bgColor, padding: '8px', marginBottom: '4px', listStyle: 'none' }}>
      {text}
    </li>
  );
};

export default Item;
