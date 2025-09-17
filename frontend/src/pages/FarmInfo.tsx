import React, { useState } from 'react'
import MobileFrame from '../components/MobileFrame'
import BackButton from '../components/BackButton'

function FarmInfo() {
  const [types, setTypes] = useState<string[]>([])
  const [area, setArea] = useState('')
  const toggle = (v: string) => {
    setTypes(prev => (prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]))
  }

  return (
    <MobileFrame>
      <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
        <header className="px-4 pt-3 pb-2">
          <BackButton />
          <div className="text-sm">
            <span className="font-semibold">농장 유형과 면적</span>을 입력하면
          </div>
          <div className="text-sm text-gray-500">알맞은 보험 및 정책을 찾아드려요</div>
        </header>
        <main className="px-4 space-y-4">
          <section>
            <div className="text-sm font-medium mb-2">농장 유형을 선택해 주세요</div>
            <div className="space-y-2 text-sm text-gray-700">
              {['밭', '논', '과수원', '시설재배(온실)', '축사', '기타'].map(opt => (
                <label key={opt} className="flex items-center gap-2">
                  <input type="checkbox" checked={types.includes(opt)} onChange={() => toggle(opt)} />
                  {opt}
                </label>
              ))}
            </div>
          </section>

          <section className="space-y-2">
            <div className="text-sm font-medium">농장 면적을 입력해 주세요</div>
            <div className="flex items-center gap-2">
              <input value={area} onChange={e => setArea(e.target.value)} placeholder="예: 330(평) / 1.0(ha)" className="flex-1 h-11 rounded-lg bg-gray-100 px-3 text-sm outline-none" />
              <select className="h-11 px-2 border rounded-lg text-sm">
                <option>㎡</option>
                <option>평</option>
                <option>ha</option>
              </select>
            </div>
          </section>
        </main>
        <div className="mt-auto p-3">
          <button className="w-full bg-blue-600 text-white rounded-lg h-12">확인</button>
        </div>
      </div>
    </MobileFrame>
  )
}

export default FarmInfo


