import React from 'react'

type Props = {
  children: React.ReactNode
  title?: string
}

function MobileFrame({ children, title }: Props) {
  return (
    <div className="iphone-preview-wrap">
      <div className="iphone-device relative overflow-hidden">
        <div className="status-bar">
          <span>{title ?? ''}</span>
          <div className="text-xs text-gray-500">9:41 ▪︎ LTE ▪︎ 100%</div>
        </div>
        <div className="iphone-notch" />
        <div className="iphone-content relative">
          {children}
        </div>
      </div>
    </div>
  )
}

export default MobileFrame


