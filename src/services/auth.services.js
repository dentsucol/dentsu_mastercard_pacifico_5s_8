import { URL } from "../constants/constants"

export const postVerify = async (gToken) => {
  try {
    const response = await fetch(`${URL}/verify`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        gToken: gToken
      })
    });
    return response.json()

  } catch (error) {
    return error
  }
}

export const postLogin = async (credentials, gToken, gVersion) => {
  try {
    const payload = {
      ...credentials,
      gToken: gToken,
      gVersion: gVersion
    }

    const response =
      await fetch(`${URL}/auth`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(payload)
      })

      if (response && response.status === 404) {
        // window?.location?.reload()
      }
    return response.json()

  } catch (error) {
    return error
  }
}

export const postLoginSha = async (code_hash) => {
    try {
        const response =
            await fetch(`${URL}auth/signinSHA`, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(code_hash),
            })

        if (response.status !== 200) {
          window.location.replace("/")
        }
        return response.json()
    } catch (error) {
      return error
    }
}

export const isLoggedIn = async (token) => {
  
  const res = await fetch(`${URL}/loggedin`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    redirect: "follow",
    referrerPolicy: "no-referrer"
  })

  return res
}

export const logOut = async () => {
  const response =
    await fetch(`${URL}/logout`, {
      method: "POST",
    })
  return response
}