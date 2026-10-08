import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { StateController } from './../../App'
import useWidth from '../../hooks/useWidth'
import Container from '../../layouts/Container/Container'
import { sendDataLayer } from '../../utils/functions'

function MajorAward() {
  const { context } = useContext(StateController)
  const { width } = useWidth()
  const navigate = useNavigate()
  const viewTextMajorAward = false;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const dataLayerTyc = (e) => {
    e.preventDefault()
    sendDataLayer({
      datalayer: {
        event: 'grand_prize',
        text: 'términos y condiciones.',
        link: '/terminos-y-condiciones'
      },
      repeat: true
    })
    navigate('/terminos-y-condiciones')
  }

  const dataLayer = (e) => {
    e.preventDefault()
    sendDataLayer({
      datalayer: {
        event: 'grand_prize',
        text: 'https://www.amazon.com/-/es/gp/help/customer/display.html?nodeId=201936990',
        link: 'https://www.amazon.com/-/es/gp/help/customer/display.html?nodeId=201936990'
      },
      repeat: true
    })
    window.open(
      'https://www.amazon.com/-/es/gp/help/customer/display.html?nodeId=201936990',
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <div className="mc-page major-award inner slow_ani">
      
      {/*<div className="mc-major-award-t1">
        <Container>
          <div className="mc-major-award-window">
            <div
              className={`mc-major-award-t1-left layout-${context?.user?.segment.replace('Grupo ', '')}`}
            >
              <div></div>
              <div>
                {context && context.user.segment === 'Grupo 1' && (
                  <>
                    <p>
                      Usa tu Tarjeta Mastercard Débito del Pacífico para todo y podrás
                      llevarte
                      <span> un bono de Amazon o Megamaxi por US$ 500.</span>
                    </p>
                  </>
                )}

                {context && context.user.segment === 'Grupo 2' && (
                  <>
                    <p>
                      Usa tu Tarjeta Mastercard Débito del Pacífico para todo y podrás
                      llevarte
                      <span> un bono de Amazon o Megamaxi por US$ 1.000.</span>
                    </p>
                  </>
                )}

                {context && context.user.segment === 'Grupo 3' && (
                  <>
                    <p>
                      Usa tu Tarjeta Mastercard Débito del Pacífico para todo y podrás
                      llevarte
                      <span> un bono de Amazon o Megamaxi por US$ 1.500.</span>
                    </p>
                  </>
                )}

                {context && context.user.segment === 'Grupo 4' && (
                  <>
                    <p>
                      Usa tu Tarjeta Mastercard Débito del Pacífico para todo y podrás
                      ganar:
                      <span>
                        {' '}
                        un bono de Amazon o Megamaxi por US$ 3.000 o un crucero Royal Caribbean para
                        4 personas.
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
            {context && (
              <div
                className={`mc-major-award-t1-right group-${context.user.segment.replace('Grupo ', '')}`}
              >
                <img
                  src={`/assets/images/majorAward-${parseInt(context.user.segment.replace('Grupo ', ''))}.png`}
                />
              </div>
            )}
          </div>
        </Container>
      </div>*/}

      {viewTextMajorAward && (
        <div className="mc-major-award-t2">
          <div>Conoce más detalles</div>
          {context && context.user.segment === 'Grupo 1' && (
            <div>
              <p>
                <strong className="subtitle">¿Cómo ganar?</strong>
              </p>
              <p>
                <strong>
                  Para ser elegible como ganador, el participante debe cumplir con los siguientes
                  requisitos:
                </strong>
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li>1. Ingresar a esta plataforma con el código único de acceso.</li>
                <li>2. Haber canjeado un bono una vez cumplido su primera meta.</li>
              </ul>

              {width > 992 ? (
                <p style={{ paddingLeft: '18px' }}>
                  • <strong>Premios: </strong> Cuatro (4) ganadores de un (1) premio que el
                  participante podrá escoger entre una de las siguientes opciones: Bono por US$ 500 de
                  Amazon o Bono por US$ 500 de Megamaxi. Los cuales se entregarán de la siguiente
                  forma: Un (1) premio al cliente que mayor número de veces haya alcanzado su meta al
                  finalizar la vigencia de la campaña, que haya ingresado a la página web de la
                  campaña, haya hecho login (registro y acceso) y que haya canjeado un premio. Tres
                  (3) premios a los clientes que acumulen el mayor valor en facturación al finalizar
                  la vigencia de la campaña, que hayan ingresado a la página web de la campaña, hayan
                  hecho login (registro y acceso) y que hayan canjeado un premio.
                </p>
              ) : (
                <>
                  <p className="nomargin">
                    <strong>Premios:</strong>
                  </p>
                  <p className="nomargin2">
                    Cuatro (4) ganadores de un (1) premio que el participante podrá escoger entre una
                    de las siguientes opciones: Bono por US$ 500 de Amazon o Bono por US$ 500 de
                    Megamaxi. Los cuales se entregarán de la siguiente forma: Un (1) premio al cliente
                    que mayor número de veces haya alcanzado su meta al finalizar la vigencia de la
                    campaña, que haya ingresado a la página web de la campaña, haya hecho login
                    (registro y acceso) y que haya canjeado un premio. Tres (3) premios a los clientes
                    que acumulen el mayor valor en facturación al finalizar la vigencia de la campaña,
                    que hayan ingresado a la página web de la campaña, hayan hecho login (registro y
                    acceso) y que hayan canjeado un premio.
                  </p>
                </>
              )}

              <p>
                <strong className="subtitle">
                  Te contamos las características de los premios para que elijas el que más te guste.
                </strong>
              </p>

              <p>
                <strong className="subtitle2">Bono de Amazon por US$ 500</strong>
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li>• Tu bono se añadirá automáticamente a tu saldo en Amazon.</li>
                <li>
                  • Las compras que hagas se descontarán de ese saldo, y cualquier cantidad que no
                  uses quedará disponible en tu cuenta.
                </li>
                <li>
                  • Si el total de tu compra supera el saldo, puedes cubrir la diferencia con otro
                  método de pago.
                </li>
              </ul>

              <p style={{ marginLeft: '15px' }}>
                • <strong>Descripción:</strong> Gift Card para compras en pagina de Amazon USA
              </p>
              <p style={{ marginLeft: '15px' }}>
                • <strong>Cobertura:</strong> Compra Online USA
              </p>

              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                •<strong> Términos y condiciones del bono:</strong> Las Tarjetas de Regalo de
                Amazon.com para Estados Unidos de America, que se agregan automáticamente a su Saldo
                de Amazon.com. Para ver su Saldo de Amazon.com, visite Su Cuenta. Las compras son
                deducidas de su Saldo de Amazon.com. Cualquier Saldo de Amazon.com no usado
                permanecerá asociado con su cuenta de Amazon.com. Si una compra excede su Saldo de
                Amazon.com, el monto pendiente debe ser pagado con otro método de pago.
                <a
                  onClick={dataLayer}
                  style={{ lineBreak: 'anywhere' }}
                  href="https://www.amazon.com/-/es/gp/help/customer/display.html?nodeId=201936990"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  https://www.amazon.com/-/es/gp/help/customer/display.html?nodeId=201936990
                </a>
                .
              </p>

              <div className="parrafLine" style={{ marginLeft: '15px' }}>
                • <strong>Forma de canje:</strong> Virtual en amazon.com
              </div>
              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                • <strong>Proceso de Canje:</strong>
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ marginLeft: '20px' }}>
                  <strong>1. </strong>Visita amazon.com.{' '}
                </li>
                <li style={{ marginLeft: '20px' }}>
                  <strong>2. </strong>Regístrate o inicia sesión.{' '}
                </li>
                <li style={{ marginLeft: '20px' }}>
                  <strong>3. </strong>En el momento del pago. Ingresa el código y dale clic al botón
                  Canjear.{' '}
                </li>
                <li style={{ marginLeft: '20px' }}>
                  <strong>4. </strong>Finaliza la compra.
                </li>
              </ul>
              <p style={{ marginLeft: '15px' }}>
                <strong>• Vigencia:</strong> Los claim codes no cuentan con fecha de vencimiento.
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ marginLeft: '20px' }}>
                  • Antes de redimir el código: el claim code de Amazon no tiene vencimiento, se puede
                  usar en cualquier momento.
                </li>
                <li style={{ marginLeft: '20px' }}>
                  • Después de redimirlo (agregarlo a la cuenta): el saldo queda en la cuenta del
                  usuario y tampoco vence.{' '}
                </li>
              </ul>

              <p>
                Es decir, no hay límite de tiempo ni antes ni después por política del comercio;
                aplica en este caso puntual de la gestión de bonos directamente con Amazon US (.com).
                *Las condiciones podrían variar según las políticas específicas de cada país y para
                USA, pueden cambiar sin previa notificación.
              </p>

              <hr style={{ margin: '20px 0', border: '1px solid #081F2D' }} />

              <p>
                <strong className="subtitle2">Bono MegaMaxi por US$ 500</strong>
              </p>
              <p>
                Esta es una gift card digital para usar en puntos físicos. El usuario tiene hasta la
                fecha que se indicará para disfrutar de su gift card. Después de esta fecha, ya no
                estará disponible para su uso. Una vez emitida la gift card, no se pueden realizar
                cambios ni devoluciones.{' '}
              </p>

              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                •<strong> Descripción:</strong> LGift Card para compras en establecimientos oficiales
                de: Supermaxi, Megamaxi, Aki, Gran Akí, Super Akí, Akí Vecino, Jugueton, Möblart,
                Kywi, MegaKywi, Domino&lsquo;s, Sukasa, TodoHogar, LibriMundi, Bebemundo, TVentas, Mr.
                Books.
              </p>
              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                •<strong> Cobertura:</strong> Ambato, Azogues, Babahoyo, Cayambe, Chone, Cuenca,
                Daule, Guayaquil, Durán, El Carmen, El Empalme, Esmeraldas, Guaranda, Huaquillas,
                Ibarra, Jipijapa, Lago Agrio, La Libertad, Latacunga, Loja, Machala, Manta, Machachi,
                Milagro, Otavalo, Pasaje, Puyo, Playas, Portoviejo, Pujilí, Quevedo, Quinindé, Quito.
              </p>
              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                •<strong> Forma de canje:</strong> Acércate al local de tu preferencia, muestra tu
                código e indica que es una tarjeta prepago. En servicio al cliente del establecimiento
                atenderán cualquier requerimiento adicional.
              </p>

              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                • <strong>Proceso de Canje:</strong>
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li className="parrafLine">1. El usuario recibe el link para redención. .</li>
                <li className="parrafLine">2. Da clic en &quot;revelar código&quot;. </li>
                <li className="parrafLine">3. Se genera un código. </li>
                <li className="parrafLine">
                  4. Con este código debe acercarse a las tiendas y mostrar el código antes de
                  pagar.{' '}
                </li>
                <li className="parrafLine">
                  5. Se puede utilizar en varias compras siempre y cuando cuente con saldo.{' '}
                </li>
              </ul>

              <p style={{ marginLeft: '15px' }}>
                <strong>• Vigencia:</strong> 1 año a partir de la emisión.
              </p>

              <hr style={{ margin: '20px 0', border: '1px solid #081F2D' }} />

              <p>
                Para más información, consulta los{' '}
                <a onClick={dataLayerTyc} href="/terminos-y-condiciones">
                  términos y condiciones.
                </a>
              </p>
            </div>
          )}

          {context && context.user.segment === 'Grupo 2' && (
            <div>
              <p>
                <strong className="subtitle">¿Cómo ganar?</strong>
              </p>
              <p>
                <strong>
                  Para ser elegible como ganador, el participante debe cumplir con los siguientes
                  requisitos:
                </strong>
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li>1. Ingresar a esta plataforma con el código único de acceso.</li>
                <li>2. Haber canjeado un bono una vez cumplido su primera meta.</li>
              </ul>

              {width > 992 ? (
                <p style={{ paddingLeft: '18px' }}>
                  • <strong>Premios: </strong> Dos (2) ganadores de un (1) premio que el participante
                  podrá escoger entre una de las siguientes opciones: Bono por US$ 1.000 de Amazon o
                  Bono por US$ 1.000 de Megamaxi . Los cuales se entregarán de la siguiente forma: Un
                  (1) premio al cliente que mayor número de veces haya alcanzado su meta al finalizar
                  la vigencia de la campaña, que haya ingresado a la página web de la campaña, haya
                  hecho login (registro y acceso) y que haya canjeado un premio. Un (1) premio al
                  cliente que acumule el mayor valor en facturación al finalizar la vigencia de la
                  campaña, que haya ingresado a la página web de la campaña, haya hecho login
                  (registro y acceso) y que hayan canjeado un premio.
                </p>
              ) : (
                <>
                  <p className="nomargin">
                    <strong>Premios:</strong>
                  </p>
                  <p className="nomargin2">
                    {' '}
                    Dos (2) ganadores de un (1) premio que el participante podrá escoger entre una de
                    las siguientes opciones: Bono por US$ 1.000 de Amazon o Bono por US$ 1.000 de
                    Megamaxi. Los cuales se entregarán de la siguiente forma: Un (1) premio al cliente
                    que mayor número de veces haya alcanzado su meta al finalizar la vigencia de la
                    campaña, que haya ingresado a la página web de la campaña, haya hecho login
                    (registro y acceso) y que haya canjeado un premio. Un (1) premio al cliente que
                    acumule el mayor valor en facturación al finalizar la vigencia de la campaña, que
                    haya ingresado a la página web de la campaña, haya hecho login (registro y acceso)
                    y que hayan canjeado un premio.
                  </p>
                </>
              )}

              <p>
                <strong className="subtitle">
                  Te contamos las características de los premios para que elijas el que más te guste.
                </strong>
              </p>

              <p>
                <strong className="subtitle2">Bono de Amazon por US$ 1.000</strong>
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li>• Tu bono se añadirá automáticamente a tu saldo en Amazon.</li>
                <li>
                  • Las compras que hagas se descontarán de ese saldo, y cualquier cantidad que no
                  uses quedará disponible en tu cuenta.
                </li>
                <li>
                  • Si el total de tu compra supera el saldo, puedes cubrir la diferencia con otro
                  método de pago.
                </li>
              </ul>

              <p style={{ marginLeft: '15px' }}>
                • <strong>Descripción:</strong> Gift Card para compras en pagina de Amazon USA
              </p>
              <p style={{ marginLeft: '15px' }}>
                • <strong>Cobertura:</strong> Compra Online USA
              </p>

              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                •<strong> Términos y condiciones del bono:</strong> Las Tarjetas de Regalo de
                Amazon.com para Estados Unidos de America, que se agregan automáticamente a su Saldo
                de Amazon.com. Para ver su Saldo de Amazon.com, visite Su Cuenta. Las compras son
                deducidas de su Saldo de Amazon.com. Cualquier Saldo de Amazon.com no usado
                permanecerá asociado con su cuenta de Amazon.com. Si una compra excede su Saldo de
                Amazon.com, el monto pendiente debe ser pagado con otro método de pago.
                <a
                  onClick={dataLayer}
                  style={{ lineBreak: 'anywhere' }}
                  href="https://www.amazon.com/-/es/gp/help/customer/display.html?nodeId=201936990"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  https://www.amazon.com/-/es/gp/help/customer/display.html?nodeId=201936990
                </a>
                .
              </p>

              <div className="parrafLine" style={{ marginLeft: '15px' }}>
                • <strong>Forma de canje:</strong> Virtual en amazon.com
              </div>
              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                • <strong>Proceso de Canje:</strong>
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ marginLeft: '20px' }}>
                  <strong>1. </strong>Visita amazon.com.{' '}
                </li>
                <li style={{ marginLeft: '20px' }}>
                  <strong>2. </strong>Regístrate o inicia sesión.{' '}
                </li>
                <li style={{ marginLeft: '20px' }}>
                  <strong>3. </strong>En el momento del pago. Ingresa el código y dale clic al botón
                  Canjear.{' '}
                </li>
                <li style={{ marginLeft: '20px' }}>
                  <strong>4. </strong>Finaliza la compra.
                </li>
              </ul>
              <p style={{ marginLeft: '15px' }}>
                <strong>• Vigencia:</strong> Los claim codes no cuentan con fecha de vencimiento.
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ marginLeft: '20px' }}>
                  • Antes de redimir el código: el claim code de Amazon no tiene vencimiento, se puede
                  usar en cualquier momento.
                </li>
                <li style={{ marginLeft: '20px' }}>
                  • Después de redimirlo (agregarlo a la cuenta): el saldo queda en la cuenta del
                  usuario y tampoco vence.{' '}
                </li>
              </ul>

              <p>
                Es decir, no hay límite de tiempo ni antes ni después por política del comercio;
                aplica en este caso puntual de la gestión de bonos directamente con Amazon US (.com).
                *Las condiciones podrían variar según las políticas específicas de cada país y para
                USA, pueden cambiar sin previa notificación.
              </p>

              <hr style={{ margin: '20px 0', border: '1px solid #081F2D' }} />

              <p>
                <strong className="subtitle2">Bono MegaMaxi por US$ 1.000</strong>
              </p>
              <p>
                Esta es una gift card digital para usar en puntos físicos. El usuario tiene hasta la
                fecha que se indicará para disfrutar de su gift card. Después de esta fecha, ya no
                estará disponible para su uso. Una vez emitida la gift card, no se pueden realizar
                cambios ni devoluciones.{' '}
              </p>

              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                •<strong> Descripción:</strong> LGift Card para compras en establecimientos oficiales
                de: Supermaxi, Megamaxi, Aki, Gran Akí, Super Akí, Akí Vecino, Jugueton, Möblart,
                Kywi, MegaKywi, Domino&lsquo;s, Sukasa, TodoHogar, LibriMundi, Bebemundo, TVentas, Mr.
                Books.
              </p>
              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                •<strong> Cobertura:</strong> Ambato, Azogues, Babahoyo, Cayambe, Chone, Cuenca,
                Daule, Guayaquil, Durán, El Carmen, El Empalme, Esmeraldas, Guaranda, Huaquillas,
                Ibarra, Jipijapa, Lago Agrio, La Libertad, Latacunga, Loja, Machala, Manta, Machachi,
                Milagro, Otavalo, Pasaje, Puyo, Playas, Portoviejo, Pujilí, Quevedo, Quinindé, Quito.
              </p>
              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                •<strong> Forma de canje:</strong> Acércate al local de tu preferencia, muestra tu
                código e indica que es una tarjeta prepago. En servicio al cliente del establecimiento
                atenderán cualquier requerimiento adicional.
              </p>

              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                • <strong>Proceso de Canje:</strong>
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li className="parrafLine">1. El usuario recibe el link para redención. .</li>
                <li className="parrafLine">2. Da clic en &quot;revelar código&quot;. </li>
                <li className="parrafLine">3. Se genera un código. </li>
                <li className="parrafLine">
                  4. Con este código debe acercarse a las tiendas y mostrar el código antes de
                  pagar.{' '}
                </li>
                <li className="parrafLine">
                  5. Se puede utilizar en varias compras siempre y cuando cuente con saldo.{' '}
                </li>
              </ul>

              <p style={{ marginLeft: '15px' }}>
                <strong>• Vigencia:</strong> 1 año a partir de la emisión.
              </p>

              <hr style={{ margin: '20px 0', border: '1px solid #081F2D' }} />

              <p>
                Para más información, consulta los{' '}
                <a onClick={dataLayerTyc} href="/terminos-y-condiciones">
                  términos y condiciones.
                </a>
              </p>
            </div>
          )}

          {context && context.user.segment === 'Grupo 3' && (
            <div>
              <p>
                <strong className="subtitle">¿Cómo ganar?</strong>
              </p>
              <p>
                <strong>
                  Para ser elegible como ganador, el participante debe cumplir con los siguientes
                  requisitos:
                </strong>
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li>1. Ingresar a esta plataforma con el código único de acceso.</li>
                <li>2. Haber canjeado un bono una vez cumplido su primera meta.</li>
              </ul>

              {width > 992 ? (
                <p style={{ paddingLeft: '18px' }}>
                  • <strong>Premios: </strong> Dos (2) ganadores de un (1) premio que el participante
                  podrá escoger entre una de las siguientes opciones: Bono por US$ 1.500 de Amazon o
                  Bono por US$ 1.500 de Megamaxi. Los cuales se entregarán de la siguiente forma: Un
                  (1) premio al cliente que mayor número de veces haya alcanzado su meta al finalizar
                  la vigencia de la campaña, que haya ingresado a la página web de la campaña, haya
                  hecho login (registro y acceso) y que haya canjeado un premio. Un (1) premio al
                  cliente que acumule el mayor valor en facturación al finalizar la vigencia de la
                  campaña, que haya ingresado a la página web de la campaña, haya hecho login
                  (registro y acceso) y que hayan canjeado un premio.
                </p>
              ) : (
                <>
                  <p className="nomargin">
                    <strong>Premios:</strong>
                  </p>
                  <p className="nomargin2">
                    {' '}
                    Dos (2) ganadores de un (1) premio que el participante podrá escoger entre una de
                    las siguientes opciones: Bono por US$ 1.500 de Amazon o Bono por US$ 1.500 de
                    Megamaxi . Los cuales se entregarán de la siguiente forma: Un (1) premio al
                    cliente que mayor número de veces haya alcanzado su meta al finalizar la vigencia
                    de la campaña, que haya ingresado a la página web de la campaña, haya hecho login
                    (registro y acceso) y que haya canjeado un premio. Un (1) premio al cliente que
                    acumule el mayor valor en facturación al finalizar la vigencia de la campaña, que
                    haya ingresado a la página web de la campaña, haya hecho login (registro y acceso)
                    y que hayan canjeado un premio.
                  </p>
                </>
              )}

              <p>
                <strong className="subtitle">
                  Te contamos las características de los premios para que elijas el que más te guste.
                </strong>
              </p>

              <p>
                <strong className="subtitle2">Bono de Amazon por US$ 1.500</strong>
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li>• Tu bono se añadirá automáticamente a tu saldo en Amazon.</li>
                <li>
                  • Las compras que hagas se descontarán de ese saldo, y cualquier cantidad que no
                  uses quedará disponible en tu cuenta.
                </li>
                <li>
                  • Si el total de tu compra supera el saldo, puedes cubrir la diferencia con otro
                  método de pago.
                </li>
              </ul>

              <p style={{ marginLeft: '15px' }}>
                • <strong>Descripción:</strong> Gift Card para compras en pagina de Amazon USA
              </p>
              <p style={{ marginLeft: '15px' }}>
                • <strong>Cobertura:</strong> Compra Online USA
              </p>

              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                •<strong> Términos y condiciones del bono:</strong> Las Tarjetas de Regalo de
                Amazon.com para Estados Unidos de America, que se agregan automáticamente a su Saldo
                de Amazon.com. Para ver su Saldo de Amazon.com, visite Su Cuenta. Las compras son
                deducidas de su Saldo de Amazon.com. Cualquier Saldo de Amazon.com no usado
                permanecerá asociado con su cuenta de Amazon.com. Si una compra excede su Saldo de
                Amazon.com, el monto pendiente debe ser pagado con otro método de pago.
                <a
                  onClick={dataLayer}
                  style={{ lineBreak: 'anywhere' }}
                  href="https://www.amazon.com/-/es/gp/help/customer/display.html?nodeId=201936990"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  https://www.amazon.com/-/es/gp/help/customer/display.html?nodeId=201936990
                </a>
                .
              </p>

              <div className="parrafLine" style={{ marginLeft: '15px' }}>
                • <strong>Forma de canje:</strong> Virtual en amazon.com
              </div>
              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                • <strong>Proceso de Canje:</strong>
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ marginLeft: '20px' }}>
                  <strong>1. </strong>Visita amazon.com.{' '}
                </li>
                <li style={{ marginLeft: '20px' }}>
                  <strong>2. </strong>Regístrate o inicia sesión.{' '}
                </li>
                <li style={{ marginLeft: '20px' }}>
                  <strong>3. </strong>En el momento del pago. Ingresa el código y dale clic al botón
                  Canjear.{' '}
                </li>
                <li style={{ marginLeft: '20px' }}>
                  <strong>4. </strong>Finaliza la compra.
                </li>
              </ul>
              <p style={{ marginLeft: '15px' }}>
                <strong>• Vigencia:</strong> Los claim codes no cuentan con fecha de vencimiento.
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ marginLeft: '20px' }}>
                  • Antes de redimir el código: el claim code de Amazon no tiene vencimiento, se puede
                  usar en cualquier momento.
                </li>
                <li style={{ marginLeft: '20px' }}>
                  • Después de redimirlo (agregarlo a la cuenta): el saldo queda en la cuenta del
                  usuario y tampoco vence.{' '}
                </li>
              </ul>

              <p>
                Es decir, no hay límite de tiempo ni antes ni después por política del comercio;
                aplica en este caso puntual de la gestión de bonos directamente con Amazon US (.com).
                *Las condiciones podrían variar según las políticas específicas de cada país y para
                USA, pueden cambiar sin previa notificación.
              </p>

              <hr style={{ margin: '20px 0', border: '1px solid #081F2D' }} />

              <p>
                <strong className="subtitle2">Bono MegaMaxi por US$ 1.500</strong>
              </p>
              <p>
                Esta es una gift card digital para usar en puntos físicos. El usuario tiene hasta la
                fecha que se indicará para disfrutar de su gift card. Después de esta fecha, ya no
                estará disponible para su uso. Una vez emitida la gift card, no se pueden realizar
                cambios ni devoluciones.{' '}
              </p>

              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                •<strong> Descripción:</strong> LGift Card para compras en establecimientos oficiales
                de: Supermaxi, Megamaxi, Aki, Gran Akí, Super Akí, Akí Vecino, Jugueton, Möblart,
                Kywi, MegaKywi, Domino&lsquo;s, Sukasa, TodoHogar, LibriMundi, Bebemundo, TVentas, Mr.
                Books.
              </p>
              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                •<strong> Cobertura:</strong> Ambato, Azogues, Babahoyo, Cayambe, Chone, Cuenca,
                Daule, Guayaquil, Durán, El Carmen, El Empalme, Esmeraldas, Guaranda, Huaquillas,
                Ibarra, Jipijapa, Lago Agrio, La Libertad, Latacunga, Loja, Machala, Manta, Machachi,
                Milagro, Otavalo, Pasaje, Puyo, Playas, Portoviejo, Pujilí, Quevedo, Quinindé, Quito.
              </p>
              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                •<strong> Forma de canje:</strong> Acércate al local de tu preferencia, muestra tu
                código e indica que es una tarjeta prepago. En servicio al cliente del establecimiento
                atenderán cualquier requerimiento adicional.
              </p>

              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                • <strong>Proceso de Canje:</strong>
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li className="parrafLine">1. El usuario recibe el link para redención. .</li>
                <li className="parrafLine">2. Da clic en &quot;revelar código&quot;. </li>
                <li className="parrafLine">3. Se genera un código. </li>
                <li className="parrafLine">
                  4. Con este código debe acercarse a las tiendas y mostrar el código antes de
                  pagar.{' '}
                </li>
                <li className="parrafLine">
                  5. Se puede utilizar en varias compras siempre y cuando cuente con saldo.{' '}
                </li>
              </ul>

              <p style={{ marginLeft: '15px' }}>
                <strong>• Vigencia:</strong> 1 año a partir de la emisión.
              </p>

              <hr style={{ margin: '20px 0', border: '1px solid #081F2D' }} />

              <p>
                Para más información, consulta los{' '}
                <a onClick={dataLayerTyc} href="/terminos-y-condiciones">
                  términos y condiciones.
                </a>
              </p>
            </div>
          )}

          {context && context.user.segment === 'Grupo 4' && (
            <div>
              <p>
                <strong className="subtitle">¿Cómo ganar?</strong>
              </p>
              <p>
                <strong>
                  Para ser elegible como ganador, el participante debe cumplir con los siguientes
                  requisitos:
                </strong>
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li>1. Ingresar a esta plataforma con el código único de acceso.</li>
                <li>2. Haber canjeado un bono una vez cumplido su primera meta.</li>
              </ul>

              {width > 992 ? (
                <p style={{ paddingLeft: '18px' }}>
                  • <strong>Premios: </strong> Dos (2) ganadores de un (1) premio que el participante
                  podrá escoger entre una de las siguientes opciones: Crucero Royal Caribbean para 4
                  personas , Bono por US$ 3.000 de Amazon o Bono por US$ 3.000 de Megamaxi. Los cuales
                  se entregarán de la siguiente forma: Un (1) premio al cliente que mayor número de
                  veces haya alcanzado su meta al finalizar la vigencia de la campaña, que haya
                  ingresado a la página web de la campaña, haya hecho login (registro y acceso) y que
                  haya canjeado un premio. Un (1) premio al cliente que acumule el mayor valor en
                  facturación al finalizar la vigencia de la campaña, que haya ingresado a la página
                  web de la campaña, haya hecho login (registro y acceso) y que hayan canjeado un
                  premio.
                </p>
              ) : (
                <>
                  <p className="nomargin">
                    <strong>Premios:</strong>
                  </p>
                  <p className="nomargin2">
                    {' '}
                    Dos (2) ganadores de un (1) premio que el participante podrá escoger entre una de
                    las siguientes opciones: Crucero Royal Caribbean para 4 personas , Bono por US$
                    3.000 de Amazon o Bono por US$ 3.000 de Megamaxi. Los cuales se entregarán de la
                    siguiente forma: Un (1) premio al cliente que mayor número de veces haya alcanzado
                    su meta al finalizar la vigencia de la campaña, que haya ingresado a la página web
                    de la campaña, haya hecho login (registro y acceso) y que haya canjeado un premio.
                    Un (1) premio al cliente que acumule el mayor valor en facturación al finalizar la
                    vigencia de la campaña, que haya ingresado a la página web de la campaña, haya
                    hecho login (registro y acceso) y que hayan canjeado un premio.
                  </p>
                </>
              )}

              <p>
                <strong className="subtitle">
                  Te contamos las características de los premios para que elijas el que más te guste.
                </strong>
              </p>

              <p>
                <strong className="subtitle2">Bono de Amazon por US$ 3.000</strong>
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li>• Tu bono se añadirá automáticamente a tu saldo en Amazon.</li>
                <li>
                  • Las compras que hagas se descontarán de ese saldo, y cualquier cantidad que no
                  uses quedará disponible en tu cuenta.
                </li>
                <li>
                  • Si el total de tu compra supera el saldo, puedes cubrir la diferencia con otro
                  método de pago.
                </li>
              </ul>

              <p style={{ marginLeft: '15px' }}>
                • <strong>Descripción:</strong> Gift Card para compras en pagina de Amazon USA
              </p>
              <p style={{ marginLeft: '15px' }}>
                • <strong>Cobertura:</strong> Compra Online USA
              </p>

              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                •<strong> Términos y condiciones del bono:</strong> Las Tarjetas de Regalo de
                Amazon.com para Estados Unidos de America, que se agregan automáticamente a su Saldo
                de Amazon.com. Para ver su Saldo de Amazon.com, visite Su Cuenta. Las compras son
                deducidas de su Saldo de Amazon.com. Cualquier Saldo de Amazon.com no usado
                permanecerá asociado con su cuenta de Amazon.com. Si una compra excede su Saldo de
                Amazon.com, el monto pendiente debe ser pagado con otro método de pago.
                <a
                  onClick={dataLayer}
                  style={{ lineBreak: 'anywhere' }}
                  href="https://www.amazon.com/-/es/gp/help/customer/display.html?nodeId=201936990"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  https://www.amazon.com/-/es/gp/help/customer/display.html?nodeId=201936990
                </a>
                .
              </p>

              <div className="parrafLine" style={{ marginLeft: '15px' }}>
                • <strong>Forma de canje:</strong> Virtual en amazon.com
              </div>
              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                • <strong>Proceso de Canje:</strong>
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ marginLeft: '20px' }}>
                  <strong>1. </strong>Visita amazon.com.{' '}
                </li>
                <li style={{ marginLeft: '20px' }}>
                  <strong>2. </strong>Regístrate o inicia sesión.{' '}
                </li>
                <li style={{ marginLeft: '20px' }}>
                  <strong>3. </strong>En el momento del pago. Ingresa el código y dale clic al botón
                  Canjear.{' '}
                </li>
                <li style={{ marginLeft: '20px' }}>
                  <strong>4. </strong>Finaliza la compra.
                </li>
              </ul>
              <p style={{ marginLeft: '15px' }}>
                <strong>• Vigencia:</strong> Los claim codes no cuentan con fecha de vencimiento.
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ marginLeft: '20px' }}>
                  • Antes de redimir el código: el claim code de Amazon no tiene vencimiento, se puede
                  usar en cualquier momento.
                </li>
                <li style={{ marginLeft: '20px' }}>
                  • Después de redimirlo (agregarlo a la cuenta): el saldo queda en la cuenta del
                  usuario y tampoco vence.{' '}
                </li>
              </ul>

              <p>
                Es decir, no hay límite de tiempo ni antes ni después por política del comercio;
                aplica en este caso puntual de la gestión de bonos directamente con Amazon US (.com).
                *Las condiciones podrían variar según las políticas específicas de cada país y para
                USA, pueden cambiar sin previa notificación.
              </p>

              <hr style={{ margin: '20px 0', border: '1px solid #081F2D' }} />

              <p>
                <strong className="subtitle2">Bono MegaMaxi por US$ 3.000</strong>
              </p>
              <p>
                Esta es una gift card digital para usar en puntos físicos. El usuario tiene hasta la
                fecha que se indicará para disfrutar de su gift card. Después de esta fecha, ya no
                estará disponible para su uso. Una vez emitida la gift card, no se pueden realizar
                cambios ni devoluciones.{' '}
              </p>

              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                •<strong> Descripción:</strong> Gift Card para compras en establecimientos oficiales
                de: Supermaxi, Megamaxi, Aki, Gran Akí, Super Akí, Akí Vecino, Jugueton, Möblart,
                Kywi, MegaKywi, Domino&lsquo;s, Sukasa, TodoHogar, LibriMundi, Bebemundo, TVentas, Mr.
                Books.
              </p>
              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                •<strong> Cobertura:</strong> Ambato, Azogues, Babahoyo, Cayambe, Chone, Cuenca,
                Daule, Guayaquil, Durán, El Carmen, El Empalme, Esmeraldas, Guaranda, Huaquillas,
                Ibarra, Jipijapa, Lago Agrio, La Libertad, Latacunga, Loja, Machala, Manta, Machachi,
                Milagro, Otavalo, Pasaje, Puyo, Playas, Portoviejo, Pujilí, Quevedo, Quinindé, Quito.
              </p>
              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                •<strong> Forma de canje:</strong> Acércate al local de tu preferencia, muestra tu
                código e indica que es una tarjeta prepago. En servicio al cliente del establecimiento
                atenderán cualquier requerimiento adicional.
              </p>

              <p className="parrafLine" style={{ marginLeft: '15px' }}>
                • <strong>Proceso de Canje:</strong>
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li className="parrafLine">1. El usuario recibe el link para redención. .</li>
                <li className="parrafLine">2. Da clic en &quot;revelar código&quot;. </li>
                <li className="parrafLine">3. Se genera un código. </li>
                <li className="parrafLine">
                  4. Con este código debe acercarse a las tiendas y mostrar el código antes de
                  pagar.{' '}
                </li>
                <li className="parrafLine">
                  5. Se puede utilizar en varias compras siempre y cuando cuente con saldo.{' '}
                </li>
              </ul>

              <p style={{ marginLeft: '15px' }}>
                <strong>• Vigencia:</strong> 1 año a partir de la emisión.
              </p>

              <hr style={{ margin: '20px 0', border: '1px solid #081F2D' }} />

              <p>
                <strong className="subtitle2">Crucero Royal Caribbean 2026</strong>
              </p>

              <p>
                <strong>Ruta:</strong> Quito o Guayaquil &gt; Panamá (Colón) &gt; Cartagena &gt; Aruba
                &gt; Curazao &gt; Colón &gt; Quito o Guayaquil
              </p>

              <p>
                Déjate cautivar por las aguas cristalinas del Caribe en una ruta cuidadosamente
                diseñada para mezclar aventura, cultura y relax. Comenzamos con una cómoda noche de
                descanso en Colón, Panamá, y continuamos a bordo de un espectacular crucero visitando
                destinos imperdibles como Cartagena, Curazao y Aruba. Ideal para viajeros que buscan
                combinar la comodidad del todo incluido con la emoción de descubrir varios países en
                una sola travesía.{' '}
              </p>

              <ul className="parrafLine_ul">
                <li>
                  <strong>Duración:</strong> 8 días / 7 noches
                </li>
                <li>
                  <strong>Fechas de viaje:</strong> del 7 al 14 de noviembre de 2026.
                </li>
                <li>
                  <strong>Ciudad de salida y regreso:</strong> Quito o Guayaquil (a elección del
                  ganador).
                </li>
                <li>
                  <strong>Ciudad de embarque del crucero:</strong> Colón, Panamá.
                </li>
                <li>
                  <strong>Categoría:</strong> Crucero + hotel 4*.
                </li>
                <li>
                  <strong>Vuelo:</strong> Comercial Quito o Guayaquil – Panamá – Quito o Guayaquil.
                </li>
                <li>
                  <strong>Hospedaje previo:</strong> 1 noche en hotel Radisson Colon o similar.
                </li>
                <li>
                  <strong>Hospedaje posterior:</strong> 1 noche en hotel Radisson Colon o similar.
                </li>
                <li>
                  <strong>Régimen:</strong> Desayuno en hotel + pensión completa (desayuno, almuerzo y
                  cena a bordo)
                </li>
                <li>
                  <strong>Transfers:</strong> Incluidos (aeropuerto–hotel–puerto–hotel–aeropuerto).
                </li>
                {/* <li>
                  <strong>Cabina:</strong> Junior Suite.
                </li> */}
              </ul>

              <p>
                <strong>¿Qué incluye?</strong>
              </p>
              <ul className="parrafLine_ul">
                <li>
                  Boleto aéreo Quito o Guayaquil - Panamá - Quito o Guayaquil (vuelo comercial). Para
                  4 personas.
                </li>
                <li>1 noche de alojamiento en Colón (Radisson Colon o similar).</li>
                <li>Desayuno en el hotel.</li>
                <li>Crucero de 7 noches – Southern Caribbean Cruise.</li>
                <li>Todas las comidas a bordo (desayuno, almuerzo y cena).</li>
                <li>Paquete de bebidas a bordo.</li>
                <li>Impuestos portuarios.</li>
                <li>Acceso a actividades, piscinas, shows y entretenimiento en el barco.</li>
                <li>Transfers: aeropuerto–hotel–puerto–hotel–aeropuerto.</li>
                <li>Asistencia permanente durante el viaje.</li>
              </ul>

              <p>
                <strong>No incluye</strong>
              </p>
              <ul className="parrafLine_ul">
                <li>Alimentación no especificada en hotel.</li>
                <li>Excursiones en los puertos (opcionales).</li>
                <li>Gastos personales.</li>
                <li>Seguro de asistencia médica internacional (recomendado).</li>
              </ul>

              <p>
                Para más información, consulta los{' '}
                <a onClick={dataLayerTyc} href="/terminos-y-condiciones">
                  términos y condiciones.
                </a>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default MajorAward
