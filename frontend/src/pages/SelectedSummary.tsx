import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../App'
import MobileFrame from '../components/MobileFrame'
import BackButton from '../components/BackButton'
// dynamic data from App state

function SelectedSummary() {
  const { selectedCrops, selectedSubtypes, cropsCatalog } = useAppState()
  const navigate = useNavigate()

  return (
    <MobileFrame>
      <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
        <header className="px-4 pt-3 pb-2 border-b">
          <BackButton />
          <div className="text-lg"><span className="text-gray-900 font-semibold">내가 선택한 </span><span className="text-blue-600 font-semibold">작물</span><span className="text-gray-900 font-semibold">이에요</span></div>
          <div className="text-xs text-gray-500 mt-1">작물의 품종을 선택할 수 있어요</div>
        </header>
        <main className="px-4 py-3 flex-1 overflow-auto">
          <div className="space-y-4">
            {Object.keys(selectedSubtypes).filter(id => (selectedSubtypes[id] || []).length > 0).map(id => {
              const meta = cropsCatalog[id] || { name: id, emoji: '🌱' }
              return (
                <div key={id} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 border flex items-center justify-center text-xl">{meta.emoji}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{meta.name}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(selectedSubtypes[id] || []).map(st => (
                        <span key={st} className="px-3 h-8 inline-flex items-center rounded-full bg-gray-100 text-sm text-gray-700">{st}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </main>
        <div className="p-3">
          <button onClick={() => navigate('/address')} className="w-full h-12 rounded-lg bg-blue-600 text-white">확인</button>
        </div>
      </div>
    </MobileFrame>
  )
}

export default SelectedSummary


