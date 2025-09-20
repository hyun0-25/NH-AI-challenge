import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = { className?: string }

function BackButton({ className }: Props) {
  const navigate = useNavigate()
  return (
    <button
      aria-label="back"
      onClick={() => navigate(-1)}
      className={`w-10 h-10 -ml-2 flex items-center justify-center ${className ?? ''}`}
    >
      <img src="/src/images/arrow-left.png" alt="뒤로가기" className="w-6 h-6 object-contain" />
    </button>
  )
}

export default BackButton


