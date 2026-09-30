import { 
  URL, 
  GLOBAL_CODE
} from "../constants/constants"

export const getUser = async ({ token }) => {
  const res = await fetch(`${URL}/userdata`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
      'x-access-campaign': GLOBAL_CODE
    },
    redirect: "follow",
    referrerPolicy: "no-referrer"
  })

  if (res) {
    
    return (res.json())
  }
}

export const getStaticContent = async () => {
  const res = await fetch(`${URL}/userdata?static=true`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      'Content-Type': 'application/json',
      'x-access-campaign': GLOBAL_CODE
    },
    redirect: "follow",
    referrerPolicy: "no-referrer"
  })

  if (res) {
    
    return (res.json())
  }
}

export const saveQuiz = async ({ token, respond_1, respond_2, quizNumber }) => {
  const res = await fetch(`${URL}/userdata`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
      'x-access-campaign': GLOBAL_CODE
    },
    body: JSON.stringify({
      "quiz": {
        "response_1": respond_1,
        "response_2": respond_2,
        "quizNumber": quizNumber
      }
    }),
    redirect: "follow",
    referrerPolicy: "no-referrer"
  })

  if (res) {
    
    return (res.json())
  }
}