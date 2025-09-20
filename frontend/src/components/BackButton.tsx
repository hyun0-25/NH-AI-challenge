import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = { className?: string }

function BackButton({ className }: Props) {
  const navigate = useNavigate()
  return (
    <button
      aria-label="back"
      onClick={() => navigate(-1)}
      className={`w-10 h-10 -ml-2 flex items-center justify-center text-2xl text-gray-700 ${className ?? ''}`}
    >
      ‹
    </button>
  )
}

export default BackButton


