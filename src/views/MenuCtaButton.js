import React from 'react';
import MenuCtaButton2 from './MenuCtaButton2';

export default function MenuCtaButton(props) {
  return (
    <div
      className="menuCtaButton"
      style={{ ...componentStyle, ...props.style }}
    >
      <MenuCtaButton2 style={{ gridColumn: '1 / 2', gridRow: '1 / 2' }} />

      {props.children}
    </div>
  );
}

const componentStyle = {
  opacity: '1',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'minmax(50px, auto) 1fr'
};
