import React from 'react';
import MenuCtaButton2 from './MenuCtaButton2';

export default function MenuCtaButton(props) {

  const { buttonWidth, style, children, onClick, centered } = props;

  return (
    <button
      className="menuCtaButton"
      style={{ 
        maxWidth: (`${buttonWidth}px` || 'none'), 
        ...componentStyle, 
        ...style, 
        ...(centered ? centerSizedButton : {}), 
      }}
      onClick={onClick}
    >
      <MenuCtaButton2 style={{ gridColumn: '1 / 2', gridRow: '1 / 2' }} />

      {children}
    </button>
  );
}

const componentStyle = {
  opacity: '1',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'minmax(50px, auto) 1fr',
  border: 0,
  padding: 0
};

const centerSizedButton = {
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto'
}