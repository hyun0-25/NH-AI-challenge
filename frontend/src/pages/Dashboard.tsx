import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'
import { useAppState } from '../App'

type FarmData = {
  farmId: number
  farmZipCode: string
  farmLocation: string
  farmLocationDetail: string
  farmType: string
  farmTypeOtherDescription: string | null
  farmArea: number
  farmAreaUnitType: string
  cropCategoryResponseDtoList: {
    cropCategoryId: number
    cropCategoryName: string
    cropVarietyResponses: {
      cropVarietyId: number
      cropVarietyName: string
    }[]
  }[]
}

function Dashboard() {
  const { cropsCatalog } = useAppState()
  const navigate = useNavigate()
  const [farms, setFarms] = useState<FarmData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await fetch('/api/farms')
        if (response.ok) {
          const data = await response.json()
          setFarms(data)
        } else {
          console.error('Failed to fetch farms')
        }
      } catch (error) {
        console.error('Error fetching farms:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFarms()
  }, [])

  // Get image source for crop category
  const getImageSrc = (cropCategoryName: string) => {
    return new URL(`../images/${cropCategoryName}.png`, import.meta.url).href
  }

  // Format farm area
  const formatArea = (area: number, unit: string) => {
    const unitMap = { 'M2': '㎡', 'PYEONG': '평', 'HECTARE': 'ha' }
    return `${area}${unitMap[unit as keyof typeof unitMap] || unit}`
  }

  if (loading) {
    return (
      <MobileFrame>
        <div className="w-full h-full bg-white mobile-safe-area flex items-center justify-center">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      </MobileFrame>
    )
  }

  return (
    <MobileFrame>
        <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
        {/* Header */}
        <header className="px-4 pt-3 pb-2 flex items-center justify-between relative">
          <div className="text-sm font-medium absolute left-1/2 transform -translate-x-1/2">MY 영농/농장</div>
          <div className="flex gap-4 ml-auto">
            <button className="w-6 h-6">
              <img src="/src/images/bell.png" alt="알림" className="w-full h-full object-contain" />
            </button>
            <button onClick={() => navigate('/')} className="w-6 h-6">
              <img src="/src/images/home.png" alt="홈" className="w-full h-full object-contain" />
            </button>
            <button className="w-6 h-6">
              <img src="/src/images/menu.png" alt="메뉴" className="w-full h-full object-contain" />
            </button>
          </div>
        </header>

        {/* Welcome Section */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-[20px]"><span className="font-bold">김OO님,</span> 환영합니다</h1>
            <Link to="/manage" className="text-sm font-bold underline">내 영농/농장 관리</Link>
          </div>
        </div>

          {/* Farm Cards - Horizontal Scroll */}
          <main className="px-4 flex-1 overflow-auto">
            <div 
              className="flex gap-4 overflow-x-auto pb-4 pt-6 scrollbar-hide"
              onWheel={(e) => {
                e.preventDefault()
                const container = e.currentTarget
                container.scrollLeft += e.deltaY
              }}
            >
            {farms.flatMap((farm, farmIndex) => {
              const isRepresentative = farmIndex === 0
              const allVarieties = farm.cropCategoryResponseDtoList.flatMap(category => 
                category.cropVarietyResponses.map(variety => ({
                  ...variety,
                  categoryName: category.cropCategoryName,
                  categoryId: category.cropCategoryId,
                  farmInfo: {
                    farmId: farm.farmId,
                    farmLocation: farm.farmLocation,
                    farmArea: farm.farmArea,
                    farmAreaUnitType: farm.farmAreaUnitType
                  }
                }))
              )
              
              return allVarieties.map((variety, varietyIndex) => (
                <div key={`${farm.farmId}-${variety.cropVarietyId}`} className="relative flex-shrink-0">
                  {/* Representative Badge - only on first variety of first farm */}
                  {isRepresentative && varietyIndex === 0 && (
                    <div className="absolute -top-2  z-10">
                      <div className="relative bg-black text-[#4293A0] text-[10px] px-2 py-1 rounded-t-lg rounded-r-lg rounded-br-lg rounded-bl-none">
                        대표
                      </div>
                    </div>
                  )}
                  
                  {/* Speech Bubble Card */}
                  <div className="relative bg-[#4293A0] rounded-2xl p-2 text-white w-35 h-40 flex flex-col">
                    {/* Check Icon */}
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <span className="text-[#4293A0] text-xs">✓</span>
                    </div>
                    
                    {/* Crop Image */}
                    <div className="w-12 h-12 flex items-center justify-center mb-2 mx-auto">
                      <img 
                        src={getImageSrc(variety.categoryName)}
                        alt={variety.categoryName}
                        className="w-10 h-10 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            const emojiDiv = document.createElement('div')
                            emojiDiv.className = 'text-xl'
                            emojiDiv.textContent = '🌱'
                            parent.appendChild(emojiDiv)
                          }
                        }}
                      />
                    </div>
                    
                    {/* Variety Name */}
                    <div className="text-sm font-semibold mb-1 text-center">
                      {variety.cropVarietyName}
                    </div>
                    
                    {/* Farm Info */}
                    <div className="text-xs opacity-90 mb-1 text-center">
                      {variety.farmInfo.farmLocation.split(' ').slice(0, 2).join(' ')}
                    </div>
                    <div className="text-xs opacity-90 text-center">
                      {formatArea(variety.farmInfo.farmArea, variety.farmInfo.farmAreaUnitType)}
                    </div>
                    
                    {/* Speech Bubble Tail */}
                    <div className="absolute -bottom-1 left-4 w-2 h-2 bg-[#4293A0] transform rotate-45"></div>
                  </div>
                </div>
              ))
            })}
          </div>

          {/* Recommendation Cards */}
          <div className="space-y-2 py-4">
            {[
              '내 농장에 콕! 맞는 보험상품 보러가기',
              '내 농장에 콕! 맞는 정부 지원정책 보러가기', 
              '내 농장에 콕! 맞는 NH농협 금융상품 보러가기'
            ].map(text => (
              <button key={text} className="w-full h-12 bg-white shadow-sm rounded-xl px-4 flex items-center justify-between">
                <span className="text-sm text-gray-700">{text}</span>
                <span className="text-gray-400">›</span>
              </button>
            ))}
          </div>
        </main>

        {/* AI Chatbot Section */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-center mb-3">
              <div className="flex justify-center gap-2 mb-2">
                <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center">
                  <span className="text-sm">🧅</span>
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">🥚</span>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-800 mb-1">내 농장 정보를 분석해</div>
              <div className="text-xs text-gray-600 mb-2">보험·정책·금융 상품을 맞춤 추천해드립니다.</div>
              <div className="text-xs text-gray-500">궁금한 점이 있으신가요?</div>
            </div>
            <button className="w-full h-12 bg-[#4293A0] text-white rounded-lg text-sm font-medium">
              AI 챗봇과 상담 시작하기
            </button>
          </div>
        </div>
      </div>
    </MobileFrame>
  )
}

export default Dashboard