
export function parseNorwegianDecimal(str) {
  if (str === null || str === undefined || str === '') return null
  if (typeof str === 'number') return str
  const num = Number(str.toString().replace(',', '.'))
  return isNaN(num) ? null : num
}

export function formatNorwegianDecimal(num, decimals = 2) {
  if (num === null || num === undefined) return ''  
  const n = Number(num)                             
  if (isNaN(n)) return ''                            
  return n.toFixed(decimals).replace('.', ',')
}