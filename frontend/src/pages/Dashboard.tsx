import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'
import LoadingScreen from '../components/LoadingScreen'

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
  const navigate = useNavigate()
  const [farms, setFarms] = useState<FarmData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCropId, setSelectedCropId] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const fetchFarms = async () => {
      // Start progress animation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + 2
        })
      }, 50)

      try {
        const response = await fetch('/api/farms')
        if (response.ok) {
          const data = await response.json()
          setFarms(data)
          
          // 첫 번째 농장의 첫 번째 작물을 기본 선택으로 설정
          if (data.length > 0 && data[0].cropCategoryResponseDtoList.length > 0) {
            const firstFarm = data[0]
            const firstCrop = firstFarm.cropCategoryResponseDtoList[0].cropVarietyResponses[0]
            setSelectedCropId(`${firstFarm.farmId}-${firstCrop.cropVarietyId}`)
          }
        } else {
          console.error('Failed to fetch farms')
          // Fallback demo data
          const demoFarms: FarmData[] = [{
            farmId: 1,
            farmZipCode: "12345",
            farmLocation: "서울특별시 강남구",
            farmLocationDetail: "테헤란로 123",
            farmType: "ORCHARD",
            farmTypeOtherDescription: null,
            farmArea: 1000,
            farmAreaUnitType: "M2",
            cropCategoryResponseDtoList: [{
              cropCategoryId: 1,
              cropCategoryName: "두류",
              cropVarietyResponses: [
                { cropVarietyId: 1, cropVarietyName: "콩" },
                { cropVarietyId: 2, cropVarietyName: "팥" }
              ]
            }]
          }]
          setFarms(demoFarms)
          setSelectedCropId("1-1")
        }
      } catch (error) {
        console.error('Error fetching farms:', error)
        // Fallback demo data
        const demoFarms: FarmData[] = [{
          farmId: 1,
          farmZipCode: "12345",
          farmLocation: "서울특별시 강남구",
          farmLocationDetail: "테헤란로 123",
          farmType: "ORCHARD",
          farmTypeOtherDescription: null,
          farmArea: 1000,
          farmAreaUnitType: "M2",
          cropCategoryResponseDtoList: [{
            cropCategoryId: 1,
            cropCategoryName: "두류",
            cropVarietyResponses: [
              { cropVarietyId: 1, cropVarietyName: "콩" },
              { cropVarietyId: 2, cropVarietyName: "팥" }
            ]
          }]
        }]
        setFarms(demoFarms)
        setSelectedCropId("1-1")
      } finally {
        clearInterval(progressInterval)
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
      <LoadingScreen
        title="농장 정보를 불러오는 중..."
        subtitle="잠시만 기다려 주세요."
        onHomeClick={() => navigate('/')}
      />
    )
  }

  console.log('Dashboard render - farms:', farms, 'selectedCropId:', selectedCropId)

  return (
    <MobileFrame>
        <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
        {/* Header */}
        <header className="px-4 pt-3 pb-2 flex items-center justify-between relative">
          <div className="text-md font-medium absolute left-1/2 transform -translate-x-1/2">MY 영농/농장</div>
          <div className="flex gap-4 ml-auto">
            <button className="w-5 h-5">
              <img src="/src/images/bell.png" alt="알림" className="w-full h-full object-contain" />
            </button>
            <button onClick={() => navigate('/')} className="w-5 h-5">
              <img src="/src/images/home.png" alt="홈" className="w-full h-full object-contain" />
            </button>
            <button className="w-5 h-5">
              <img src="/src/images/menu.png" alt="메뉴" className="w-full h-full object-contain" />
            </button>
          </div>
        </header>

        {/* Welcome Section */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-[18px]"><span className="font-bold">김OO님,</span> 환영합니다</h1>
            <Link to="/manage" className="text-sm font-medium underline">내 영농/농장 관리</Link>
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
                    <div className="absolute -top-3  z-10">
                      <div className="relative bg-black text-[#03F0FF] text-[10px] font-light px-4 py-2 rounded-t-lg rounded-r-lg rounded-br-lg rounded-bl-none">
                        대표
                      </div>
                    </div>
                  )}
                  
                  {/* Speech Bubble Card */}
                  <button 
                    onClick={() => {
                      const cropKey = `${variety.farmInfo.farmId}-${variety.cropVarietyId}`
                      setSelectedCropId(cropKey)
                    }}
                    className={`relative rounded-2xl p-2 w-24 h-34 flex flex-col ${
                      selectedCropId === `${variety.farmInfo.farmId}-${variety.cropVarietyId}` 
                        ? 'bg-[#4293A0]' 
                        : 'bg-gray-200'
                    } text-white`}
                  >
                    {/* Check Icon - only show when selected */}
                    {selectedCropId === `${variety.farmInfo.farmId}-${variety.cropVarietyId}` && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white flex items-center justify-center">
                        <img 
                          src="/src/images/check_green.png" 
                          alt="체크" 
                          className="w-2 h-2 object-contain"
                        />
                      </div>
                    )}
                    
                    {/* Crop Image */}
                    <div className="w-11 h-11 flex items-center justify-center mb-1 mt-3 mx-auto">
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
                    <div className={`text-[12px] font-semibold mb-1 text-center ${
                      selectedCropId === `${variety.farmInfo.farmId}-${variety.cropVarietyId}` 
                        ? 'text-white' 
                        : 'text-black opacity-60'
                    }`}>
                      {variety.cropVarietyName}
                    </div>
                    
                    {/* Farm Info */}
                    <div className={`text-[10px] mb-1 text-center ${
                      selectedCropId === `${variety.farmInfo.farmId}-${variety.cropVarietyId}` 
                        ? 'text-white opacity-90' 
                        : 'text-black opacity-50'
                    }`}>
                      {variety.farmInfo.farmLocation.split(' ').slice(0, 2).join(' ')}
                    </div>
                    <div className={`text-[10px] mb-2 text-center ${
                      selectedCropId === `${variety.farmInfo.farmId}-${variety.cropVarietyId}` 
                        ? 'text-white opacity-90' 
                        : 'text-black opacity-50'
                    }`}>
                      {formatArea(variety.farmInfo.farmArea, variety.farmInfo.farmAreaUnitType)}
                    </div>
                    
                    {/* Speech Bubble Tail */}
                    <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 rotate-45 w-4 h-4 ${
                      selectedCropId === `${variety.farmInfo.farmId}-${variety.cropVarietyId}` 
                        ? 'bg-[#4293A0]' 
                        : 'bg-gray-200'
                    }`}></div>
                  </button>
                </div>
              ))
            })}
          </div>
        </main>

        {/* Recommendation Cards and AI Chatbot Section */}
        <div className="bg-gray-100">
          <div className="space-y-5 px-4 pt-5">
            <button 
              onClick={() => {
                if (selectedCropId) {
                  const [farmId, cropId] = selectedCropId.split('-')
                  navigate(`/insurance?farmId=${farmId}&cropId=${cropId}`)
                }
              }}
              className="w-full h-11 bg-white font-medium shadow-sm rounded-lg pl-5 pr-2 flex items-center justify-between"
            >
              <span className="text-sm text-gray-700">내 농장에 콕! 맞는 보험상품 보러가기</span>
              <img src="/src/images/chevron-right1.png" alt="화살표" className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                if (selectedCropId) {
                  const [farmId, cropId] = selectedCropId.split('-')
                  navigate(`/policy?farmId=${farmId}&cropId=${cropId}`)
                }
              }}
              className="w-full h-11 bg-white font-medium shadow-sm rounded-lg pl-5 pr-2 flex items-center justify-between"
            >
              <span className="text-sm text-gray-700">내 농장에 콕! 맞는 정부 지원정책 보러가기</span>
              <img src="/src/images/chevron-right1.png" alt="화살표" className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                if (selectedCropId) {
                  const [farmId, cropId] = selectedCropId.split('-')
                  navigate(`/product?farmId=${farmId}&cropId=${cropId}`)
                }
              }}
              className="w-full h-11 bg-white font-medium shadow-sm rounded-lg pl-5 pr-2 flex items-center justify-between"
            >
              <span className="text-sm text-gray-700">내 농장에 콕! 맞는 NH농협 금융상품 보러가기</span>
              <img src="/src/images/chevron-right1.png" alt="화살표" className="w-5 h-5" />
            </button>
          </div>

          {/* AI Chatbot Section */}
          <div className="px-4 pb-4 pt-6">
            <div className="bg-white rounded-lg pb-5 pt-2 pl-5 pr-5 shadow-sm">
              <div className="text-center mb-4">
                {/* Illustration */}
                <div className="flex justify-center mb-4">
                  <img 
                    src="/src/images/MY영농관리 페이지 이미지.png" 
                    alt="AI 챗봇 일러스트" 
                    className="w-32 h-24 object-contain"
                  />
                </div>
                
                {/* Text Content */}
                <div className="space-y-1 mb-3">
                  <div className="text-sm font-medium text-gray-800">내 농장 정보를 분석해</div>
                  <div className="text-xs text-gray-800">보험·정책·금융 상품을 맞춤 추천해드립니다.</div>
                </div>
                
                <div className="text-xs text-gray-800 mb-4">궁금한 점이 있으신가요?</div>
              </div>
              
              <button 
                onClick={() => {
                  if (selectedCropId) {
                    const [farmId, cropId] = selectedCropId.split('-')
                    navigate(`/chatbot?farmId=${farmId}&cropId=${cropId}`)
                  } else {
                    navigate('/chatbot?farmId=1&cropId=1') // 기본값
                  }
                }}
                className="w-full h-12 bg-[#4293A0] text-white rounded-sm text-sm font-medium"
              >
                AI 챗봇과 상담 시작하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </MobileFrame>
  )
}

export default Dashboard