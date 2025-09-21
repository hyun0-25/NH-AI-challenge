import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'
import BackButton from '../components/BackButton'
import LoadingScreen from '../components/LoadingScreen'

interface Product {
  productId: number
  productName: string
  productFeature: string
}

interface ProductResponse {
  productRecommendList: Product[]
  productOtherList: Product[]
}

function ProductPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [productData, setProductData] = useState<ProductResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  // URL에서 farmId와 cropId 추출
  const farmId = searchParams.get('farmId')
  const cropId = searchParams.get('cropId')

  useEffect(() => {
    const fetchProductData = async () => {
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

      console.log('ProductPage - farmId:', farmId, 'cropId:', cropId)
      if (!farmId || !cropId) {
        console.error('Missing farmId or cropId')
        // Fallback demo data
        const demoData = {
          productRecommendList: [],
          productOtherList: [
            {
              productId: 1,
              productName: "후계농육성자금",
              productFeature: "1. 지원자격 및 요건을 모두 갖춘 자 중에서 사업계획서와 관련서류를 제출하고 도지사, 시장 군수구청 장이 심사하는 「후계농업경영인심사위원회」 또는 「농어업ㆍ농어촌 및 식품산업 정책심의회」심사 결과 동 사업대상자로 선발된 자 2. 사업 선정연도 기준 5년이 지나지 않은 자"
            },
            {
              productId: 2,
              productName: "농업경영회생자금",
              productFeature: "일시적인 경영위기에 처한 농업용 부채가 있는 농업인·농업법인의 경영안정을 위하여 지원하는 저금리 농업정책자금"
            },
            {
              productId: 3,
              productName: "우수후계농업경영인 추가지원자금",
              productFeature: "우수한 후계농업경영인의 영농규모 확대 및 경영개선 자금을 지원함으로 유능한 미래 농업 전문 인력의 체계적 확보·유지를 목적으로 하는 농업정책자금대출"
            },
            {
              productId: 4,
              productName: "농기계 구입자금",
              productFeature: "정부지원대상 농기계를 구입 시 낮은 금리로 지원받을 수 있는 농업정책자금 상품"
            },
            {
              productId: 5,
              productName: "농촌주택개량자금",
              productFeature: "농촌의 주거환경 개선과 도시민 유입 촉진을 위하여 주택개량 및 신축에 소요되는 비용을 시중보다 저금리로 지원하는 상품"
            }
          ]
        }
        console.log('Setting demo data:', demoData)
        setProductData(demoData)
        clearInterval(progressInterval)
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/products/${farmId}/${cropId}`)
        if (response.ok) {
          const data = await response.json()
          setProductData(data)
        } else {
          console.error('Failed to fetch product data')
          // Fallback demo data
          const demoData = {
            productRecommendList: [],
            productOtherList: [
              {
                productId: 1,
                productName: "후계농육성자금",
                productFeature: "1. 지원자격 및 요건을 모두 갖춘 자 중에서 사업계획서와 관련서류를 제출하고 도지사, 시장 군수구청 장이 심사하는 「후계농업경영인심사위원회」 또는 「농어업ㆍ농어촌 및 식품산업 정책심의회」심사 결과 동 사업대상자로 선발된 자 2. 사업 선정연도 기준 5년이 지나지 않은 자"
              },
              {
                productId: 2,
                productName: "농업경영회생자금",
                productFeature: "일시적인 경영위기에 처한 농업용 부채가 있는 농업인·농업법인의 경영안정을 위하여 지원하는 저금리 농업정책자금"
              },
              {
                productId: 3,
                productName: "우수후계농업경영인 추가지원자금",
                productFeature: "우수한 후계농업경영인의 영농규모 확대 및 경영개선 자금을 지원함으로 유능한 미래 농업 전문 인력의 체계적 확보·유지를 목적으로 하는 농업정책자금대출"
              },
              {
                productId: 4,
                productName: "농기계 구입자금",
                productFeature: "정부지원대상 농기계를 구입 시 낮은 금리로 지원받을 수 있는 농업정책자금 상품"
              },
              {
                productId: 5,
                productName: "농촌주택개량자금",
                productFeature: "농촌의 주거환경 개선과 도시민 유입 촉진을 위하여 주택개량 및 신축에 소요되는 비용을 시중보다 저금리로 지원하는 상품"
              }
            ]
          }
          setProductData(demoData)
        }
      } catch (error) {
        console.error('Error fetching product data:', error)
        // Fallback demo data
        const demoData = {
          productRecommendList: [],
          productOtherList: [
            {
              productId: 1,
              productName: "후계농육성자금",
              productFeature: "1. 지원자격 및 요건을 모두 갖춘 자 중에서 사업계획서와 관련서류를 제출하고 도지사, 시장 군수구청 장이 심사하는 「후계농업경영인심사위원회」 또는 「농어업ㆍ농어촌 및 식품산업 정책심의회」심사 결과 동 사업대상자로 선발된 자 2. 사업 선정연도 기준 5년이 지나지 않은 자"
            },
            {
              productId: 2,
              productName: "농업경영회생자금",
              productFeature: "일시적인 경영위기에 처한 농업용 부채가 있는 농업인·농업법인의 경영안정을 위하여 지원하는 저금리 농업정책자금"
            },
            {
              productId: 3,
              productName: "우수후계농업경영인 추가지원자금",
              productFeature: "우수한 후계농업경영인의 영농규모 확대 및 경영개선 자금을 지원함으로 유능한 미래 농업 전문 인력의 체계적 확보·유지를 목적으로 하는 농업정책자금대출"
            },
            {
              productId: 4,
              productName: "농기계 구입자금",
              productFeature: "정부지원대상 농기계를 구입 시 낮은 금리로 지원받을 수 있는 농업정책자금 상품"
            },
            {
              productId: 5,
              productName: "농촌주택개량자금",
              productFeature: "농촌의 주거환경 개선과 도시민 유입 촉진을 위하여 주택개량 및 신축에 소요되는 비용을 시중보다 저금리로 지원하는 상품"
            }
          ]
        }
        setProductData(demoData)
      } finally {
        clearInterval(progressInterval)
        setLoading(false)
      }
    }

    fetchProductData()
  }, [farmId, cropId])

  console.log('ProductPage render - loading:', loading, 'productData:', productData)

  // productData가 없으면 기본 데이터 사용
  const displayData = productData || {
    productRecommendList: [],
    productOtherList: [
      {
        productId: 1,
        productName: "후계농육성자금",
        productFeature: "1. 지원자격 및 요건을 모두 갖춘 자 중에서 사업계획서와 관련서류를 제출하고 도지사, 시장 군수구청 장이 심사하는 「후계농업경영인심사위원회」 또는 「농어업ㆍ농어촌 및 식품산업 정책심의회」심사 결과 동 사업대상자로 선발된 자 2. 사업 선정연도 기준 5년이 지나지 않은 자"
      },
      {
        productId: 2,
        productName: "농업경영회생자금",
        productFeature: "일시적인 경영위기에 처한 농업용 부채가 있는 농업인·농업법인의 경영안정을 위하여 지원하는 저금리 농업정책자금"
      },
      {
        productId: 3,
        productName: "우수후계농업경영인 추가지원자금",
        productFeature: "우수한 후계농업경영인의 영농규모 확대 및 경영개선 자금을 지원함으로 유능한 미래 농업 전문 인력의 체계적 확보·유지를 목적으로 하는 농업정책자금대출"
      },
      {
        productId: 4,
        productName: "농기계 구입자금",
        productFeature: "정부지원대상 농기계를 구입 시 낮은 금리로 지원받을 수 있는 농업정책자금 상품"
      },
      {
        productId: 5,
        productName: "농촌주택개량자금",
        productFeature: "농촌의 주거환경 개선과 도시민 유입 촉진을 위하여 주택개량 및 신축에 소요되는 비용을 시중보다 저금리로 지원하는 상품"
      }
    ]
  }

  // 안전하게 배열이 존재하는지 확인
  const recommendList = displayData?.productRecommendList || []
  const otherList = displayData?.productOtherList || []

  if (loading) {
    return (
      <LoadingScreen
        title="금융상품 정보를 불러오는 중..."
        subtitle="잠시만 기다려 주세요."
        headerTitle="콕! 맞는 NH농협 금융상품"
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
          <h1 className="text-md font-medium absolute left-1/2 transform -translate-x-1/2">콕! 맞는 NH농협 금융상품</h1>
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
              김OO님의 현재 등록된 영농 정보에 맞춰 가입할 수 있는 금융상품을 추천드려요.
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
                      key={product.productId} 
                      className="bg-white p-4 border border-gray-100 mb-3 cursor-pointer hover:bg-gray-50"
                      onClick={() => navigate(`/product-detail/${product.productId}`)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-gray-900 mb-1">
                            {product.productName}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {product.productFeature}
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
              /* No Matching Products Found */
              <div className="mb-4">
                <div className="bg-[#4293A0]/10 rounded-lg p-4 text-center">
                  {/* Illustration */}
                  <div className="flex justify-center mb-4">
                    <img 
                      src="/src/images/정보리스트_없을때.png" 
                      alt="금융상품 없음" 
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
                    <p className="mb-1">콕! 맞는 금융상품은 현재</p>
                    <p className="mb-2">찾을 수 없어요.</p>
                    <p className="text-[17px] text-gray-600 mt-4 mb-6 font-bold">새로운 금융상품이 업데이트되면 알려드릴게요.</p>
                  </div>
                  
                  {/* Button */}
                  <button className="w-full h-14 bg-[#4293A0] mb-2 text-white rounded-xl text-lg font-light">
                    금융상품 알림 신청하기
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
              <h2 className="text-base font-semibold text-gray-700 mb-3 pl-4">다른 금융상품 보기</h2>
              
              <div className="space-y-3">
                {otherList.map((product) => (
                    <div 
                      key={product.productId} 
                      className="bg-white p-4 border border-gray-100 cursor-pointer hover:bg-gray-50"
                      onClick={() => navigate(`/product-detail/${product.productId}`)}
                    >
                      <div className="flex items-center gap-3">
                        {/* Icon */}
                        
                        
                        {/* Content */}
                        <div className="flex-1 ml-2">
                          <h3 className="text-[15px] font-bold text-gray-900 mb-1">
                            {product.productName}
                          </h3>
                            <p className="text-[12px] text-gray-400 line-clamp-2">
                            {product.productFeature}
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

export default ProductPage
