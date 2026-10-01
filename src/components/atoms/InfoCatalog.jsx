import React from 'react';

export function InfoCatalog({ dateText = "XX/XX/XXXX", type = 0 }) {
  return ( 
    <>
    {type === 1 && (
      <div className="mc-info-catalogo">
        <p>
          <strong>¿No ve reflejadas todas sus compras?  </strong>
          La información se actualiza cada martes con hasta 7 días de retraso.
          <strong> Última actualización: {dateText}</strong>
        </p>
      </div>
    )}


    {type === 2 && (
      <div className="mc-info-catalogo__type2">
        Las compras realizadas hasta el <br />
        <span>{dateText}</span> se ven reflejadas en tu progreso.
      </div>
    )}
    </>
  );
}

export default InfoCatalog