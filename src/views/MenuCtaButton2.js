import React from 'react';
import MenuCtaButtonBackground from './MenuCtaButtonBackground';
import MenuCtaButtonText from './MenuCtaButtonText';

export default function MenuCtaButton2(props) {
  return (
    <div
      className="menuCtaButton2"
      style={{ ...componentStyle, ...props.style }}
    >
      <MenuCtaButtonBackground
        style={{ gridColumn: '1 / 2', gridRow: '1 / 2' }}
      >
        <MenuCtaButtonText style={{ gridColumn: '1 / 2', gridRow: '1 / 2' }} />
      </MenuCtaButtonBackground>

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
