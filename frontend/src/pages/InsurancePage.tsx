import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'
import BackButton from '../components/BackButton'
import LoadingScreen from '../components/LoadingScreen'

interface InsuranceProduct {
  insuranceId: number
  insuranceName: string
  insuranceDescription: string
  insuranceSupportInfo: string
}

interface InsuranceResponse {
  insuranceRecommendList: InsuranceProduct[]
  insuranceOtherList: InsuranceProduct[]
}

function InsurancePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [displayData, setDisplayData] = useState<InsuranceResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  const farmId = searchParams.get('farmId')
  const cropId = searchParams.get('cropId')

  useEffect(() => {
    const fetchInsuranceData = async () => {
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

      if (!farmId || !cropId) {
        console.error('Missing farmId or cropId')
        // Fallback demo data
        const demoData = {
          insuranceRecommendList: [],
          insuranceOtherList: [
            {
              insuranceId: 1,
              insuranceName: "과수작물 농작물재해보험",
              insuranceDescription: "과수의 손해에 대해 보장해 주는 보험",
              insuranceSupportInfo: "정부 지원 50% + 지차체 지원 15%~40%"
            },
            {
              insuranceId: 2,
              insuranceName: "벼·맥류 농작물재해보험",
              insuranceDescription: "벼,맥류의 수확량 감소 손해에 대해 보장해 주는 보험",
              insuranceSupportInfo: "정부 지원 35%~60% + 지차체 지원 15%~40%"
            },
            {
              insuranceId: 3,
              insuranceName: "원예시설 농작물재해보험",
              insuranceDescription: "농업용 시설물, 부대시설에 대한 피해와 시설작물의 생산비를 보장해 주는 보험",
              insuranceSupportInfo: "정부 지원 50% + 지차체 지원 15%~40%"
            },
            {
              insuranceId: 4,
              insuranceName: "밭작물 농작물재해보험",
              insuranceDescription: "밭작물의 수확량 감소 보장과 작물의 생산비를 보장해 주는 보험",
              insuranceSupportInfo: "정부 지원 50% + 지차체 지원 10%~40%"
            },
            {
              insuranceId: 5,
              insuranceName: "버섯 농작물재해보험",
              insuranceDescription: "농업용시설물, 부대시설에 대한 피해와 버섯작물의 생산비를 보장해 주는 보험",
              insuranceSupportInfo: "정부 지원 50% + 지차체 지원 15%~40%"
            }
          ]
        }
        setDisplayData(demoData)
        setLoading(false)
        clearInterval(progressInterval)
        return
      }

      try {
        const response = await fetch(`/api/insurances/${farmId}/${cropId}`)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        const data: InsuranceResponse = await response.json()
        setDisplayData(data)
      } catch (error) {
        console.error('Error fetching insurance data:', error)
        // Fallback demo data
        const demoData = {
          insuranceRecommendList: [],
          insuranceOtherList: [
            {
              insuranceId: 1,
              insuranceName: "과수작물 농작물재해보험",
              insuranceDescription: "과수의 손해에 대해 보장해 주는 보험",
              insuranceSupportInfo: "정부 지원 50% + 지차체 지원 15%~40%"
            },
            {
              insuranceId: 2,
              insuranceName: "벼·맥류 농작물재해보험",
              insuranceDescription: "벼,맥류의 수확량 감소 손해에 대해 보장해 주는 보험",
              insuranceSupportInfo: "정부 지원 35%~60% + 지차체 지원 15%~40%"
            },
            {
              insuranceId: 3,
              insuranceName: "원예시설 농작물재해보험",
              insuranceDescription: "농업용 시설물, 부대시설에 대한 피해와 시설작물의 생산비를 보장해 주는 보험",
              insuranceSupportInfo: "정부 지원 50% + 지차체 지원 15%~40%"
            },
            {
              insuranceId: 4,
              insuranceName: "밭작물 농작물재해보험",
              insuranceDescription: "밭작물의 수확량 감소 보장과 작물의 생산비를 보장해 주는 보험",
              insuranceSupportInfo: "정부 지원 50% + 지차체 지원 10%~40%"
            },
            {
              insuranceId: 5,
              insuranceName: "버섯 농작물재해보험",
              insuranceDescription: "농업용시설물, 부대시설에 대한 피해와 버섯작물의 생산비를 보장해 주는 보험",
              insuranceSupportInfo: "정부 지원 50% + 지차체 지원 15%~40%"
            }
          ]
        }
        setDisplayData(demoData)
      } finally {
        setLoading(false)
        clearInterval(progressInterval)
      }
    }

    fetchInsuranceData()
  }, [farmId, cropId])

  if (loading) {
    return <LoadingScreen progress={progress} />
  }

  if (!displayData) {
    return <div>데이터를 불러올 수 없습니다.</div>
  }

  const recommendList = displayData.insuranceRecommendList || []
  const otherList = displayData.insuranceOtherList || []

  // 이미지 매칭 함수
  const getInsuranceImage = (insuranceName: string) => {
    if (insuranceName.includes('과수작물')) {
      return '/src/images/보험_과수작물.png'
    } else if (insuranceName.includes('벼·맥류') || insuranceName.includes('벼맥류')) {
      return '/src/images/보험_벼·맥류.png'
    } else if (insuranceName.includes('원예시설')) {
      return '/src/images/보험_원예시설.png'
    } else if (insuranceName.includes('밭작물')) {
      return '/src/images/보험_밭작물.png'
    } else if (insuranceName.includes('버섯')) {
      return '/src/images/보험_버섯.png'
    } else if (insuranceName.includes('수입안정')) {
      return '/src/images/보험_수입안정.png'
    }
    return '/src/images/보험_기본.png'
  }

  return (
    <MobileFrame>
      <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
        {/* Header */}
        <header className="px-4 pt-3 pb-2 flex items-center justify-between relative">
          <BackButton />
          <h1 className="text-md font-medium absolute left-1/2 transform -translate-x-1/2">콕! 맞는 보험상품</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/')} className="w-5 h-5">
              <img src="/src/images/home.png" alt="홈" className="w-full h-full object-contain" />
            </button>
            <button className="w-5 h-5">
              <img src="/src/images/menu.png" alt="메뉴" className="w-full h-full object-contain" />
            </button>
          </div>
        </header>

        {/* Introduction Text - only show when there are recommended products */}
        {recommendList.length > 0 && (
          <div className="px-6 py-3">
            <p className="text-[#4293A0] font-bold text-[20px] leading-relaxed">
              김OO님의 농장 현황에 맞춰 가입할 수 <br/>
              있는 보험상품을 추천드려요.
            </p>
          </div>
        )}

        <main className="flex-1 overflow-y-auto scrollbar-hide">
          <div 
            className="h-full overflow-y-auto scrollbar-hide"
            onWheel={(e) => {
              e.currentTarget.scrollTop += e.deltaY
            }}
          >
            {/* Recommended Products */}
            {recommendList.length > 0 ? (
              <div className="mb-4">
                {recommendList.map((product) => (
                    <div 
                      key={product.insuranceId} 
                      className="bg-white p-4 border border-gray-100 cursor-pointer hover:bg-gray-50"
                      onClick={() => navigate(`/insurance-detail/${product.insuranceId}`)}
                    >
                      <div className="flex items-center gap-3">
                        {/* Icon */}
                        <div className="w-9 h-9 ml-1 rounded-full flex items-center justify-center flex-shrink-0 ring-1 ring-gray-500">
                          <img 
                            src={getInsuranceImage(product.insuranceName)} 
                            alt="보험 아이콘" 
                            className="w-7 h-7 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                              const parent = target.parentElement
                              if (parent) {
                                const emojiDiv = document.createElement('div')
                                emojiDiv.className = 'text-2xl'
                                emojiDiv.textContent = '🛡️'
                                parent.appendChild(emojiDiv)
                              }
                            }}
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 ml-2">
                          <h3 className="text-[14px] font-bold text-gray-900 mb-1">
                            {product.insuranceName}
                          </h3>
                          <p className="text-[10px] text-gray-400 line-clamp-2 mb-1">
                            {product.insuranceDescription}
                          </p>
                          <p className="text-[10px] text-blue-600">
                            {product.insuranceSupportInfo}
                          </p>
                        </div>
                        
                        {/* Arrow */}
                        <div className="flex items-center">
                          <img 
                            src="/src/images/chevron-right1.png" 
                            alt="화살표" 
                            className="w-4 h-4 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                              const parent = target.parentElement
                              if (parent) {
                                const textSpan = document.createElement('span')
                                textSpan.className = 'text-gray-400 text-lg'
                                textSpan.textContent = '›'
                                parent.appendChild(textSpan)
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            ) : (
              /* No Matching Insurance Found */
              <div className="mb-4">
                <div className="bg-[#4293A0]/10 rounded-lg p-4 text-center">
                  {/* Illustration */}
                  <div className="flex justify-center mb-4">
                    <img 
                      src="/src/images/정보리스트_없을때.png" 
                      alt="보험 없음" 
                      className="w-45 h-45 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const parent = target.parentElement
                        if (parent) {
                          const emojiDiv = document.createElement('div')
                          emojiDiv.className = 'w-24 h-24 flex items-center justify-center text-6xl'
                          emojiDiv.textContent = '😔'
                          parent.appendChild(emojiDiv)
                        }
                      }}
                    />
                  </div>
                  
                  {/* Text */}
                  <div className="text-[20px] font-bold mb-4">
                    <p className="mb-1">김OO님, 현재 등록된 영농 정보</p>
                    <p className="mb-1">(토마토, 충북 영동군, 만 45세)에</p>
                    <p className="mb-1">콕! 맞는 보험상품은 현재</p>
                    <p className="mb-2">찾을 수 없어요.</p>
                    <p className="text-[17px] text-gray-600 mt-4 mb-6 font-bold">새로운 보험상품이 업데이트되면 알려드릴게요.</p>
                  </div>
                  
                  {/* Button */}
                  <button className="w-full h-14 bg-[#4293A0] mb-2 text-white rounded-xl text-lg font-light">
                    보험상품 알림 신청하기
                  </button>
                </div>
              </div>
            )}

            {/* 회색 영역 */}
          <div className="mt-0 bg-gray-100 py-2 mb-3"></div>
            {/* Other Products Section */}
            <div className="py-3">
              <h2 className="text-base font-semibold text-gray-700 mb-3 pl-4">다른 보험상품 보기</h2>
              
              <div className="space-y-3">
                {otherList.map((product) => (
                    <div 
                      key={product.insuranceId} 
                      className="bg-white p-4 border border-gray-100 cursor-pointer hover:bg-gray-50"
                      onClick={() => navigate(`/insurance-detail/${product.insuranceId}`)}
                    >
                      <div className="flex items-center gap-3">
                        {/* Icon */}
                        <div className="w-9 h-9 ml-1 rounded-full flex items-center justify-center flex-shrink-0 ring-1 ring-gray-500">
                          <img 
                            src={getInsuranceImage(product.insuranceName)} 
                            alt="보험 아이콘" 
                            className="w-7 h-7 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                              const parent = target.parentElement
                              if (parent) {
                                const emojiDiv = document.createElement('div')
                                emojiDiv.className = 'text-2xl'
                                emojiDiv.textContent = '🛡️'
                                parent.appendChild(emojiDiv)
                              }
                            }}
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 ml-2">
                          <h3 className="text-[14px] font-bold text-gray-900 mb-1">
                            {product.insuranceName}
                          </h3>
                          <p className="text-[10px] text-gray-400 line-clamp-2 mb-1">
                            {product.insuranceDescription}
                          </p>
                          <p className="text-[10px] text-blue-600">
                            {product.insuranceSupportInfo}
                          </p>
                        </div>
                        
                        {/* Arrow */}
                        <div className="flex items-center">
                          <img 
                            src="/src/images/chevron-right1.png" 
                            alt="화살표" 
                            className="w-4 h-4 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                              const parent = target.parentElement
                              if (parent) {
                                const textSpan = document.createElement('span')
                                textSpan.className = 'text-gray-400 text-lg'
                                textSpan.textContent = '›'
                                parent.appendChild(textSpan)
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </MobileFrame>
  )
}

export default InsurancePage