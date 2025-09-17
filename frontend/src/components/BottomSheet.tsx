import React, { useEffect } from 'react'

type Props = {
  open: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
  footer?: React.ReactNode
}

function BottomSheet({ open, title, onClose, children, footer }: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null
  return (
    <div className="absolute inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl p-5" style={{maxHeight: '80%'}}>
        <div className="flex items-center justify-between mb-3">
          <div className="text-lg font-semibold mx-auto">{title}</div>
          <button aria-label="close" onClick={onClose} className="absolute right-5 top-4 text-2xl leading-none">×</button>
        </div>
        <div className="overflow-auto" style={{maxHeight: 'calc(80vh - 120px)'}}>
          {children}
        </div>
        {footer && (
          <div className="pt-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export default BottomSheet


