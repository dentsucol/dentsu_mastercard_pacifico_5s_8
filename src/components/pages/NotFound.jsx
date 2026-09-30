import React from 'react'
import BackButton from '../atoms/BackButton'
import Container from '../../layouts/Container/Container'

function NotFound() {

  return (
    <div className='mc-page not-found slow_ani'>
      <Container>
        <BackButton />
        <img src='/assets/images/banner_404.svg' />
        <a href="/progreso">Ir a mi progreso</a>
      </Container>
    </div>
  )
}
export default NotFound