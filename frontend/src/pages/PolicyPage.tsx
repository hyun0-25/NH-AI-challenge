import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'
import BackButton from '../components/BackButton'
import LoadingScreen from '../components/LoadingScreen'

interface PolicyProduct {
  policyId: number
  title: string
  applDate: string
}

interface PolicyResponse {
  policyRecommendList: PolicyProduct[]
  policyOtherList: PolicyProduct[]
}

function PolicyPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [policyData, setPolicyData] = useState<PolicyResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  // URL에서 farmId와 cropId 추출
  const farmId = searchParams.get('farmId')
  const cropId = searchParams.get('cropId')

  useEffect(() => {
    const fetchPolicyData = async () => {
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

      console.log('PolicyPage - farmId:', farmId, 'cropId:', cropId)
      if (!farmId || !cropId) {
        console.error('Missing farmId or cropId')
        // Fallback demo data
        const demoData = {
          policyRecommendList: [],
          policyOtherList: [
            {
              policyId: 1,
              title: "2025 농업인·농대생 생성형 AI 활용 경진대회",
              applDate: "2025-09-01 ~ 2025-09-26"
            },
            {
              policyId: 2,
              title: "[상시 접수] 2025년 우체국 쇼핑 연계 농촌융복합산업 브랜드관 하반기 입점 안내",
              applDate: "2025-06 ~ 2025-12"
            },
            {
              policyId: 3,
              title: "2025년도 콩·팥 보급종 신청 안내 [개별신청]",
              applDate: "2025-04-11 ~ 2025-12"
            },
            {
              policyId: 4,
              title: "2025년 전문상담 및 현장코칭 사업 신청안내",
              applDate: "2025-03-24 ~ 2025-11"
            },
            {
              policyId: 5,
              title: "밭작물 종자 1차 개별신청",
              applDate: "2025-02-04 ~ 2025-12-31"
            }
          ]
        }
        console.log('Setting demo data:', demoData)
        setPolicyData(demoData)
        clearInterval(progressInterval)
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/policies/${farmId}/${cropId}`)
        if (response.ok) {
          const data = await response.json()
          setPolicyData(data)
        } else {
          console.error('Failed to fetch policy data')
          // Fallback demo data
          const demoData = {
            policyRecommendList: [],
            policyOtherList: [
              {
                policyId: 1,
                title: "2025 농업인·농대생 생성형 AI 활용 경진대회",
                applDate: "2025-09-01 ~ 2025-09-26"
              },
              {
                policyId: 2,
                title: "[상시 접수] 2025년 우체국 쇼핑 연계 농촌융복합산업 브랜드관 하반기 입점 안내",
                applDate: "2025-06 ~ 2025-12"
              },
              {
                policyId: 3,
                title: "2025년도 콩·팥 보급종 신청 안내 [개별신청]",
                applDate: "2025-04-11 ~ 2025-12"
              },
              {
                policyId: 4,
                title: "2025년 전문상담 및 현장코칭 사업 신청안내",
                applDate: "2025-03-24 ~ 2025-11"
              },
              {
                policyId: 5,
                title: "밭작물 종자 1차 개별신청",
                applDate: "2025-02-04 ~ 2025-12-31"
              }
            ]
          }
          setPolicyData(demoData)
        }
      } catch (error) {
        console.error('Error fetching policy data:', error)
        // Fallback demo data
        const demoData = {
          policyRecommendList: [],
          policyOtherList: [
            {
              policyId: 1,
              title: "2025 농업인·농대생 생성형 AI 활용 경진대회",
              applDate: "2025-09-01 ~ 2025-09-26"
            },
            {
              policyId: 2,
              title: "[상시 접수] 2025년 우체국 쇼핑 연계 농촌융복합산업 브랜드관 하반기 입점 안내",
              applDate: "2025-06 ~ 2025-12"
            },
            {
              policyId: 3,
              title: "2025년도 콩·팥 보급종 신청 안내 [개별신청]",
              applDate: "2025-04-11 ~ 2025-12"
            },
            {
              policyId: 4,
              title: "2025년 전문상담 및 현장코칭 사업 신청안내",
              applDate: "2025-03-24 ~ 2025-11"
            },
            {
              policyId: 5,
              title: "밭작물 종자 1차 개별신청",
              applDate: "2025-02-04 ~ 2025-12-31"
            }
          ]
        }
        setPolicyData(demoData)
      } finally {
        clearInterval(progressInterval)
        setLoading(false)
      }
    }

    fetchPolicyData()
  }, [farmId, cropId])

  console.log('PolicyPage render - loading:', loading, 'policyData:', policyData)

  // policyData가 없으면 기본 데이터 사용
  const displayData = policyData || {
    policyRecommendList: [],
    policyOtherList: [
      {
        policyId: 1,
        title: "2025 농업인·농대생 생성형 AI 활용 경진대회",
        applDate: "2025-09-01 ~ 2025-09-26"
      },
      {
        policyId: 2,
        title: "[상시 접수] 2025년 우체국 쇼핑 연계 농촌융복합산업 브랜드관 하반기 입점 안내",
        applDate: "2025-06 ~ 2025-12"
      },
      {
        policyId: 3,
        title: "2025년도 콩·팥 보급종 신청 안내 [개별신청]",
        applDate: "2025-04-11 ~ 2025-12"
      },
      {
        policyId: 4,
        title: "2025년 전문상담 및 현장코칭 사업 신청안내",
        applDate: "2025-03-24 ~ 2025-11"
      },
      {
        policyId: 5,
        title: "밭작물 종자 1차 개별신청",
        applDate: "2025-02-04 ~ 2025-12-31"
      }
    ]
  }

  // 안전하게 배열이 존재하는지 확인
  const recommendList = displayData?.policyRecommendList || []
  const otherList = displayData?.policyOtherList || []

  if (loading) {
    return (
      <LoadingScreen
        title="정부 지원정책을 조회하고 있습니다"
        subtitle="회원님의 농장에 적용 가능한 정책을 찾아드릴게요."
        headerTitle="콕! 맞는 정부 지원정책"
        onHomeClick={() => navigate('/')}
      />
    )
  }

  return (
    <MobileFrame>
      <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
        {/* Header */}
        <header className="px-4 pt-3 pb-2 flex items-center justify-between relative">
          <BackButton />
          <h1 className="text-md font-medium absolute left-1/2 transform -translate-x-1/2">콕! 맞는 정부 지원정책</h1>
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
          <div className="px-4 py-3">
            <p className="text-[#4293A0] text-sm leading-relaxed">
              김OO님의 현재 등록된 영농 정보에 맞춰 가입할 수 있는 지원정책을 추천드려요.
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
                      key={product.policyId} 
                      className="bg-white p-4 border border-gray-100 mb-3 cursor-pointer hover:bg-gray-50"
                      onClick={() => navigate(`/policy-detail/${product.policyId}`)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-gray-900 mb-1">
                            {product.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {product.applDate}
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
              /* No Matching Policies Found */
              <div className="mb-4">
                <div className="bg-[#4293A0]/10 rounded-lg p-4 text-center">
                  {/* Illustration */}
                  <div className="flex justify-center mb-4">
                    <img 
                      src="/src/images/정보리스트_없을때.png" 
                      alt="정책 없음" 
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
                    <p className="mb-1">콕! 맞는 지원정책은 현재</p>
                    <p className="mb-2">찾을 수 없어요.</p>
                    <p className="text-[17px] text-gray-600 mt-4 mb-6 font-bold">새로운 정책이 업데이트되면 알려드릴게요.</p>
                  </div>
                  
                  {/* Button */}
                  <button className="w-full h-14 bg-[#4293A0] mb-2 text-white rounded-xl text-lg font-light">
                    정부 지원정책 알림 신청하기
                  </button>
                </div>
              </div>
            )}

            {/* Separator - only show if there are recommended products */}
            {recommendList.length > 0 && (
              <div>
                <div className="border-t border-gray-200"></div>
              </div>
            )}

            {/* Other Products Section */}
            <div className="py-3">
              <h2 className="text-base font-semibold text-gray-700 mb-3 pl-4">다른 정부 지원정책 보기</h2>
              
              <div className="space-y-3">
                {otherList.map((product) => (
                    <div 
                      key={product.policyId} 
                      className="bg-white p-4 border border-gray-100 cursor-pointer hover:bg-gray-50"
                      onClick={() => navigate(`/policy-detail/${product.policyId}`)}
                    >
                      <div className="flex items-center gap-3">
                        {/* Icon */}
                        <div className="w-9 h-9 ml-1 rounded-full flex items-center justify-center flex-shrink-0 ring-1 ring-gray-500">
                          <img 
                            src="/src/images/정책.png" 
                            alt="정책 아이콘" 
                            className="w-7 h-7 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                              const parent = target.parentElement
                              if (parent) {
                                const emojiDiv = document.createElement('div')
                                emojiDiv.className = 'text-2xl'
                                emojiDiv.textContent = '📋'
                                parent.appendChild(emojiDiv)
                              }
                            }}
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 ml-2">
                          <h3 className="text-[14px] font-bold text-gray-900 mb-1">
                            {product.title}
                          </h3>
                            <p className="text-[10px] text-gray-400 line-clamp-2">
                            신청기간: {product.applDate}
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

export default PolicyPage
