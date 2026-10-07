export const GLOBAL_CODE = "pacifico_5s_8"

const env = window.location.href
export const URL = (env.includes("test03") || env.includes("amplifyapp") || env.includes("localhost")) ? `https://mastercard-sandbox.node-test.link` : "https://mastercard-sandbox.node-test.link/production"
export const PATH = process.env.NODE_ENV === "production" ? `https://test03-dentsu-uat.node-test.link` : "http://localhost:3000"

export const RECAPCHAKEY = (env.includes("test03") || env.includes("amplifyapp") ||env.includes("localhost")) ? "6Le2BY4rAAAAABWoezXVyAhvWLIJ7dF-AVv1InXk" : '6LdY3o4rAAAAAE-IatHhZsTzCSbkiIrUW3KcOR1U';
export const RECAPCHAKEYSAFARI = '6Lc8h5MrAAAAAMjinTiNtAqrwxBrGi4iDifcHz16';