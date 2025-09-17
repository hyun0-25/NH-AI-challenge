import React, { useEffect, useRef } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  onComplete: (data: { zonecode: string; address: string }) => void
}

declare global {
  interface Window { daum: any }
}

function DaumPostcodeModal({ open, onClose, onComplete }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const Postcode = window?.daum?.Postcode
    if (!Postcode) return
    const postcode = new Postcode({
      oncomplete: function (data: any) {
        onComplete({ zonecode: data.zonecode, address: data.roadAddress || data.address })
        onClose()
      },
      width: '100%',
      height: '100%',
      animation: true,
    })
    postcode.embed(wrapRef.current!, { autoClose: false })
  }, [open])

  if (!open) return null
  return (
    <div className="absolute inset-0 z-50 bg-white">
      <div className="h-12 flex items-center justify-between px-3 border-b">
        <button aria-label="back" onClick={onClose} className="w-10 h-10 -ml-2 text-2xl">‹</button>
        <div className="text-base font-semibold">주소검색</div>
        <div className="w-10" />
      </div>
      <div ref={wrapRef} className="absolute inset-x-0 bottom-0 top-12 bg-white" />
    </div>
  )
}

export default DaumPostcodeModal


