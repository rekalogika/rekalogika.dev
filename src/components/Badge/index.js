import React from 'react';

export default function Badge({children, type}) {
  type = type || 'primary';
  type = `badge badge--${type}`;
  return (
    <span class={type}>
      {children}
    </span>
  );
}