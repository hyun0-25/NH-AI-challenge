import React from 'react'
import { Link } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'
import { useAppState } from '../App'

function Dashboard() {
  const { selectedSubtypes, cropOrder } = useAppState()
  const entries = cropOrder
    .map(id => ({ id, name: (useAppState().cropsCatalog[id]?.name) || id, emoji: (useAppState().cropsCatalog[id]?.emoji) || '🌱' }))

  const representativeId = entries[0]?.id

  return (
    <MobileFrame>
      <div className="w-full h-full bg-gray-50 mobile-safe-area flex flex-col">
        <header className="px-4 pt-3 pb-2 flex items-center justify-between">
          <div className="text-sm font-medium">MY 영농/농장</div>
          <Link to="/manage" className="text-sm text-blue-600">내 영농/농장 관리</Link>
        </header>
        <main className="px-4 space-y-3">
          <div className="flex gap-3 overflow-auto pb-2">
            {entries.map(crop => {
              const isRep = crop.id === representativeId
              return (
                <div key={crop.id} className={`relative w-28 rounded-xl p-3 ${isRep ? 'bg-blue-600 text-white' : 'bg-white'} shadow`}> 
                  <div className="absolute right-2 top-2 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <span className="text-blue-600">✓</span>
                  </div>
                  <div className="text-2xl">{crop.emoji}</div>
                  <div className="mt-2 text-sm font-medium">{crop.name}</div>
                  <div className="mt-1 text-[11px] opacity-80 line-clamp-2">
                    {(selectedSubtypes[crop.id] || []).join(', ')}
                  </div>
                </div>
              )
            })}
            <Link to="/manage" className="w-28 rounded-xl p-3 bg-white shadow flex items-center justify-center text-2xl">+</Link>
          </div>

          <div className="space-y-2">
            {['내 농장에 꼭! 맞는 보험상품 보러가기', '내 농장에 꼭! 맞는 정부 지원정책 보러가기', '내 농장에 꼭! 맞는 NH농협 금융상품 보러가기'].map(text => (
              <button key={text} className="w-full h-12 bg-white shadow rounded-xl px-4 flex items-center justify-between">
                <span className="text-sm">{text}</span>
                <span>›</span>
              </button>
            ))}
          </div>
        </main>
        <div className="mt-auto p-4">
          <button className="w-full h-12 bg-blue-600 text-white rounded-lg">AI 챗봇과 상담 시작하기</button>
        </div>
      </div>
    </MobileFrame>
  )
}

export default Dashboard


