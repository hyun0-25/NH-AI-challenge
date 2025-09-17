import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'
import BackButton from '../components/BackButton'
import { useAppState } from '../App'

function FarmManage() {
  const { cropOrder, setCropOrder, selectedSubtypes } = useAppState()
  const navigate = useNavigate()

  const move = (index: number, delta: number) => {
    const next = [...cropOrder]
    const target = index + delta
    if (target < 0 || target >= next.length) return
    const [item] = next.splice(index, 1)
    next.splice(target, 0, item)
    setCropOrder(next)
  }

  const items = cropOrder.map(id => ({ id, name: (useAppState().cropsCatalog[id]?.name) || id, emoji: (useAppState().cropsCatalog[id]?.emoji) || '🌱' }))

  return (
    <MobileFrame>
      <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
        <header className="px-4 pt-3 pb-2">
          <BackButton />
          <h1 className="text-2xl font-semibold text-center">내 작물 관리</h1>
        </header>
        <main className="px-4 space-y-4">
          <button onClick={() => navigate('/crops')} className="w-full h-14 rounded-xl border-2 border-blue-500 text-blue-600 flex items-center justify-between px-4">
            <span className="text-lg">작물 등록하기</span>
            <span className="text-2xl">＋</span>
          </button>
          <p className="text-center text-gray-500">작물을 원하는 위치로 이동해 보세요{`\n`}가장 위에 있는 작물이 대표작물로 설정돼요</p>

          <div className="space-y-3 pb-24">
            {items.map((crop, idx) => (
              <div key={crop.id} className="rounded-2xl border shadow-sm p-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-50 border flex items-center justify-center text-2xl">{crop.emoji}</div>
                <div className="flex-1">
                  <div className="font-medium text-lg">{crop.name}</div>
                  <div className="text-xs text-gray-500">{(selectedSubtypes[crop.id] || []).join(', ')}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <button onClick={() => move(idx, -1)} className="w-8 h-8 rounded-lg border">∧</button>
                  <button onClick={() => move(idx, 1)} className="w-8 h-8 rounded-lg border">∨</button>
                </div>
              </div>
            ))}
          </div>
        </main>
        <div className="mt-auto p-4">
          <Link to="/" className="w-full h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center">확인</Link>
        </div>
      </div>
    </MobileFrame>
  )
}

export default FarmManage


