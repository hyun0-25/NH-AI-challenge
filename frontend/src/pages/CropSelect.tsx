import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../App'
import MobileFrame from '../components/MobileFrame'
import BottomSheet from '../components/BottomSheet'
import BackButton from '../components/BackButton'
// Dynamic from API

// now imported from data

function CropSelect() {
  const { selectedCrops, setSelectedCrops, selectedVarieties, setSelectedVarieties, cropsCatalog, setCropsCatalog, varietiesMap, setVarietiesMap } = useAppState()
  const navigate = useNavigate()
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [currentCropId, setCurrentCropId] = React.useState<string | null>(null)
  const [tempSelected, setTempSelected] = React.useState<string[]>([])
  const [showSelected, setShowSelected] = React.useState(true)
  const [query, setQuery] = React.useState('')
  const [allIds, setAllIds] = React.useState<string[]>([])

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/crops', { headers: { 'Accept': 'application/json' } })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const rows: any[] = await res.json()
        if (!Array.isArray(rows)) throw new Error('Invalid payload')
        const catalog: Record<string, { name: string; emoji: string }> = {}
        const ids: string[] = []
        rows.forEach(row => {
          const id = String(row.cropCategoryId)
          catalog[id] = { name: row.cropCategoryName, emoji: '🌱' }
          ids.push(id)
          const list = (row.cropVarietyResponses || [])
          // store ids and names in global map
          setVarietiesMap((prev: Record<string, { id: number; name: string }[]>) => ({ ...prev, [id]: list.map((v: any) => ({ id: v.cropVarietyId, name: v.cropVarietyName })) }))
        })
        setCropsCatalog(catalog)
        setAllIds(ids)
      } catch (err) {
        console.error('[CropSelect] Failed to load crops:', err)
        // Fallback demo data so UI is not empty
        const demoCatalog: Record<string, { name: string; emoji: string }> = {
          '1': { name: '미곡류', emoji: '🌾' },
          '2': { name: '맥류', emoji: '🌾' },
          '3': { name: '두류', emoji: '🫘' },
        }
        const demoVarieties: Record<string, { id: number; name: string }[]> = {
          '1': [{ id: 1, name: '쌀(벼)' }, { id: 2, name: '찹쌀' }],
          '2': [{ id: 3, name: '귀리' }, { id: 4, name: '보리' }, { id: 5, name: '호밀' }],
          '3': [{ id: 6, name: '강낭콩' }, { id: 7, name: '완두' }, { id: 8, name: '콩' }],
        }
        setCropsCatalog(demoCatalog)
        setVarietiesMap(demoVarieties)
        setAllIds(Object.keys(demoCatalog))
      }
    }
    load()
  }, [])

  const ensureSelected = (id: string) => {
    const found = selectedCrops.find(c => c.id === id)
    if (!found) {
      const meta = cropsCatalog[id] || { name: id, emoji: '🌾' }
      setSelectedCrops([...selectedCrops, { id, name: meta.name, emoji: meta.emoji }])
    }
    if (!selectedVarieties[id]) setSelectedVarieties({ ...selectedVarieties, [id]: [] })
  }

  const openSheetFor = (id: string) => {
    ensureSelected(id)
    setCurrentCropId(id)
    const initial = (selectedVarieties[id] || []).map(String)
    setTempSelected(initial)
    setSheetOpen(true)
  }

  return (
    <MobileFrame>
      <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
        <header className="px-4 pt-3 pb-5">
          <BackButton />
          <h1 className="mt-3 text-[24px] font-semibold tracking-tight">
            <span className="text-teal-700">작물</span>
            <span className="text-gray-900">을 선택해 주세요</span>
          </h1>
          <div className="mt-1 text-[14px] text-gray-400">부류별로 품목을 선택할 수 있어요</div>
          <div className="mt-3">
            <input
              placeholder="품목을 입력하세요"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full bg-transparent border-b border-gray-200 h-10 px-1 text-[18px] placeholder:text-gray-400 outline-none"
            />
          </div>
        </header>
        {/* 내가 선택한 작물 섹션 */}
        <section className="mt-3 border-y bg-white">
          <button
            className="w-full flex items-center justify-between px-4 py-3"
            onClick={() => setShowSelected(!showSelected)}
          >
            <div className="text-[15px] font-bold text-gray-900">
              내가 선택한 작물
              <span className="ml-2 px-3 h-4 inline-flex items-center justify-center text-[12px]  text-white bg-teal-600 rounded-full px-2 h-5">
                {Object.values(selectedVarieties).reduce((n, arr) => n + (arr?.length || 0), 0)}
              </span>
            </div>
            <span className={`text-xl text-gray-500 transition-transform ${showSelected ? '' : ''}`}>{showSelected ? '▴' : '▾'}</span>
          </button>
          {showSelected && (
            <div className="px-4 pb-5 flex flex-wrap gap-3">
              {Object.entries(selectedVarieties).flatMap(([cropId, ids]) =>
                (ids || []).map(varId => (
                  <button
                    key={`${cropId}-${varId}`}
                    onClick={() => {
                      const next = (selectedVarieties[cropId] || []).filter(x => x !== varId)
                      setSelectedVarieties({ ...selectedVarieties, [cropId]: next })
                    }}
                    className="px-2 h-7 rounded-full bg-teal-600 text-white text-[13px] inline-flex items-center gap-2 shadow-sm"
                  >
                    <span>{(varietiesMap[cropId] || []).find(v => v.id === varId)?.name || ''}</span>
                    <span className="text-white/90">×</span>
                  </button>
                ))
              )}
            </div>
          )}
        </section>

        {/* 스크롤 가능한 본문 */}
        <div className="flex-1 overflow-auto">
          {/* 검색 결과 */}
          {query.trim() && (
            <div className="px-4 mt-3 space-y-2">
              {(() => {
                const q = query.trim()
                const results: { cropId: string; varietyId: number; name: string }[] = []
                Object.entries(varietiesMap).forEach(([cropId, list]) => {
                  list.forEach(v => {
                    if (v.name.includes(q)) results.push({ cropId, varietyId: v.id, name: v.name })
                  })
                })
                return (
                  <>
                    <div className="text-sm text-gray-700">총 {results.length}개</div>
                    <div className="bg-white rounded-xl divide-y">
                      {results.map(({ cropId, varietyId, name }) => {
                        const category = (cropsCatalog[cropId]?.name) || ''
                        const on = (selectedVarieties[cropId] || []).includes(varietyId)
                        return (
                          <button
                            key={`${cropId}-${varietyId}`}
                            onClick={() => {
                              ensureSelected(cropId)
                              const cur = selectedVarieties[cropId] || []
                              const next = on ? cur.filter(x => x !== varietyId) : [...cur, varietyId]
                              setSelectedVarieties({ ...selectedVarieties, [cropId]: next })
                            }}
                            className="w-full py-4 px-3 flex items-center justify-between"
                          >
                            <span className="text-base text-gray-800"><span className="font-medium">{category}</span> &gt; {name}</span>
                            <span className={`text-xl ${on ? 'text-teal-600' : 'text-gray-300'}`}>✓</span>
                          </button>
                        )
                      })}
                    </div>
                  </>
                )
              })()}
            </div>
          )}

          {/* 그리드 */}
          {!query.trim() && (
          <div className="px-3 grid grid-cols-3 gap-4 mt-3 pb-28">
          {allIds.length === 0 && (
            <div className="col-span-3 text-center text-gray-400 text-sm">불러온 작물이 없습니다. 서버를 확인한 후 새로고침 해주세요.</div>
          )}
          {allIds.map((id, idx) => {
            const crop = { id, name: (cropsCatalog[id]?.name) || id, emoji: (cropsCatalog[id]?.emoji) || '🌱' }
            const active = (selectedVarieties[crop.id] || []).length > 0
            const count = (selectedVarieties[crop.id] || []).length
            const pastel = ['bg-[#EAF4FF]','bg-[#FFF4E6]','bg-[#F3E8FF]','bg-[#EAFBF5]','bg-[#FFEFF3]'][(idx)%5]
            
            // 이미지 파일명 매칭
            const getImageSrc = (cropName: string) => {
              return new URL(`../images/${cropName}.png`, import.meta.url).href
            }
            
            const imageSrc = getImageSrc(crop.name)
            
            return (
              <button
                key={crop.id}
                onClick={() => openSheetFor(crop.id)}
                className={`relative flex flex-col items-center justify-center text-sm transition py-2`}
              >
                <div className={`w-16 h-16 rounded-full ${pastel} flex items-center justify-center relative ${active ? 'ring-2 ring-teal-600' : ''}`}>
                  <img 
                    src={imageSrc} 
                    alt={crop.name}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      // 이미지 로드 실패 시 이모지로 대체
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent) {
                        const emojiDiv = document.createElement('div')
                        emojiDiv.className = 'text-xl'
                        emojiDiv.textContent = crop.emoji
                        parent.appendChild(emojiDiv)
                      }
                    }}
                  />
                  {count > 0 && (
                    <span className="absolute -top-3 bg-teal-600 text-white text-[10px] font-semibold rounded-full w-7 h-5 flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </div>
                <div className="mt-2 text-[13px]">{crop.name}</div>
              </button>
            )
          })}
          </div>
          )}
        </div>
        <div className="mt-auto p-0">
          <button
            disabled={Object.values(selectedVarieties).reduce((total, arr) => total + (arr?.length || 0), 0) === 0}
            onClick={() => navigate('/summary')}
            className={`w-full h-12 rounded-none ${
              Object.values(selectedVarieties).reduce((total, arr) => total + (arr?.length || 0), 0) === 0
                ? 'bg-gray-200 text-gray-400'
                : 'bg-teal-600 text-white'
            }`}
          >
            다음
          </button>
        </div>
      </div>
      <BottomSheet
        open={sheetOpen}
        title={currentCropId ? (cropsCatalog[currentCropId]?.name || '') : ''}
        onClose={() => setSheetOpen(false)}
        footer={(
          <button
            className="w-full h-12 rounded-none bg-teal-600 text-white"
            onClick={() => {
              if (!currentCropId) return
              setSelectedVarieties({ ...selectedVarieties, [currentCropId]: tempSelected.map(Number) })
              setSheetOpen(false)
            }}
          >
            확인
          </button>
        )}
      >
        <div className="space-y-3 pb-4">
          {/* Selected chips row */}
          {currentCropId && tempSelected.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tempSelected.map(sel => (
                <button
                  key={sel}
                  onClick={() => {
                    setTempSelected(tempSelected.filter(x => x !== sel))
                  }}
                  className="px-3 h-8 rounded-full bg-teal-600 text-white text-[12px] inline-flex items-center gap-2"
                >
                  <span>{(varietiesMap[currentCropId] || []).find(v => v.id === Number(sel))?.name || sel}</span>
                  <span className="opacity-90">×</span>
                </button>
              ))}
            </div>
          )}
          {/* Helper text */}
          {(!tempSelected || tempSelected.length === 0) && (
            <div className="text-[13px] text-gray-500">여러 작물을 선택할 수 있어요</div>
          )}
          {/* Options grid */}
          <div className="grid grid-cols-2 gap-2">
            {(currentCropId ? (varietiesMap[currentCropId] || []) : []).map(v => {
              const on = tempSelected.includes(String(v.id))
              return (
                <button
                  key={v.id}
                  onClick={() => {
                    setTempSelected(prev => (prev.includes(String(v.id)) ? prev.filter(x => x !== String(v.id)) : [...prev, String(v.id)]))
                  }}
                  className={`h-10 rounded-full border text-sm ${on ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-800'} `}
                >
                  {v.name}
                </button>
              )
            })}
          </div>
        </div>
      </BottomSheet>
    </MobileFrame>
  )
}

export default CropSelect

