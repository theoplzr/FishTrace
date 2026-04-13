function hashString(value) {
  let hash = 2166136261

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }

  return hash >>> 0
}

function buildMatrix(value, size = 29) {
  const matrix = Array.from({ length: size }, () => Array.from({ length: size }, () => false))
  const reserved = Array.from({ length: size }, () => Array.from({ length: size }, () => false))

  function markFinder(offsetX, offsetY) {
    for (let row = 0; row < 7; row += 1) {
      for (let column = 0; column < 7; column += 1) {
        const x = offsetX + column
        const y = offsetY + row
        const isBorder = row === 0 || row === 6 || column === 0 || column === 6
        const isCenter = row >= 2 && row <= 4 && column >= 2 && column <= 4
        matrix[y][x] = isBorder || isCenter
        reserved[y][x] = true
      }
    }
  }

  markFinder(0, 0)
  markFinder(size - 7, 0)
  markFinder(0, size - 7)

  for (let index = 8; index < size - 8; index += 1) {
    matrix[6][index] = index % 2 === 0
    matrix[index][6] = index % 2 === 0
    reserved[6][index] = true
    reserved[index][6] = true
  }

  let seed = hashString(value)

  function nextBit() {
    seed = (1664525 * seed + 1013904223) >>> 0
    return (seed & 1) === 1
  }

  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      if (reserved[row][column]) continue
      matrix[row][column] = nextBit()
    }
  }

  return matrix
}

function matrixToSvg(matrix) {
  const cell = 8
  const padding = 12
  const size = matrix.length * cell + padding * 2

  const blocks = matrix.flatMap((row, rowIndex) =>
    row.flatMap((isFilled, columnIndex) => (
      isFilled
        ? `<rect x="${padding + columnIndex * cell}" y="${padding + rowIndex * cell}" width="${cell}" height="${cell}" rx="1" />`
        : []
    ))
  )

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" fill="none">
      <rect width="${size}" height="${size}" rx="24" fill="#ffffff"/>
      <g fill="#085041">${blocks.join('')}</g>
    </svg>
  `.trim()
}

export default function ProQrGenerator({
  fishermanName,
  productName,
  location,
  locked = false,
  onUnlock,
}) {
  const payload = `mareeforce://trace?fisherman=${encodeURIComponent(fishermanName)}&product=${encodeURIComponent(productName)}&location=${encodeURIComponent(location)}`
  const svgMarkup = matrixToSvg(buildMatrix(payload))

  function downloadSvg() {
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `mareeforce-${fishermanName.toLowerCase().replaceAll(' ', '-')}.svg`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="card relative overflow-hidden">
      {locked && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl text-center px-6" style={{ backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)' }}>
          <div className="text-3xl">🔒</div>
          <div className="font-semibold text-sm text-gray-900">QR traçabilité réservé au plan Pro</div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Générez un visuel "pêché par {fishermanName}" pour carte, menu ou étal.
          </p>
          <button onClick={onUnlock} className="btn-primary max-w-xs">
            Débloquer le plan Pro
          </button>
        </div>
      )}

      <div className={locked ? 'blur-sm select-none pointer-events-none' : ''}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
              Trace Pro
            </div>
            <h3 className="font-bold text-gray-900 text-base mt-1">Pêché par {fishermanName}</h3>
            <p className="text-xs text-gray-500 mt-1">{productName} · {location}</p>
          </div>
          <div className="rounded-2xl p-2" style={{ backgroundColor: '#E1F5EE' }}>
            <div className="w-28 h-28" dangerouslySetInnerHTML={{ __html: svgMarkup }} />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-xl p-3 bg-gray-50">
            <div className="text-gray-400">Usage</div>
            <div className="font-semibold text-gray-900 mt-1">Menu, étiquette, QR de table</div>
          </div>
          <div className="rounded-xl p-3 bg-gray-50">
            <div className="text-gray-400">Payload</div>
            <div className="font-semibold text-gray-900 mt-1 break-all">mareeforce://trace</div>
          </div>
        </div>

        {!locked && (
          <button onClick={downloadSvg} className="btn-secondary mt-4">
            Télécharger le QR
          </button>
        )}
      </div>
    </div>
  )
}
