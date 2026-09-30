import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Chart } from "react-google-charts"
import { EditorState, convertToRaw } from 'draft-js'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import XLSX from 'sheetjs-style'
import FileSaver from 'file-saver'

import { 
  gtDashboard,
  svTerms,
  svFaqs,
  gtLoginsReport
} from '../../utils/helpers'
import { getPrice, getPercent } from '../../utils/functions'

import Container from '../../layouts/Container/Container'
import AlertMessage from '../atoms/AlertMessage'
import DashboardModule from '../organisms/DashboardModule'
import ProgressBar from '../atoms/ProgressBar'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import Preloader from '../atoms/Preloader'
import pako from 'pako'

function Dashboard() {
  const [searchParams] = useSearchParams()
  const [loginsLoading, setLoginsLoading] = useState(false)
  const [loginsUniqueLoading, setLoginsUniqueLoading] = useState(false)
  const [redemtionsLoading, setRedemtionsLoading] = useState(false)
  const [redemtionsUniqueLoading, setRedemtionsUniqueLoading] = useState(false)
  const [awardsLoading, setAwardsLoading] = useState(false)
  const [winnersLoading, setWinnersLoading] = useState(false)
  

  const [loginsTerms, setLoginsTerms] = useState(false)
  const [loginsFaqs, setLoginsFaqs] = useState(false)
  const [redemtionsData, setRedemtionsData] = useState([])

  const [accessCode, setAccessCode] = useState('')
  const [faqs, setFaqs] = useState([])

  const [dashboardData, setDashboardData] = useState(false)
  const [dashboardAwardDenominations, setDashboardAwardDenominations] = useState([])
  const [dashboardDataError, setDashboardDataError] = useState(false)

  const [processOk, setprocessOk] = useState(false)
  const [processError, setprocessError] = useState(false)

  const [filterDate, setFilterDate] = useState('')

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
  const fileExtension = '.xlsx';

    const loginsReport = async () => {
    setLoginsLoading(true)

    gtLoginsReport(searchParams.get('secret'), 'getLoginsReport', searchParams.get('date')).then((data) => {
      if (data && data.statusCode === 200) {
        setprocessOk(true)
        console.log("Data;", data)
        const compressedData = data.data;
        if (data.data) {
          try {
            // Paso 1: Convierte el Base64 a un ArrayBuffer
            const binaryString = atob(compressedData); // Decodifica el Base64
            const binaryArray = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              binaryArray[i] = binaryString.charCodeAt(i);
            }
          
            // Paso 2: Descomprime los datos usando pako
            const decompressedData = pako.ungzip(binaryArray, { to: 'string' });
          
            // Paso 3: Parsear el JSON si corresponde
            const parsedData = JSON.parse(decompressedData);
            const ws = XLSX.utils.json_to_sheet(parsedData)
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
            const datas = new Blob([excelBuffer], { type: fileType })
            FileSaver.saveAs(datas, 'ReportLogins' + fileExtension)
            setLoginsLoading(false)
          
            console.log('Datos descomprimidos:', parsedData);
          } catch (err) {
            console.error('Error descomprimiendo los datos:', err);
          }
        } else {
          alert("Error, data incompleta.")
          setLoginsLoading(false)
        }
      }
    }).catch(() => {
      setprocessError(true)
    })
  }
  
  const loginsReportUnique = async () => {
    setLoginsUniqueLoading(true)

    gtLoginsReport(searchParams.get('secret'), 'getLoginsReportUnique', searchParams.get('date')).then((data) => {
      console.log("data", data)
      if (data && data.statusCode === 200) {
        setprocessOk(true)
        console.log("Data;", data)

        if (data.data) {
          const ws = XLSX.utils.json_to_sheet(data.data)
          const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
          const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
          const datas = new Blob([excelBuffer], { type: fileType })
          FileSaver.saveAs(datas, 'ReportLoginsUnique' + fileExtension)
          setLoginsUniqueLoading(false)
        } else {
          alert("Error, data incompleta.")
          setLoginsUniqueLoading(false)
        }
      }
    }).catch(() => {
      setLoginsTerms(false)
      setprocessError(true)
      setLoginsUniqueLoading(false)
    })
  }
  const redemtionsReport = async () => {
    setRedemtionsLoading(true)

    gtLoginsReport(searchParams.get('secret'), 'getRedemtionsReport', searchParams.get('date')).then((data) => {
      if (data && data.statusCode === 200) {
        setprocessOk(true)
        console.log("Data;", data)

        if (data.data) {
          const ws = XLSX.utils.json_to_sheet(data.data)
          const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
          const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
          const datas = new Blob([excelBuffer], { type: fileType })
          FileSaver.saveAs(datas, 'ReportRedemtions' + fileExtension)
          setRedemtionsLoading(false)
        } else {
          alert("Error, data incompleta.")
          setRedemtionsLoading(false)
        }
      }
    }).catch(() => {
      setRedemtionsLoading(true)
    })
    
  }
  const redemtionsReportUnique = async () => {
    setRedemtionsUniqueLoading(true)

    gtLoginsReport(searchParams.get('secret'), 'getRedemtionsReportUnique', searchParams.get('date')).then((data) => {
      if (data && data.statusCode === 200) {
        setprocessOk(true)
        console.log("Data;", data)

        if (data.data) {
          const ws = XLSX.utils.json_to_sheet(data.data)
          const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
          const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
          const datas = new Blob([excelBuffer], { type: fileType })
          FileSaver.saveAs(datas, 'ReportRedemtionsUnique' + fileExtension)
          setRedemtionsUniqueLoading(false)
        } else {
          alert("Error, data incompleta.")
          setRedemtionsUniqueLoading(false)
        }
      }
    }).catch(() => {
      setRedemtionsUniqueLoading(true)
    })
    
  }
  const awardsReport = async () => {
    setAwardsLoading(true)
    
  }
  const saveTerms = async () => {
    setLoginsTerms(true)

    svTerms(searchParams.get('secret'), convertToRaw(editorState.getCurrentContent())).then((data) => {
      setLoginsTerms(false)

      if (data && data.statusCode === 200) {
        setprocessOk(true)
      }
    }).catch(() => {
      setLoginsTerms(false)
      setprocessError(true)
      
    })
  }
  const saveFaqs = async () => {
    setLoginsFaqs(true)

    svFaqs(searchParams.get('secret'), faqs).then((data) => {
      setLoginsFaqs(false)

      if (data && (data.statusCode === 200 || data.status === 200)) {
        if (data.error) {
          setprocessError(true)
        } else {
          setprocessOk(true)
        }
      }
    }).catch(() => {
      setLoginsTerms(false)
      setprocessError(true)
      
    })
  }

  const winnersReport = async () => {
    setWinnersLoading(true)

    gtLoginsReport(searchParams.get('secret'), 'getWinnersReport', searchParams.get('date')).then((data) => {
      console.log("Reporte winnerss", data)

      if (data && data.statusCode === 200) {
        setprocessOk(true)
        console.log("Data;", data)

        if (data.data) {
          const ws = XLSX.utils.json_to_sheet(data.data)
          const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
          const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
          const datas = new Blob([excelBuffer], { type: fileType })
          FileSaver.saveAs(datas, 'ReportWinners' + fileExtension)
          setWinnersLoading(false)
        } else {
          alert("Error, data incompleta.")
          setWinnersLoading(false)
        }
      }
    }).catch(() => {
      setLoginsTerms(false)
      setprocessError(true)
    })
  
  }
  

  const handleChangeAccessCode = async (props) => {
    
    if (props.target.value.length < 11) {
      setAccessCode(props.target.value)
    }
  }
  const handleAccess = async () => {
    window.location.href = `/dashboard?secret=${accessCode}`
  }
  const handleChangeFaqTitle = (index, event) => {
    const curFaqs = JSON.stringify(faqs)
    const curFaqsInstance = JSON.parse(curFaqs)
    curFaqsInstance[index].title = event.target.value

    setFaqs(curFaqsInstance)
  }


  const loginsSuccess = [
    ["Día", "Exitosos", "No Exitosos", "Autologin"],
    ["23 Mar", 1, 0, 3],
    ["24 Mar", 2, 1, 10],
    ["25 Mar", 4, 2, 12],
    ["26 Mar", 15, 5, 7],
    ["27 Mar", 34, 8, 23],
    ["28 Mar", 0, 59, 0],
    ["29 Mar", 35, 5, 34],
    ["30 Mar", 60, 3, 56],
  ]

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  )

  useEffect(() => {
    
    if (searchParams.get('secret') !== '') {

      gtDashboard(searchParams.get('secret'), searchParams.get('date')).then((data) => {

        if (data?.campaing?.data) {
          console.log(data.campaing.data)
          setDashboardData(data.campaing.data)

          if (data.campaing.data.awards && data.campaing.data.awards[0]) {
            const obj = data.campaing.data.awards[0]
            const properties = Object.getOwnPropertyNames(obj)
            const denominations = []
            properties.forEach(property => {
              if (property.charAt(0) === 's' && property.length >= 1 && property.length <= 5) {
                denominations.push(property)
              }
            })

            setDashboardAwardDenominations(denominations)
          }

          if (data.campaing.data && data.campaing.data.reportRedemptionsPercents && data.campaing.data.reportRedemptionsPercents[0]) {
            const arr = [
              ["Comercio", "Redenciones"]
            ]
            data.campaing.data.reportRedemptionsPercents.forEach(redemtions => {

              arr.push([`${redemtions.name}`, redemtions.times])
            })
            setRedemtionsData(arr)
          }
        } else {
          setDashboardDataError(true)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (processOk) setTimeout( () => setprocessOk(false), 2500 )
  }, [processOk])

  useEffect(() => {
    if (processError) setTimeout( () => setprocessError(false), 2500 )
  }, [processError])

  const handleChange = async (props) => {    
    setFilterDate(props.target.value)
  }

  const runFilter = async () => {    
    const url = new URL(window.location.href)
    url.searchParams.set('date', filterDate)
    window.history.pushState({}, '', url);
    window.location.reload();
  }

  const handleReset = async () => {    
    window.location.href = '/dashboard?secret=69sJf4Es6h'
  }

  return (
    <div className='mc-page dashboard slow_ani'>
      {processOk && <Preloader type="ok" />}
      {processError && <Preloader type="error" />}

      <Container>  
        {searchParams.get('secret') && !dashboardDataError
          ? <>
              <DashboardModule
                title={`Información general ${searchParams.get('date') ? ` - A partir del dia: ${searchParams.get('date')}` : ''}`} 
                col={1}
                reportAction={{
                  text: "Reporte ganadores",
                  onClick: winnersReport,
                  loading: winnersLoading
                }}
              >
                <div className='dateFilter'>
                  <input type="date" id="dateFilter" name="dateFilter" onChange={handleChange} />
                </div>
                <div className='runFilter' onClick={runFilter}></div>
                <div className='dateFilterReset' onClick={handleReset}></div>


                {dashboardData
                  ? <>
                      <ProgressBar
                        title="Usuarios registrados"
                        percent={100}
                        label={`${getPrice(dashboardData.usersCount, true)}`}
                      />
                      <ProgressBar
                        title="Total logins exitosos"
                        percent={getPercent(dashboardData.loginsCount, dashboardData.successLoginsCount, true)}
                        label={`${getPrice(dashboardData.successLoginsCount, true)}`}
                        middle
                        dashboard="del del total de logins."
                      />
                      <ProgressBar
                        title="Total logins exitosos únicos"
                        percent={getPercent(dashboardData.usersCount, dashboardData.successLoginsUniqueCount, true)}
                        label={`${getPrice(dashboardData.successLoginsUniqueCount, true)}`}
                        middle
                        dashboard="del total de usuarios."
                      />
                      <ProgressBar
                        title="Total ganadores (sin filtro de fecha)"
                        percent={getPercent(dashboardData.usersCount, dashboardData.winnersCount, true)}
                        label={`${getPrice(dashboardData.winnersCount, true)}`}
                        middle
                        dashboard="del todal de usuarios registrados."
                      />
                      <ProgressBar
                        title="Total redenciones"
                        percent={getPercent(dashboardData.winnersCount, dashboardData.redemptionsCount, true)}
                        label={`${getPrice(dashboardData.redemptionsCount, true)}`}
                        middle
                      />
                      <ProgressBar
                        title="Total redimido"
                        percent={getPercent((dashboardData.budget.api + dashboardData.budget.prepurchase), dashboardData.redemptionsAmount, true)}
                        label={`${getPrice(Number(dashboardData.redemptionsAmount))}`}
                        dashboard={`del presupuesto total (${getPrice((dashboardData.budget.api + dashboardData.budget.prepurchase), true)}).`}
                      />
                      <h5>Estado de credenciales:</h5>
                      <table className='table'>
                        <tr>
                          <th className='head_hight'>Entorno</th>
                          <th>Quantum API</th>
                          <th>Base de datos</th>
                          <th>Estado</th>
                        </tr>
                        <tr>
                          <td className='head_hight'>Desarrollo</td>
                          <td>N/A</td>
                          <td>Producción</td>
                          <td>
                            <span className={`table-enable`}>
                              Credenciales correctas
                            </span>
                          </td>
                        </tr>
                      </table>
                    </>
                  : <Preloader
                      type="section"
                      invert
                    />
                }
              </DashboardModule>

              <DashboardModule
                title="Logins"
                col={2}
                reportAction={{
                  text: "Reporte completo",
                  onClick: loginsReport,
                  loading: loginsLoading
                }}
                reportSecondAction={{
                  text: "Reporte únicos",
                  onClick: loginsReportUnique,
                  loading: loginsUniqueLoading
                }}
              >
              </DashboardModule>
              <DashboardModule
                title="Redenciones"
                col={2}
                reportAction={{
                  text: "Reporte completo",
                  onClick: redemtionsReport,
                  loading: redemtionsLoading
                }}
                reportSecondAction={{
                  text: "Reporte únicos",
                  onClick: redemtionsReportUnique,
                  loading: redemtionsUniqueLoading
                }}
              >
                {dashboardData
                  ? <Chart
                      chartType="PieChart"
                      data={redemtionsData}
                      options={{
                        title: "Comercios redimidos.",
                      }}
                      width={"100%"}
                      height={"280px"}
                    />
                  : <Preloader
                      type="section"
                      invert
                    />
                }
              </DashboardModule>

              {/* <DashboardModule
                title="Cumplimiento de campaña"
                col={1}
              >
                {dashboardData
                  ? <>
                    <ProgressBar
                      title="Meta cumplida"
                      percent={getPercent(dashboardData.usersCount, 0, true)}
                      label={getPrice(0, true)}
                      dashboard="de los clientes han cumplido la meta."
                      middle
                    />
                    <ProgressBar
                      title="Meta sobrecumplida"
                      percent={getPercent(dashboardData.usersCount, 0, true)}
                      label={getPrice(0, true)}
                      middle
                      dashboard="de los clientes han superado la meta."
                    />
                    <ProgressBar
                      title="Meta no cumplida"
                      percent={getPercent(dashboardData.usersCount, 0, true)}
                      label={getPrice(0, true)}
                      middle
                      dashboard="de los clientes no han alcanzado su meta."
                    />
                    <ProgressBar
                      title="No participantes"
                      percent={getPercent(dashboardData.usersCount, 0, true)}
                      label={getPrice(0, true)}
                      middle
                      dashboard="de los clientes no ha participado."
                    />
                    </>
                  : <Preloader
                      type="section"
                      invert
                    />
                }
              </DashboardModule> */}
              <DashboardModule
                title="Presupuestos"
                col={1}
              >
                {dashboardData
                  ? <>
                      <h5 style={{marginBottom:5, marginTop:0}}>Presupuesto API Quantum:</h5>
                      <p style={{marginTop:0}}>{getPrice(dashboardData.budget.api)} ({getPrice(dashboardData.budget.api_redeemed)}) - Queda un <strong>{getPercent(dashboardData.budget.api, dashboardData.budget.api_redeemed, false)}</strong></p>

                      <h5 style={{marginBottom:5}}>Presupuesto Precompra (Archivos PDF):</h5>
                      <p style={{marginTop:0}}>{getPrice(dashboardData.budget.prepurchase)} ({getPrice(dashboardData.budget.prepurchase_redeemed)}) - Queda un <strong>{getPercent(dashboardData.budget.prepurchase, dashboardData.budget.prepurchase_redeemed, false)}</strong></p>
                    
                      <h5 style={{marginBottom:5}}>Presupuesto Total:</h5>
                      <p style={{marginTop:0}}>{getPrice((dashboardData.budget.api + dashboardData.budget.prepurchase), true)} ({getPrice(dashboardData.budget.api_redeemed + dashboardData.budget.prepurchase_redeemed)}) - Queda un <strong>{getPercent((dashboardData.budget.prepurchase + dashboardData.budget.api), (dashboardData.budget.prepurchase_redeemed + dashboardData.budget.api_redeemed), false)}</strong></p>
                    </>
                  : <Preloader
                      type="section"
                      invert
                    />
                }
              </DashboardModule>




              <DashboardModule
                title="Disponibilidad de bonos"
              >
                {dashboardData
                  ? <table className='table'>
                      <tr>
                        <th>Comercio</th>
                        {dashboardAwardDenominations.map((denomination, index) => {
                          return (
                            <th key={index}>{denomination.replace('s','$')}.000</th>
                          )
                        })}
                      </tr>

                      {dashboardData.awards.map((award, index) => {
                        let stockNumber = 0
                        let awardId = award.id

                        return (
                          <tr key={index}>
                            <td>{award.name}</td>

                            {dashboardAwardDenominations.map((denomination, index) => {
                              const data = award[denomination]
                              let available = 'stock'
                              let qty = stockNumber

                              const findAward = dashboardData.stock.find((item) => item.id === awardId && item.Valor === Number(denomination.replace('s', '')))
                              if (findAward) {
                                qty = findAward.Restantes
                              }


                              if (data === 0 || data === null) available = 'none'
                              if (award.status === 0) available = 'disabled'
                              if (qty === 0) available = 'none'

                              return (
                                <td key={index}>
                                  <span className={`table-${available === 'stock' ? 'enable' : available === 'none' ? 'unabled' : 'inactive'}`}>
                                    {available === 'stock' ? `${qty === 0 ? 'No stock' : qty === 1 ? `${qty} bono` : `${qty} bonos`}` : available === 'none' ? 'No stock' : 'Inactivo'}
                                  </span>
                                </td>
                              )
                            })}
                          </tr>
                        )
                      })}
                    </table>
                  : <Preloader
                      type="section"
                      invert
                    />
                }
              </DashboardModule>




              <DashboardModule
                title="Alertas"
              >
                {dashboardData
                  ? <table className='table table-min'>
                      <tr>
                        <th>Alarma</th>
                        <th>Disparador</th>
                        <th>Estado</th>
                      </tr>
                      <tr>
                        <td>Problemas con Quantum</td>
                        <td>Cuando un usuario intenta redimir pero la API Quantum responde con error.</td>
                        <td>
                          <span className='table-enable'>Activa</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Presupuesto</td>
                        <td>Cuando el presupuesto supera las franjas de porcentaje 10, 20, 30, 40, 50, 60, 70, 80 y 90%.</td>
                        <td>
                          <span className='table-enable'>Activa</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Precompra Agotado</td>
                        <td>Cuando un bono precompra se encuentra agotado.</td>
                        <td>
                          <span className='table-enable'>Activa</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Problemas en el servicio de login.</td>
                        <td>Cuando se acumulan más de 10 intentos de login fallidos seguidos.</td>
                        <td>
                          <span className='table-enable'>Activa</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Problemas en el servicio de redención y descarga.</td>
                        <td>Cuando se acumulan más de 10 intentos de redención fallidos consecutivos.</td>
                        <td>
                          <span className='table-enable'>Activa</span>
                        </td>
                      </tr>
                    </table>
                  : <Preloader
                      type="section"
                      invert
                    />
                }
              </DashboardModule>
            </>
          : 
            <AlertMessage
              type="error"
              title={`${dashboardDataError ? 'Ocurrió un error' : 'Acceso no autorizado'}`}
              message={`${dashboardDataError ? 'No logramos obtener la data necesaria para generar los reportes. Intenta de nuevo o comunicate con el administrador del portal.' : 'Por favor ingresa el código de acceso a este contenido.'}`}
              blocked
            >
              {!dashboardDataError &&
                <div className='custom-forms'>
                  <Input 
                    type="code"
                    label="Código de acceso"
                    placeholder=""
                    onChange={handleChangeAccessCode}
                    inputByCharacter={false}
                    maxlength={10}
                    value={accessCode}
                    error={false}
                  />
                  <Button
                    type="primary"
                    text="Acceder"
                    loading={false}
                    status="active"
                    onClick={handleAccess}
                  />
                </div>
              }
              
            </AlertMessage>
        }
      </Container>
    </div>
  )
}
export default Dashboard