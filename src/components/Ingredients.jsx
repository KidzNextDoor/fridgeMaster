import React from 'react';

export default function Ingredients({ name, quantity }) {
  return (
    <div>
      <p>
        {name}
        {quantity}
      </p>
    </div>
  );
}
