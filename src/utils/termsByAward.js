const termsFiles = {
  amazon: '/terms/T&CcodigosGiftPointAmazon.pdf',
  pedidosya: '/terms/T&CcodigosPedidosYa.pdf',
  corporacionfavorita: '/terms/T&CcodigosTipti.pdf'
}

function normalizeText(value = '') {
  return value.toString().trim().toLowerCase()
}

export function getAwardTermsPdf(award = {}) {
  if (award?.termsFile) return award.termsFile

  const candidates = [award?.slug, award?.name, award?.brand, award?.brandName]
    .map((item) => normalizeText(item))
    .filter(Boolean)

  for (const candidate of candidates) {
    for (const key of Object.keys(termsFiles)) {
      if (candidate.includes(key)) {
        return termsFiles[key]
      }
    }
  }

  return null
}

export { termsFiles }
