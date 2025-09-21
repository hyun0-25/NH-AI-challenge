import React, { useState, useEffect } from 'react'
import MobileFrame from '../components/MobileFrame'

function LoadingPage() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    // 3초 후 자동으로 완료 (게이지 바가 다 차기 전에)
    const timeout = setTimeout(() => {
      clearInterval(interval)
      setProgress(100)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <MobileFrame>
      <div className="w-full h-full mobile-safe-area flex flex-col">
        {/* Header */}
        <header className="px-4 pt-3 pb-2 flex items-center justify-between relative bg-white">
          <div className="text-sm font-medium absolute left-1/2 transform -translate-x-1/2">MY 영농/농장</div>
          <div className="flex gap-4 ml-auto">
            <button className="w-5 h-5">
              <img src="/src/images/bell.png" alt="알림" className="w-full h-full object-contain" />
            </button>
            <button className="w-5 h-5">
              <img src="/src/images/home.png" alt="홈" className="w-full h-full object-contain" />
            </button>
            <button className="w-5 h-5">
              <img src="/src/images/menu.png" alt="메뉴" className="w-full h-full object-contain" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-8 bg-[#4293A0]/10">
          <div className="text-center">
            {/* Loading Image with Progress Bar */}
            <div className="mb-6">
              <div className="w-48 h-48 mx-auto relative">
                {/* Circular Progress Bar */}
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#E5E7EB"
                    strokeWidth="4"
                    fill="none"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#4293A0"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                    strokeLinecap="round"
                    style={{
                      transition: 'stroke-dashoffset 0.1s ease-in-out'
                    }}
                  />
                </svg>
                
                {/* Center Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-42 h-42 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <img 
                      src="/src/images/로딩중 화면 이미지.png" 
                      alt="로딩 중" 
                      className="w-40 h-40 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Loading Text */}
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-800">
                김○○님의 정보를 등록중이에요.
              </p>
              <p className="text-sm text-gray-600">
                잠시만 기다려 주세요.
              </p>
            </div>
          </div>
        </main>
      </div>
    </MobileFrame>
  )
}

export default LoadingPage
