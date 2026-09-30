import React, { useContext, useEffect, useState } from 'react'

import Container from '../../layouts/Container/Container'
import AwardsGallery from '../organisms/AwardsGallery'
import Preloader from '../atoms/Preloader'
import MajorAwardBanner from '../atoms/MajorAwardBanner'
import Benefits from '../organisms/Benefits'
import { StateController } from './../../App'
import CustomModal from '../molecules/CustomModal'
import TestQuestions from '../organisms/TestQuestions'

function Redemptions({ showSuccessRedemtion }) {
  const { context } = useContext(StateController)
  const [redemtions, setRedemtions] = useState(false)
  const [pushModal, setPushModal] = useState(false)

  useEffect(() => {
    if (context && context.redemtions) {
      const list = []

      for (let i = 0; i < context.redemtions.length; i++) {
        const it = context.redemtions[i]
        list.push({
          block: it.block,
          id: it.id,
          image: it.image,
          name: it.name,
          prepurchased: it.prepurchased,
          price: it.price,
          link:
            it.name === 'Sweet & Coffee'
              ? 'Canjea en tienda o en línea'
              : it.name === 'Amazon' || it.name === 'PedidosYa'
                ? 'Canjea en línea'
                : 'Canjea en tienda'
        })
      }

      setRedemtions(list)
    }
  }, [context])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="mc-page redemptions inner slow_ani">
      <Container>
        <h1 className="title_redemptions">Bono canjeado</h1>

        {context?.redemtions?.length > 0 ? (
          <p className="title_redemptions_desc ">Revisa aquí el bono que ya has canjeado.</p>
        ) : (
          <p className="title_redemptions_desc title_redemptions_desc--empty">
            Cuando cumplas tu meta, encuentra acá el bono que ya canjeaste.
          </p>
        )}

        {redemtions ? (
          <AwardsGallery
            awardBoxType={2}
            itemsPerLine={3}
            list={redemtions}
            showStock={false}
            canRedem={true}
            download={true}
            redemtionText="Descargar de nuevo"
            termText="El bono está sujeto a los <a href='/terminos-y-condiciones'>términos y condiciones</a> del comercio aliado."
            termLink="/terminos-y-condiciones"
            limit={10}
          />
        ) : (
          <Preloader type="section" invert />
        )}

        <MajorAwardBanner context={context} from="/mis-redenciones" />
      </Container>

      {context?.redemtions?.length > 100 && (
        <CustomModal
          title="¡Lo lograste! <br /> Canjeaste tu bono"
          desc="¡Ganas al ser el cliente que más veces cumple su meta o al acumular la mayor facturación al final de la campaña!"
          cta="Aceptar"
          icon={false}
          push
          context={context}
          image="img_push_modal.png"
          primaryAction={{
            action: setPushModal,
            buttonText: 'Quiero más premios',
            loading: false
          }}
          show={pushModal}
          setShowModal={setPushModal}
        />
      )}

      <Benefits type={2} />

      <TestQuestions
        context={context}
        quizNumber={1}
        title="¿Este contenido te ayudó a entender la dinámica de la campaña?"
        from={'mis-redenciones'}
      />
    </div>
  )
}
export default Redemptions
