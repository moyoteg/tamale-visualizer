import React from 'react';

export default function MenuCtaButtonText(props) {
  return (
    <div
      className="menuCtaButtonText"
      style={{ ...componentStyle, ...props.style }}
    >
      <p style={{ margin: 0 }}>Refresh</p>
    </div>
  );
}

const componentStyle = {
  textShadow: '0px 10px 40px rgba(25, 104, 252, 0.2)',
  opacity: '1',
  color: '#ffffff',
  font: '13px "Muli-Bold"',
  display: 'grid',
  justifyItems: 'center',
  textAlign: 'center',
  alignItems: 'center'
};
