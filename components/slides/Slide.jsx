'use client';

import React from 'react';

export function Slide({ children, bg, bgPosition = 'center', overlay = false }) {
  const style = bg
    ? {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: bgPosition,
      }
    : undefined;

  return (
    <div className="rg-slide__canvas" data-overlay={overlay ? 'true' : 'false'} style={style}>
      <div className="rg-slide__content">{children}</div>
    </div>
  );
}
