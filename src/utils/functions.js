import React from 'react'
import FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import { Button } from '@nextui-org/react'

export function sendDataLayer(config) {
  if (config.repeat) {
    window?.dataLayer?.push(config.datalayer)
  } else {
    let dl = true
    if (window && window.dataLayer) {
      window.dataLayer.forEach(layer => {
        if (layer.event === config.datalayer.event) dl = false
      })
    }
    if (dl) {

      window.dataLayer?.push(config.datalayer)
    }
  }
}


export function exportExcel({ excelData, fileName,text }) {

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8'; const fileExtension = '.xlsx';
  const exportToExcel = async () => {
      const ws = XLSX.utils.json_to_sheet(excelData);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
  }
  return (
    <Button onClick={() => exportToExcel(fileName)}>
      {text}
    </Button>
  )
}

export function getPrice(value, onlyNumber) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  if (value < 0) value = 0

  return onlyNumber ? formatter.format(value).replace(',','.').replace('$','') : formatter.format(value).replace(',','.')
}

export function getPercent(total, amount, onlyNumber) {

  return amount === 0 ? 0 : `${((amount*100) / total).toFixed(1)}${onlyNumber ? '' : '%'}`
}

export function uncodePrice(context) {
  const price = context.user[`award_1`] / 1000

  return price * 1000
}

export function isLoginPage(location) {

  return (
    !location.pathname.includes('progreso') || 
    !location.pathname.includes('premios') || 
    !location.pathname.includes('mecanica') ||
    !location.pathname.includes('redenciones') || 
    !location.pathname.includes('alianzas')
  ) ? false : true
}

export function slugify(text) {

  return text.toString().toLowerCase()
    .replace(/(\w)'/g, '$1')
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export const arrNum = (num) => {
  let arr = []
  for (let i = 0; i < num; i++) {
    arr.push(i)
  }
  return arr
}

export function formatCurrencyNumber(amount) {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  return formatter.format(amount).replace('$','').replace(',','.')
}

export function getMaximumBlock(block, blocks) {

  return (block || 1) > (blocks ? blocks : 1) ? blocks : (block || 1)
}

export function itsFiltered(gallery, amount) {
  let returner = false

  if (gallery <= Number(amount)) returner = true
  

  if (amount === 40000 && gallery !== 40000) {
    returner = false
  } else if (amount === 50000 && gallery < 50000) {
    returner = false
  } else if (amount === 80000 && gallery === 50000) {
    returner = false
  } else if (amount === 100000 && (gallery === 40000 || gallery === 80000)) {
    returner = false
  } else if (amount === 150000 && (gallery === 40000 || gallery === 80000)) {
    returner = false
  } else if (amount === 200000 && (gallery === 40000 || gallery === 80000)) {
    returner = false
  } else if (amount === 250000 && (gallery === 40000 || gallery === 80000)) {
    returner = false
  } else if (amount === 300000 && (gallery === 40000 || gallery === 80000)) {
    returner = false
  } else if (amount === 500000 && (gallery === 40000 || gallery === 80000)) {
    returner = false
  }

  return returner
}

export function getProgressPercent(context) {
  let returner = 0
  if (context && context.tracing) {
    const goal = context.user[`goal_amount_1`]
    const tracing = context.tracing[`amount_1`]
    const percent = tracing === 0 ? 0 : `${((tracing*100) / goal).toFixed(1)}`
    returner = Number(Number(percent).toFixed(0))
  }

  if (returner > 100) returner = 100
  return returner
}

export const getDateNow = () => {
  let date = new Date();
  let año = date.getFullYear();
  let mes = ('0' + (date.getMonth() + 1)).slice(-2); // Se agrega 1 porque los meses van de 0 a 11
  let dia = ('0' + date.getDate()).slice(-2);
  let dateFormat = año + '-' + mes + '-' + dia;
  return dateFormat
}
