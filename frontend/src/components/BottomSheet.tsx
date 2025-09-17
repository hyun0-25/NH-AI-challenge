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
      <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl flex flex-col" style={{maxHeight: '50%'}}>
        <div className="relative px-5 py-3 border-b">
          <div className="text-base font-semibold text-center">{title}</div>
          <button aria-label="close" onClick={onClose} className="absolute right-5 top-2 text-2xl leading-none">×</button>
        </div>
        <div className="flex-1 overflow-auto px-5 py-3">
          {children}
        </div>
        {footer && (
          <div className="px-0">{footer}</div>
        )}
      </div>
    </div>
  )
}

export default BottomSheet


