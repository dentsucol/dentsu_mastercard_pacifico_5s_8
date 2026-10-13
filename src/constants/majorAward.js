// Contenido de la página de Premio Mayor por destino.
// Copys, imágenes e iconos tomados del handoff de Figma:
// Davivienda - Campañas / Premio mayor (node 20611-117311).

export const DESTINATIONS = [
  {
    items: [
      {
        cardImg: 'grupo_3_1.png',
        cardtitle: 'Todo listo para viajar',
        cardDescription: 'Incluye tiquetes aéreos, hospedaje y actividades.'
      },
      {
        cardImg: 'grupo_3_2.png',
        cardtitle: '3 noches y 4 días',
        cardDescription: 'Hospédate en el Hotel Palacio del Inka, a Luxury Collection Hotel by Marriott.'
      },
      {
        cardImg: 'grupo_3_3.png',
        cardtitle: 'Experiencias',
        cardDescription: 'Día completo en Machu Picchu, cena en Chicha de Gastón Acurio y más actividades.'
      },
      {
        cardImg: 'grupo_3_4.png',
        cardtitle: 'Bono de US$1,500',
        cardDescription: 'Tú decides en qué gastarlo, compra lo que quieras en Amazon o Tipti.'
      }
    ],
  },
  {
    items: [
      {
        cardImg: 'grupo4_1.png',
        cardtitle: 'Una experiencia para dos',
        cardDescription: 'Incluye tiquetes aéreos, hospedaje y expericias.'
      },
      {
        cardImg: 'grupo4_2.png',
        cardtitle: '4 noches y 5 días',
        cardDescription: 'Hospédate en el Hotel Hilton Copacabana.'
      },
      {
        cardImg: 'grupo4_3.png',
        cardtitle: 'Recorre Río',
        cardDescription: 'Un city tour por lo mejor de Río y el Favela Tour para conocer su cultura auténtica.'
      },
      {
        cardImg: 'grupo4_4.png',
        cardtitle: 'Gastronomía local',
        cardDescription: 'Cena frente al mar en Marius Degustare y sabores tradicionales de Brasil en Joaquina.'
      },
      {
        cardImg: 'grupo4_5.png',
        cardtitle: 'Día de playa',
        cardDescription: 'Un día para relajarte frente al océano en el Clássico Beach Club, en Leme.'
      },
      {
        cardImg: 'grupo4_6.png',
        cardtitle: 'Bono de US$3,000',
        cardDescription: 'Tú decides en qué gastarlo, compra lo que quieras en Amazon o Tipti.'
      }
    ]
  },
]

// El handoff pide "un timer de 40 segundos"; la barra de progreso del diseño
// avanza acumulada (1/3 en Corea, 2/3 en Noruega, llena en España), así que los
// 40s corresponden al ciclo completo de los tres destinos.
export const BANNER_CYCLE_DURATION = 40000
