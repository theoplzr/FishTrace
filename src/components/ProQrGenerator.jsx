function getTraceUrl(fishermanId, productId) {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  return `${origin}/trace/${fishermanId}?product=${productId}`
}

export default function ProQrGenerator({
  fishermanName,
  productName,
  location,
  fishermanId = 'marco-ferreira',
  productId = 'maquereau-marco',
  locked = false,
  onUnlock,
}) {
  const traceUrl = getTraceUrl(fishermanId, productId)
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=12&data=${encodeURIComponent(traceUrl)}`

  return (
    <div className="card relative overflow-hidden">
      {locked && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl text-center px-6" style={{ backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)' }}>
          <div className="text-3xl">🔒</div>
          <div className="font-semibold text-sm text-gray-900">QR traçabilité réservé à votre accès MaréeForce</div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Générez un QR réellement scannable pour afficher la preuve de pêche.
          </p>
          <button onClick={onUnlock} className="btn-primary max-w-xs">
            Débloquer l’accès
          </button>
        </div>
      )}

      <div className={locked ? 'blur-sm select-none pointer-events-none' : ''}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
              QR traçabilité
            </div>
            <h3 className="font-bold text-gray-900 text-base mt-1">Pêché par {fishermanName}</h3>
            <p className="text-xs text-gray-500 mt-1">{productName} · {location}</p>
          </div>
          <div className="rounded-3xl p-3 w-fit" style={{ backgroundColor: '#E1F5EE' }}>
            <img src={qrImageUrl} alt={`QR traçabilité ${productName}`} className="w-36 h-36 rounded-2xl bg-white" />
          </div>
        </div>

        <div className="mt-4 rounded-2xl p-3 bg-gray-50">
          <div className="text-xs text-gray-400">Lien encodé dans le QR</div>
          <div className="font-semibold text-xs text-gray-900 mt-1 break-all">{traceUrl}</div>
        </div>

        {!locked && (
          <div className="grid gap-3 mt-4 sm:grid-cols-2">
            <a href={qrImageUrl} target="_blank" rel="noreferrer" className="btn-secondary">
              Ouvrir le QR
            </a>
            <a href={traceUrl} className="btn-primary">
              Voir la fiche
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
