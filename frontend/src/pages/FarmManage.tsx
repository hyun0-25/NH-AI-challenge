import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'
import BackButton from '../components/BackButton'
import { useAppState } from '../App'

interface Farm {
  farmId: number
  farmLocation: string
  farmArea: number
  farmAreaUnitType: string
  cropCategoryResponseDtoList: Array<{
    cropCategoryId: number
    cropCategoryName: string
    cropVarietyResponses: Array<{
      cropVarietyId: number
      cropVarietyName: string
    }>
  }>
}

function FarmManage() {
  const [farms, setFarms] = useState<Farm[]>([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [farmToDelete, setFarmToDelete] = useState<number | null>(null)
  const navigate = useNavigate()
  const { setSelectedVarieties, setCropsCatalog, setVarietiesMap } = useAppState()

  useEffect(() => {
    // Fetch farms data from API
    fetch('/api/farms')
      .then(res => res.json())
      .then(data => setFarms(data))
      .catch(err => console.error('Failed to fetch farms:', err))
  }, [])

  const getImageSrc = (cropName: string) => {
    try {
      return new URL(`../images/${cropName}.png`, import.meta.url).href
    } catch {
      return '' // Fallback to empty string if image not found
    }
  }

  const formatArea = (area: number, unit: string) => {
    if (unit === 'M2') return `${area}㎡`
    if (unit === 'PYEONG') return `${area}평`
    if (unit === 'HECTARE') return `${area}ha`
    return `${area}`
  }

  const handleAddCrop = async (farmId: number) => {
    try {
      // 해당 농장 정보 가져오기
      const response = await fetch(`/api/farms/${farmId}`)
      const farmData = await response.json()
      
      // 작물 카탈로그와 품종 정보 가져오기
      const cropsResponse = await fetch('/api/crops')
      const cropsData = await cropsResponse.json()
      
      // 현재 농장의 작물 ID들을 selectedVarieties로 설정
      const currentVarieties: { [key: number]: number[] } = {}
      farmData.cropCategoryResponseDtoList.forEach((category: any) => {
        currentVarieties[category.cropCategoryId] = category.cropVarietyResponses.map((v: any) => v.cropVarietyId)
      })
      
      // 전역 상태 설정
      setCropsCatalog(cropsData.cropsCatalog || {})
      setVarietiesMap(cropsData.varietiesMap || {})
      setSelectedVarieties(currentVarieties)
      
      // 농장 ID를 localStorage에 저장 (나중에 PUT 요청에서 사용)
      localStorage.setItem('editingFarmId', farmId.toString())
      
      // 작물 선택 페이지로 이동
      navigate('/crops')
    } catch (error) {
      console.error('Failed to fetch farm data:', error)
    }
  }

  const handleDeleteFarm = (farmId: number) => {
    setFarmToDelete(farmId)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    if (!farmToDelete) return
    
    try {
      const response = await fetch(`/api/farms/${farmToDelete}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        // 농장 목록 다시 불러오기
        const farmsResponse = await fetch('/api/farms')
        const farmsData = await farmsResponse.json()
        setFarms(farmsData)
      } else {
        console.error('Failed to delete farm')
      }
    } catch (error) {
      console.error('Error deleting farm:', error)
    } finally {
      setShowDeleteConfirm(false)
      setFarmToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setFarmToDelete(null)
  }

  return (
    <MobileFrame>
      <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
        {/* Header */}
        <header className="px-4 pt-3 pb-2 bg-white">
          <div className="flex items-center justify-between">
            <BackButton />
            <h1 className="text-md font-medium absolute left-1/2 transform -translate-x-1/2">내 영농/농장 관리</h1>
            <div className="flex items-center gap-2">
              <button onClick={() => navigate('/')} className="w-5 h-5">
                <img src="/src/images/home.png" alt="홈" className="w-full h-full object-contain" />
              </button>
              <button className="w-5 h-5">
                <img src="/src/images/menu.png" alt="메뉴" className="w-full h-full object-contain" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-4 space-y-4">
          {/* Add Farm Button */}
          <button 
            onClick={() => navigate('/address')} 
            className="w-full h-20 bg-white border-2 border-[#4293A0] rounded-lg flex items-center px-4"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-gray-400 text-3xl">+</span>
            </div>
            <span className="text-gray-900 text-lg flex-1 text-center">농장 추가 등록하기</span>
          </button>

          {/* Instruction Text */}
          <div className=" text-center">
            <p className="text-[15px]  leading-relaxed">
              이미 있는 농장의 작물을 추가하는 경우,
            </p>            <p className="text-sm  leading-relaxed">
              아래 해당하는 농장에 있는 + 버튼을 눌러 
            </p>
            <p className="text-[15px]  leading-relaxed">
              작물을 추가해보세요.
            </p>
            <br/>
            <p className="text-[15px]  leading-relaxed">
              농장을 원하는 위치로 이동해 보세요
            </p>
            <p className="text-[15px]  leading-relaxed">
              가장 위에 있는 농장이 내 대표농장으로 설정돼요
            </p>
          </div>

          {/* Farm List */}
          <div className="space-y-3 pb-20 overflow-y-auto flex-1 px-1 py-5">
            {farms.map((farm, farmIndex) => (
              <div key={farm.farmId} className="bg-white rounded-lg p-4 shadow-[0_0_6px_rgba(0,0,0,0.08)] relative ring-2 ring-gray-100">
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteFarm(farm.farmId)}
                    className="absolute -top-2 left-0 w-5 h-5 bg-[#4293A0] text-white rounded-full flex items-center justify-center text-lg hover:bg-[#4293A0]"
                  >
                    -
                  </button>
                  
                  <div className="flex items-center gap-3">
                  {/* Farm Image */}
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                    <img 
                      src={getImageSrc(farm.cropCategoryResponseDtoList[0]?.cropCategoryName || '')}
                      alt={farm.cropCategoryResponseDtoList[0]?.cropCategoryName || ''}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const parent = target.parentElement
                        if (parent) {
                          const emojiDiv = document.createElement('div')
                          emojiDiv.className = 'w-full h-full flex items-center justify-center text-2xl bg-gray-100'
                          emojiDiv.textContent = '🌱'
                          parent.appendChild(emojiDiv)
                        }
                      }}
                    />
                  </div>

                  {/* Farm Info */}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {farm.farmLocation} 
                    </div>
                    
                    {/* Crop Chips */}
                    <div className="flex flex-wrap items-center gap-2">
                      {farm.cropCategoryResponseDtoList.flatMap(category => 
                        category.cropVarietyResponses.map(variety => (
                          <div key={variety.cropVarietyId} className="bg-[#4293A0] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            {variety.cropVarietyName}
                            <button className="text-white hover:text-gray-200">×</button>
                          </div>
                        ))
                      )}
                       
                      {/* Add Crop Button */}
                      <button 
                        onClick={() => handleAddCrop(farm.farmId)}
                        className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-300 ring-1 ring-[#4293A0]"
                      >
                        <span className="text-[#4293A0] text-sm">+</span>
                      </button>
                    </div>
                  </div>

                  {/* Reorder Buttons */}
                  <div className="flex flex-col gap-1">
                    <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600">
                      <img src="/src/images/chevron-up.png" alt="위로" className="w-4 h-4 object-contain" />
                    </button>
                    <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600">
                      <img src="/src/images/chevron-down.png" alt="아래로" className="w-4 h-4 object-contain" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-0 mx-0 w-full max-w-xs flex flex-col">
              {/* Warning Icon */}
              <div className="flex justify-center mb-6 pt-6">
                <div className="w-10 h-10 bg-white-500 rounded-full ring-2 ring-[#4293A0] flex items-center justify-center">
                  <span className="text-[#4293A0] text-xl font-bold">!</span>
                </div>
              </div>
              
              {/* Title */}
              <div className="text-center mb-3 px-6">
                <h3 className="text-lg font-bold text-red-500">삭제</h3>
              </div>
              
              {/* Question */}
              <div className="text-center mb-6 px-6">
                <p className="text-md text-gray-900">
                  내 농장 <br />
                  농장을 삭제할까요?</p>
              </div>
              
              {/* Buttons */}
              <div className="flex gap-0">
                <button
                  onClick={cancelDelete}
                  className="w-1/3 h-14 bg-gray-200 text-gray-800 rounded-bl-2xl font-medium text-base"
                >
                  취소
                </button>
                <button
                  onClick={confirmDelete}
                  className="w-2/3 h-14 bg-[#4293A0] text-white rounded-br-2xl font-medium text-base"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileFrame>
  )
}

export default FarmManage


