import { URL, GLOBAL_CODE } from "../constants/constants"

export const canRedeem = async ({ token }) => {
  const res = await fetch(`${URL}canRedeem`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
  }).catch(err => console.log("Hubo un error: " + err))

  if (res) {
    return (res.json())
  }
}

export const redeem = async ({ token, price, id_award, authDate}) => {
  try {
    const res = await fetch(`${URL}/redemptions`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
        'x-access-campaign': GLOBAL_CODE
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        "redemtion": {
          "award_id": id_award,
          "value": price
        },
        "type": "redeem"
      })
    })

    return res.json()

  } catch (error) {
    return error
  }
}

export const downloadRedeem = async ({ token, id }) => {
  try {
    const res = await fetch(`${URL}/redemptions`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
        'x-access-campaign': GLOBAL_CODE
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        "redemtion": {
          "id": id
        },
        "type": "download"
      })
    })

    return res.json()

  } catch (error) {
    return error
  }
}

export const getRedeemeds = async ({ token }) => {
  const res = await fetch(`${URL}redemptions`, {
      headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
      },
  });
  if (res) {
      return (res.json())
  }
}
