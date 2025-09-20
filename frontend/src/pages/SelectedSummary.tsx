import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../App'
import MobileFrame from '../components/MobileFrame'
import BackButton from '../components/BackButton'
// dynamic data from App state

function SelectedSummary() {
  const { 
    selectedCrops, 
    selectedVarieties, 
    setSelectedVarieties,
    setSelectedCrops,
    cropsCatalog, 
    varietiesMap,
    farmZipCode,
    farmLocation,
    farmLocationDetail,
    farmType,
    farmTypeOtherDescription,
    farmArea,
    farmAreaUnitType,
    setFarmZipCode,
    setFarmLocation,
    setFarmLocationDetail,
    setFarmType,
    setFarmTypeOtherDescription,
    setFarmArea,
    setFarmAreaUnitType
  } = useAppState()
  const navigate = useNavigate()

  return (
    <MobileFrame>
      <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
        <header className="px-4 pt-3 pb-10">
          <BackButton />
          <div className="text-[20px] font-semibold"><span className="text-gray-900">내가 선택한 </span><span className="text-teal-700">작물</span><span className="text-gray-900">이에요</span></div>
          <div className="text-[15px] text-gray-400 mt-1">맞는지 확인해주세요</div>
        </header>
        <main className="px-4 py-3 flex-1 overflow-auto">
          <div className="space-y-6">
            {Object.keys(selectedVarieties).filter(id => (selectedVarieties[id] || []).length > 0).flatMap(id => {
              const meta = cropsCatalog[id] || { name: id, emoji: '🌱' }
              
              // 이미지 파일명 매칭
              const getImageSrc = (cropName: string) => {
                return new URL(`../images/${cropName}.png`, import.meta.url).href
              }
              
              const imageSrc = getImageSrc(meta.name)
              
              return (selectedVarieties[id] || []).map(varId => {
                const variety = (varietiesMap[id] || []).find(v => v.id === varId)
                return (
                  <div key={`${id}-${varId}`} className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gray-50 border flex items-center justify-center text-2xl">
                        <img 
                          src={imageSrc} 
                          alt={meta.name}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            // 이미지 로드 실패 시 이모지로 대체
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            const parent = target.parentElement
                            if (parent) {
                              const emojiDiv = document.createElement('div')
                              emojiDiv.className = 'text-xl'
                              emojiDiv.textContent = meta.emoji
                              parent.appendChild(emojiDiv)
                            }
                          }}
                        />
                      </div>
                      <button 
                        onClick={() => {
                          // Remove this specific variety
                          const newSelectedVarieties = { ...selectedVarieties }
                          if (newSelectedVarieties[id]) {
                            newSelectedVarieties[id] = newSelectedVarieties[id].filter(v => v !== varId)
                            if (newSelectedVarieties[id].length === 0) {
                              delete newSelectedVarieties[id]
                            }
                          }
                          setSelectedVarieties(newSelectedVarieties)
                        }}
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center"
                      >
                        <span className="text-white text-xs">×</span>
                      </button>
                    </div>
                    <div className="flex-1">
                      <div className="text-[18px] font-medium text-gray-900">{variety?.name || ''}</div>
                    </div>
                  </div>
                )
              })
            })}
          </div>
        </main>
        <div className="mt-auto p-0">
          <button 
            onClick={async () => {
              // Collect all selected variety IDs
              const cropVarietyList = Object.values(selectedVarieties).flat()
              
              // Prepare request body
              const requestBody = {
                farmZipCode,
                farmLocation,
                farmLocationDetail,
                farmType,
                farmTypeOtherDescription: farmType === 'OTHER' ? farmTypeOtherDescription : null,
                farmArea,
                farmAreaUnitType,
                cropVarietyList
              }
              
              try {
                const response = await fetch('/api/farms', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(requestBody)
                })
                
                if (response.ok) {
                  console.log('Farm registration successful')
                  
                  // Clear all form data
                  setSelectedCrops([])
                  setSelectedVarieties({})
                  setFarmZipCode('')
                  setFarmLocation('')
                  setFarmLocationDetail('')
                  setFarmType(null)
                  setFarmTypeOtherDescription(null)
                  setFarmArea(0)
                  setFarmAreaUnitType('M2')
                  
                  // Navigate to completion page
                  navigate('/complete')
                } else {
                  console.error('Farm registration failed')
                }
              } catch (error) {
                console.error('Error registering farm:', error)
              }
            }}
            className="w-full h-12 rounded-none bg-teal-600 text-white"
          >
            확인
          </button>
        </div>
      </div>
    </MobileFrame>
  )
}

export default SelectedSummary


