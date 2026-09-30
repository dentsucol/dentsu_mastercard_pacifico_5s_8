import React from 'react';

export function InfoCatalog({ dateText = "XX/XX/XXXX" }) {
  return (
    <div className="mc-info-catalogo">
      <p>
        Las compras realizadas hasta el <br/>
        <span>{dateText}</span> se ven reflejadas en tu progreso.<br/>
        <span>*La información se actualiza cada martes con hasta 7 días de retraso.</span>
      </p>
    </div>
  );
}

export default InfoCatalog