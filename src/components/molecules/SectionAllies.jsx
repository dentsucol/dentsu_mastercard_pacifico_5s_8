import React, { useContext, useEffect, useState } from 'react'
import { StateController } from '../../App'
import Preloader from '../atoms/Preloader'
import AlliancesGallery from '../organisms/AlliancesGallery'
import Container from '../../layouts/Container/Container'
import Columns, { Col } from '../../layouts/Columns/Columns'

const SectionAllies = () => {
    const [alliances, setAlliances] = useState(false)
    const { context } = useContext(StateController)

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
                    termsData: item.terms,
                    subDescription: item.sub_description
                }
            })

            setAlliances(formater)
        }
    }, [context])
    return (
        <div className={`SectionAllies ${alliances.length > 1 ? 'spacing' : ''}`}>
            {
                context ?
                    <Container>
                        <Columns desktop={2} mobile={1}>
                            <Col className={'no-vertical'}>
                                <h2 className='title-allies'>Aprovecha estas <strong>alianzas</strong> que te ayudarán a cumplir tu meta</h2>
                            </Col>
                            <Col>



                                <div className='slider-allies' >
                                    {alliances
                                        &&
                                        <AlliancesGallery
                                            alliedBoxType={5}
                                            itemsPerLine={1}
                                            limit={false}
                                            termsOnModal={false}
                                            limitButtonText="Ver todos los aliados"
                                            list={alliances}
                                        />
                                    }
                                </div>

                            </Col>
                        </Columns>

                    </Container>
                    :
                    <Preloader
                        type="section"
                        invert
                    />
            }

        </div>
    )
}

export default SectionAllies
