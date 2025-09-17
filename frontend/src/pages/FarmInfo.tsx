import React, { useState } from 'react'
import MobileFrame from '../components/MobileFrame'
import BackButton from '../components/BackButton'

function FarmInfo() {
  const [type, setType] = useState<string>('')
  const [area, setArea] = useState('')
  const [unit, setUnit] = useState<'㎡' | '평' | 'ha'>('㎡')

  const parseNumber = (value: string): string => {
    // Allow only digits and one dot
    let v = value.replace(/[^0-9.]/g, '')
    const firstDot = v.indexOf('.')
    if (firstDot !== -1) {
      v = v.slice(0, firstDot + 1) + v.slice(firstDot + 1).replace(/\./g, '')
    }
    return v
  }

  const areaFloat = area ? parseFloat(area) : 0
  const toSquareMeter = (): number => {
    if (!areaFloat) return 0
    if (unit === '㎡') return areaFloat
    if (unit === '평') return areaFloat * 3.305785
    // ha
    return areaFloat * 10000
  }
  const m2 = toSquareMeter()
  const pyeong = m2 ? m2 / 3.305785 : 0
  const ha = m2 ? m2 / 10000 : 0

  return (
    <MobileFrame>
      <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
        <header className="px-4 pt-3 pb-2">
          <BackButton />
          <h1 className="text-[20px] font-semibold"><span className="text-teal-700">농장 유형과 면적</span>을 입력하면</h1>
          <div className="text-[12px] text-gray-500">알맞은 보험 및 정책을 찾아드려요</div>
        </header>
        <main className="px-4 space-y-4">
          <section>
            <div className="text-sm font-medium mb-2">농장 유형을 선택해 주세요</div>
            <div className="space-y-2 text-sm text-gray-700">
              {['논(벼 재배)', '밭(채소/잡곡)', '과수원', '축사', '시설재배지(비닐하우스/온실)', '임야/특용작물', '기타 : ________'].map(opt => (
                <label key={opt} className="flex items-center gap-2">
                  <input type="radio" name="farmType" checked={type === opt} onChange={() => setType(opt)} />
                  {opt}
                </label>
              ))}
            </div>
          </section>

          <section className="space-y-2">
            <div className="text-sm font-medium">농장 면적을 입력해 주세요</div>
            <div className="flex items-center gap-2">
              <input
                value={area}
                onChange={e => setArea(parseNumber(e.target.value))}
                placeholder="숫자 입력해 주세요"
                inputMode="decimal"
                className="flex-1 h-10 bg-transparent border-b border-gray-200 px-1 text-[15px] outline-none"
              />
              <select value={unit} onChange={e => setUnit(e.target.value as any)} className="h-10 px-2 border rounded-lg text-sm">
                <option value="㎡">㎡</option>
                <option value="평">평</option>
                <option value="ha">ha</option>
              </select>
            </div>
            <div className="text-[12px] text-gray-400">{m2 ? `약 ${pyeong.toFixed(0)}평 / ${ha.toFixed(2)}ha` : '약 0평 / 0ha'}</div>
          </section>
        </main>
        <div className="mt-auto p-0">
          <button disabled={!type || !area.trim() || !areaFloat} className={`w-full h-12 rounded-none ${(!type || !area.trim() || !areaFloat) ? 'bg-gray-200 text-gray-400' : 'bg-teal-600 text-white'}`}>확인</button>
        </div>
      </div>
    </MobileFrame>
  )
}

export default FarmInfo


