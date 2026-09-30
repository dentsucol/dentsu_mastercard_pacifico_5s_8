import { getUser, getStaticContent, saveQuiz } from "../services/user.services"
import { 
  getDashboard, 
  saveTerms,
  saveFaqs,
  getLoginsReport
} from "../services/dashboard.services"
import { isLoggedIn } from "../services/auth.services.js"
import { redeem, downloadRedeem } from "../services/redemptions.services.js"


export const isLog = async function(token) {
  return new Promise((resolve) => {

    isLoggedIn({ token: token }).then((res) => {
      resolve(res)
    }).catch(error => {
      resolve(error)
    })
  })
}

export const gtUser = async function(token) {
  return new Promise((resolve) => {

    getUser({ token: token }).then((user) => {

      resolve(user)
    }).catch(error => {
      resolve(error)
    })
  })
}

export const gtStaticContent = async() => {
  return new Promise((resolve) => {

    getStaticContent().then((content) => {

      resolve(content)
    }).catch(error => {
      resolve(error)
    })
  })
}

// Helper común para abrir PDF en la misma ventana o descargar otros tipos (ASÍNCRONO)
async function handleFileOpenOrDownload(file, mime, defaultName = 'boleta') {
  const ct = (mime || '').toLowerCase();
  const isPDF = ct.includes('pdf');
  const ext = isPDF ? 'pdf' : 'zip';
  const name = `${defaultName}.${ext}`;
  const fileUrl = file.includes('data') ? file : `data:${mime};base64,${file}`;

  if (isPDF) {
    try {
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = name;
      a.click();

      // Convertir SIEMPRE via fetch -> blob (más compatible con el botón "Descargar" del visor)
      const res = await fetch(fileUrl);
      const blob = await res.blob(); // respeta el tipo real del PDF
      const blobUrl = URL.createObjectURL(blob);

      // Abrir en la misma pestaña
      window.location.replace(blobUrl);
      // No revocar inmediatamente. Guárdalo si quieres revocarlo más tarde.
      return { name, opened: true };
    } catch (e) {
      // Fallback: si algo falla, descarga directa
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = name;
      a.click();
      return { name, opened: false, fallback: true };
    }
  } else {
    // Descargar si no es PDF
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = name;
    a.click();
    return { name, opened: false };
  }
}

export const doRedeem = async function(token, price, id_award, quantumName, quantumDoc, quantum_site) {
  return new Promise((resolve) => {
    redeem({ token, price, id_award, quantumName, quantumDoc, quantum_site })
      .then(async (data) => {
        if (data && data.status === 200) {
          const file = data.file ? data.file : data.data.file;
          const headers = data.headers || data.data?.headers || {};
          // Normaliza posibles variantes de la llave
          const mime = headers['Content-Type'] || headers['content-type'] || 'application/pdf';

          const result = await handleFileOpenOrDownload(file, mime, 'boleta');

          resolve({
            status: 200,
            file: result.name,
            data: data.detail
          });
        } else {
          resolve({
            status: 400,
            data: data.detail
          });
        }
      })
      .catch(error => resolve(error));
  });
};

export const doloadRedeem = async function(id_redemtion, token) {
  return new Promise((resolve) => {
    downloadRedeem({ token: token, id: id_redemtion })
      .then(async (data) => {
        if (data && data.status === 200) {
          const file = data.data.file;
          const headers = data.data.headers || {};
          const mime = headers['Content-Type'] || headers['content-type'] || 'application/pdf';

          const result = await handleFileOpenOrDownload(file, mime, 'boleta');

          resolve({
            status: 200,
            file: result.name,
            data: data.detail
          });
        } else {
          resolve({
            status: 400,
            data: data.detail || 'Bono no encontrado'
          });
        }
      })
      .catch(error => resolve(error));
  });
};

export const gtDashboard = async function(code, date) {
  return new Promise((resolve) => {

    getDashboard({ code: code, date: date }).then((data) => {

      resolve(data)
    }).catch(error => {
      resolve(error)
    })
  })
}

export const svTerms = async function(code, data) {
  return new Promise((resolve) => {

    saveTerms({ code: code, data: data }).then((data) => {

      resolve(data)
    }).catch(error => {
      resolve(error)
    })
  })
}

export const svFaqs = async function(code, data) {
  return new Promise((resolve) => {

    saveFaqs({ code: code, data: data }).then((data) => {

      resolve(data)
    }).catch(error => {
      resolve(error)
    })
  })
}

export const stQuiz = async function(token, respond_1, respond_2, quizNumber) {
  return new Promise((resolve) => {

    saveQuiz({ token: token, respond_1: respond_1, respond_2: respond_2, quizNumber: quizNumber }).then((data) => {

      resolve(data)
    }).catch(error => {
      resolve(error)
    })
  })
}

export const gtLoginsReport = async function(code, action, date) {
  return new Promise((resolve) => {

    getLoginsReport({ code: code, action: action, date: date }).then((data) => {

      resolve(data)
    }).catch(error => {
      resolve(error)
    })
  })
}