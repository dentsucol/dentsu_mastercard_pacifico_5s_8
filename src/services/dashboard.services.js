import { URL, GLOBAL_CODE } from "../constants/constants"

export const getDashboard = async (code) => {
  const ADMIN_URL = `${URL}/admin`;
  const res = await fetch(`${ADMIN_URL}/dashboard`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      'Content-Type': 'application/json',
      'x-access-code': code.code,
      'x-access-campaign': GLOBAL_CODE
    },
    redirect: "follow",
    referrerPolicy: "no-referrer"
  })

  if (res) {
    
    return (res.json())
  }
}

export const loginReport = async (secret) => {
  const response = await fetch(`${URL}loginReport?secret=${secret}`, {
      headers: {
        'Content-Type': 'application/json',
      }
  })
  return response.json()
}

export const redemptionsReport = async (secret) => {
  const response = await fetch(`${URL}redemptionsReport?secret=${secret}`, {
    headers: {
      'Content-Type': 'application/json',
    }
  })

  return response.json()
}

export const saveTerms = async ({code, data}) => {
  const ADMIN_URL = `${URL}/admin`;
  const res = await fetch(`${ADMIN_URL}/dashboard`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      'Content-Type': 'application/json',
      'x-access-campaign': GLOBAL_CODE,
      'x-access-code': code,
      'x-access-action': 'saveTerms'
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      json: data
    })
  })

  if (res) {
    
    return (res.json())
  }
}

export const saveFaqs = async ({code, data}) => {
  const ADMIN_URL = `${URL}/admin`;
  const res = await fetch(`${ADMIN_URL}/dashboard`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      'Content-Type': 'application/json',
      'x-access-campaign': GLOBAL_CODE,
      'x-access-code': code,
      'x-access-action': 'saveFaqs'
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data)
  })

  if (res) {
    
    return (res.json())
  }
}

export const getLoginsReport = async ({code, action, date}) => {
  const ADMIN_URL = `${URL}/admin`;
  const res = await fetch(`${ADMIN_URL}/dashboard`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      'Content-Type': 'application/json',
      'x-access-campaign': GLOBAL_CODE,
      'x-access-code': code,
      'x-access-action': action
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      filter: date
    })
  })

  if (res) {
    
    return (res.json())
  }
}