import React, { useContext, useEffect, useState } from 'react'

import { StateController } from './../../App'

import Container from '../../layouts/Container/Container'
import PrimaryBanner from '../molecules/PrimaryBanner'
import AlliancesGallery from '../organisms/AlliancesGallery'
import Preloader from '../atoms/Preloader'

function Alliances() {
  const [alliances, setAlliances] = useState(false)
  const {context} = useContext(StateController)

  useEffect(() => {
    if (context && context.alliances) {

      const formater = context.alliances.filter((item) => {
        if (item.activate) {
          if (item.activate.includes('/')) {
            const timer = new Date(item.activate)
            const today = new Date()
            if (today.toDateString() == timer.toDateString()) return true
            
          } else if (item.activate !== '') {
            const today = new Date()
            const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']
            const todayDay = days[today.getDay()]
            const enableDays = item.activate.split(',')
            let returner = false

            for (let i = 0; i < enableDays.length; i++) {
              if (enableDays[i].toLowerCase() == todayDay.toLocaleLowerCase()) returner = true
            }
            return returner
          }
        } else {
          return true
        }
      }).map((item) => {
        
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          rule: `${item.rule} dto`,
          image: item.image,
          termsData: item.terms
        }
      })
      
      setAlliances(formater)
    }
  }, [context])

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className='mc-page alliances slow_ani'>
      
      <PrimaryBanner
        image="banner_mini.png"
      />

      <Container>
        <h1>Nuestros aliados</h1>

        {alliances
          ? <AlliancesGallery
              alliedBoxType={1}
              itemsPerLine={3}
              limit={false}
              termsOnModal={true}
              limitButtonText="Ver todos los aliados"
              list={alliances}
              termText="Aplica términos y condiciones."
              termLink="/terminos-y-condiciones"
            />
          : <Preloader
              type="section"
              invert
            />
        }
        
      </Container>

    </div>
  )
}
export default Alliances