import React from 'react';

export default function MenuCtaButtonBackground(props) {
  return (
    <div
      className="menuCtaButtonBackground"
      style={{ ...componentStyle, ...props.style }}
    >
      {props.children}
    </div>
  );
}

const componentStyle = {
  boxShadow: '0px 10px 40px 0px rgba(25, 104, 252, 0.3)',
  background: '#1968fc',
  opacity: '1',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'minmax(50px, auto) 1fr'
};
