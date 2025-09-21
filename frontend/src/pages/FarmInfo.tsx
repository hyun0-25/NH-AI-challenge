import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'
import BackButton from '../components/BackButton'
import { useAppState } from '../App'

function FarmInfo() {
  const { 
    farmType, setFarmType, 
    farmTypeOtherDescription, setFarmTypeOtherDescription, 
    farmArea, setFarmArea,
    farmAreaUnitType, setFarmAreaUnitType,
    farmZipCode, farmLocation, farmLocationDetail,
    selectedVarieties
  } = useAppState()
  const navigate = useNavigate()
  const [unit, setUnit] = useState<'㎡' | '평' | 'ha'>('㎡')
  
  // Sync unit with global state
  React.useEffect(() => {
    const unitMap = { '㎡': 'M2', '평': 'PYEONG', 'ha': 'HECTARE' } as const
    setFarmAreaUnitType(unitMap[unit])
  }, [unit, setFarmAreaUnitType])

  const parseNumber = (value: string): string => {
    // Allow only digits and one dot
    let v = value.replace(/[^0-9.]/g, '')
    const firstDot = v.indexOf('.')
    if (firstDot !== -1) {
      v = v.slice(0, firstDot + 1) + v.slice(firstDot + 1).replace(/\./g, '')
    }
    return v
  }

  const areaFloat = farmArea || 0
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
        <header className="px-4 pt-3 pb-10">
          <BackButton />
          <h1 className="text-2xl font-medium pt-5 px-1">농장 <span className="text-[#4293A0] font-bold">유형</span>과 <span className="text-[#4293A0] font-bold">면적</span>을 입력하면</h1>
          <div className="text-[18px] text-gray-500 px-1">알맞은 보험 및 정책을 찾아드려요</div>
        </header>
        <main className="px-6 space-y-10">
          <section>
            <div className="text-[18px] font-medium mb-2">농장 유형을 선택해 주세요</div>
            <div className="space-y-2 text-sm text-gray-500">
              {[
                { key: 'RICE_PADDY', label: '논(벼 재배)' },
                { key: 'FIELD', label: '밭(채소/잡곡)' },
                { key: 'ORCHARD', label: '과수원' },
                { key: 'LIVESTOCK', label: '축사' },
                { key: 'FACILITY_CULTIVATION', label: '시설재배지(비닐하우스/온실)' },
                { key: 'FOREST_SPECIAL', label: '임야/특용작물' },
                { key: 'OTHER', label: '기타' }
              ].map(opt => (
                <label key={opt.key} className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="farmType" 
                    checked={farmType === opt.key} 
                    onChange={() => setFarmType(opt.key)} 
                  />
                  {opt.label}
                  {opt.key === 'OTHER' && farmType === 'OTHER' && (
                    <input 
                      type="text" 
                      value={farmTypeOtherDescription || ''} 
                      onChange={e => setFarmTypeOtherDescription(e.target.value)}
                      placeholder="기타 유형을 입력하세요"
                      className="ml-2 flex-1 h-8 bg-transparent border-b border-gray-200 px-1 text-sm outline-none"
                    />
                  )}
                </label>
              ))}
            </div>
          </section>

          <section className="space-y-2">
            <div className="text-[18px] font-medium">농장 면적을 입력해 주세요</div>
            <div className="flex items-center gap-2">
              <input
                value={farmArea ? String(farmArea) : ''}
                onChange={e => setFarmArea(parseFloat(parseNumber(e.target.value)) || 0)}
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
            <div className="text-[11px] text-gray-400 px-2">{m2 ? `약 ${pyeong.toFixed(0)}평 / ${ha.toFixed(2)}ha` : '약 0평 / 0ha'}</div>
          </section>
        </main>
        <div className="mt-auto">
          <button 
            disabled={!farmType || !areaFloat || (farmType === 'OTHER' && !farmTypeOtherDescription?.trim())} 
            className={`w-full h-12 rounded-none ${(!farmType || !areaFloat || (farmType === 'OTHER' && !farmTypeOtherDescription?.trim())) ? 'bg-gray-200 text-gray-400' : 'bg-[#4293A0] text-white'}`}
            onClick={() => navigate('/crops')}
          >
            확인
          </button>
          <div className="h-4 bg-white"></div>
        </div>
      </div>
    </MobileFrame>
  )
}

export default FarmInfo


