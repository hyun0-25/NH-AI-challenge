import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'
import BackButton from '../components/BackButton'
import LoadingScreen from '../components/LoadingScreen'

interface InsuranceDetail {
  insuranceId: number
  insuranceName: string
  insuranceSubName: string
  insuranceVariety: string
  insuranceDescription: string
  insuranceSupportInfo: string
  insuranceConditionType: string
  insuranceCoverage: string
  insuranceDisaster: string
  insurancePurpose: string
  insuranceStartDate: string
  insuranceEndDate: string
  insurancePaymentReason: string
}

function InsuranceDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [insuranceDetail, setInsuranceDetail] = useState<InsuranceDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [expandedSections, setExpandedSections] = useState({
    productInfo: true, // 상품안내는 기본적으로 펼쳐진 상태
    precautions: false // 유의사항은 기본적으로 접힌 상태
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  useEffect(() => {
    const fetchInsuranceDetail = async () => {
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

      if (!id) {
        console.error('Missing insurance ID')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/insurances/${id}`)
        if (response.ok) {
          const data = await response.json()
          setInsuranceDetail(data)
        } else {
          console.error('Failed to fetch insurance detail')
          setInsuranceDetail(null)
        }
      } catch (error) {
        console.error('Error fetching insurance detail:', error)
        setInsuranceDetail(null)
      } finally {
        clearInterval(progressInterval)
        setLoading(false)
      }
    }

    fetchInsuranceDetail()
  }, [id])

  // null이거나 빈 문자열인 필드는 표시하지 않음
  const shouldShowField = (value: string | null | undefined) => {
    return value && value.trim() !== ''
  }

  if (loading) {
    return (
      <LoadingScreen
        title="보험상품 상세정보를 가져오고 있습니다"
        subtitle="자연재해 보험에 대한 자세한 내용을 확인해드릴게요."
        headerTitle="보험상품 상세"
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
          <h1 className="text-md font-medium absolute left-1/2 transform -translate-x-1/2">보험상품 상세</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/')} className="w-5 h-5">
              <img src="/src/images/home.png" alt="홈" className="w-full h-full object-contain" />
            </button>
            <button className="w-5 h-5">
              <img src="/src/images/menu.png" alt="메뉴" className="w-full h-full object-contain" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main 
          className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide"
          onWheel={(e) => {
            e.currentTarget.scrollTop += e.deltaY
          }}
        >
          <div className="space-y-6">
            {/* Title */}
            <div className='px-2'>
              <h2 className="text-lg font-bold text-[#4293A0] leading-relaxed">
                {insuranceDetail.insuranceName}
              </h2>
              {shouldShowField(insuranceDetail.insuranceSubName) && (
                <p className="text-sm font-medium text-gray-700 mt-2 leading-relaxed">
                  {insuranceDetail.insuranceSubName}
                </p>
              )}
            </div>

            {/* Basic Info */}
            <div className="space-y-3 px-2">
              {shouldShowField(insuranceDetail.insuranceVariety) && (
                <div className="flex">
                  <span className="w-10 text-sm font-bold text-[#4293A0]">대상</span>
                  <span className="text-sm text-gray-600 flex-1">{insuranceDetail.insuranceVariety}</span>
                </div>
              )}
              {shouldShowField(insuranceDetail.insuranceSupportInfo) && (
                <div className="flex">
                  <span className="w-20 text-sm font-bold text-[#4293A0]">보험료 지원</span>
                  <span className="text-sm text-gray-600 flex-1">{insuranceDetail.insuranceSupportInfo}</span>
                </div>
              )}
              {shouldShowField(insuranceDetail.insuranceCoverage) && (
                <div className="flex">
                  <span className="w-10 text-sm font-bold text-[#4293A0]">보장</span>
                  <span className="text-sm text-gray-600 flex-1">{insuranceDetail.insuranceCoverage}</span>
                </div>
              )}
              {shouldShowField(insuranceDetail.insuranceDisaster) && (
                <div className="flex">
                  <span className="w-10 text-sm font-bold text-[#4293A0]">재해</span>
                  <span className="text-sm text-gray-600 flex-1">{insuranceDetail.insuranceDisaster}</span>
                </div>
              )}
            </div>

            {/* Expandable Sections */}
            <div className="space-y-4">
              {/* 상품안내 */}
              <div className="bg-gray-50 rounded-lg">
                <button
                  onClick={() => toggleSection('productInfo')}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <span className="text-base font-bold text-gray-500">상품안내</span>
                  <img 
                    src="/src/images/chevron-down.png" 
                    alt="펼치기" 
                    className={`w-4 h-4 transform transition-transform ${expandedSections.productInfo ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedSections.productInfo && (
                  <div className="px-5 pb-4 space-y-4">
                    {shouldShowField(insuranceDetail.insurancePurpose) && (
                      <div className="space-y-2">
                        <span className="text-sm font-bold">보험 목적</span>
                        <p className="text-[13px] text-gray-700 leading-relaxed">{insuranceDetail.insurancePurpose}</p>
                      </div>
                    )}
                    
                    {shouldShowField(insuranceDetail.insuranceConditionType) && (
                      <div className="space-y-2">
                        <span className="text-sm font-bold">약관 구분</span>
                        <p className="text-[13px] text-gray-700 leading-relaxed">{insuranceDetail.insuranceConditionType}</p>
                      </div>
                    )}

                    {(shouldShowField(insuranceDetail.insuranceStartDate) || shouldShowField(insuranceDetail.insuranceEndDate)) && (
                      <div className="space-y-2">
                        <span className="text-sm font-bold">보험 기간</span>
                        <div className="space-y-1">
                          {shouldShowField(insuranceDetail.insuranceStartDate) && (
                            <div>
                              <span className="text-sm font-bold text-gray-600">시작일</span>
                              <p className="text-[13px] text-gray-700 leading-relaxed">{insuranceDetail.insuranceStartDate.replace(/\n/g, ' ')}</p>
                            </div>
                          )}
                          {shouldShowField(insuranceDetail.insuranceEndDate) && (
                            <div>
                              <span className="text-sm font-bold text-gray-600">종료일</span>
                              <p className="text-[13px] text-gray-700 leading-relaxed">{insuranceDetail.insuranceEndDate.replace(/\n/g, ' ')}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {shouldShowField(insuranceDetail.insurancePaymentReason) && (
                      <div className="space-y-2">
                        <span className="text-sm font-bold">보험금 지급 사유</span>
                        <p className="text-[13px] text-gray-700 leading-relaxed">{insuranceDetail.insurancePaymentReason}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 유의사항 */}
              <div className="bg-gray-50 rounded-lg">
                <button
                  onClick={() => toggleSection('precautions')}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <span className="text-base font-semibold text-gray-500">유의사항</span>
                  <img 
                    src="/src/images/chevron-down.png" 
                    alt="펼치기" 
                    className={`w-4 h-4 transform transition-transform ${expandedSections.precautions ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedSections.precautions && (
                  <div className="px-5 pb-4">
                    <p className="text-[13px] text-gray-700 leading-relaxed">
                      • 보험 가입 전 상세 약관을 확인하시기 바랍니다.<br/>
                      • 보험료는 농작물의 종류, 재배면적, 지역에 따라 달라질 수 있습니다.<br/>
                      • 자연재해 발생 시 신속한 신고가 필요합니다.<br/>
                      • 보험금 지급은 손해조사 후 결정됩니다.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </MobileFrame>
  )
}

export default InsuranceDetailPage
