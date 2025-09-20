import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'

const crops = [
  { id: 'tomato', name: '방울토마토', emoji: '🍅' },
  { id: 'rice', name: '벼', emoji: '🌾' },
  { id: 'pepper', name: '고추', emoji: '🌶️' },
  { id: 'cucumber', name: '오이', emoji: '🥒' },
  { id: 'eggplant', name: '가지', emoji: '🍆' },
  { id: 'strawberry', name: '딸기', emoji: '🍓' },
  { id: 'carrot', name: '당근', emoji: '🥕' },
  { id: 'grape', name: '포도', emoji: '🍇' },
  { id: 'apple', name: '사과', emoji: '🍎' },
]

function HomeRegister() {
  const navigate = useNavigate()

  return (
    <MobileFrame>
      <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
        <header className="px-4 pt-3 pb-2">
          <div className="text-sm text-gray-500">내의 작물과 농장을 등록해보세요</div>
          <h1 className="text-lg font-semibold mt-1">추가정보를 등록해두면 서비스 이용이 더욱 편리해져요!</h1>
        </header>
        <main className="px-4 mt-2 flex-1">
          <div className="w-full h-full rounded-3xl bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
            <div className="absolute -left-10 top-6 w-20 h-40 bg-blue-100 rounded-full blur-2xl opacity-60" />
            <div className="absolute right-0 -bottom-8 w-48 h-48 bg-indigo-100 rounded-full blur-2xl opacity-60" />
            <div className="absolute left-6 bottom-10 w-16 h-16 bg-cyan-100 rounded-full blur-md opacity-70" />
          </div>
        </main>
        <div className="p-3 flex gap-2">
          <Link to="/" className="flex-1 border rounded-lg h-12 flex items-center justify-center text-gray-700">다음에 할래요</Link>
          <Link to="/crops" className="flex-1 bg-blue-600 text-white rounded-lg h-12 flex items-center justify-center">네, 좋아요</Link>
        </div>
      </div>
    </MobileFrame>
  )
}

export default HomeRegister


