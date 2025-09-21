import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'
import BackButton from '../components/BackButton'

interface PolicyDetail {
  policyId: number
  title: string
  contents: string
  eduTarget: string
  applDate: string
  area: string
  chargeAgency: string
  chargeDept: string | null
  chargeTel: string | null
  infoUrl: string
  totQuantity: string
  price: string
}

function PolicyDetailPage() {
  const { policyId } = useParams<{ policyId: string }>()
  const navigate = useNavigate()
  const [policyDetail, setPolicyDetail] = useState<PolicyDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPolicyDetail = async () => {
      try {
        const response = await fetch(`/api/policies/${policyId}`)
        if (response.ok) {
          const data = await response.json()
          setPolicyDetail(data)
        } else {
          console.error('Failed to fetch policy detail')
        }
      } catch (error) {
        console.error('Error fetching policy detail:', error)
      } finally {
        setLoading(false)
      }
    }

    if (policyId) {
      fetchPolicyDetail()
    }
  }, [policyId])

  if (loading) {
    return (
      <MobileFrame>
        <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
          <header className="px-4 pt-3 pb-2 flex items-center justify-between relative bg-white">
            <BackButton />
            <h1 className="text-md font-medium absolute left-1/2 transform -translate-x-1/2">정책 상세</h1>
            <div className="flex items-center gap-2">
              <button onClick={() => navigate('/')} className="w-5 h-5">
                <img src="/src/images/home.png" alt="홈" className="w-full h-full object-contain" />
              </button>
              <button className="w-5 h-5">
                <img src="/src/images/menu.png" alt="메뉴" className="w-full h-full object-contain" />
              </button>
            </div>
          </header>
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">로딩 중...</p>
            </div>
          </main>
        </div>
      </MobileFrame>
    )
  }

  if (!policyDetail) {
    return (
      <MobileFrame>
        <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
          <header className="px-4 pt-3 pb-2 flex items-center justify-between relative bg-white">
            <BackButton />
            <h1 className="text-md font-medium absolute left-1/2 transform -translate-x-1/2">정책 상세</h1>
            <div className="flex items-center gap-2">
              <button onClick={() => navigate('/')} className="w-5 h-5">
                <img src="/src/images/home.png" alt="홈" className="w-full h-full object-contain" />
              </button>
              <button className="w-5 h-5">
                <img src="/src/images/menu.png" alt="메뉴" className="w-full h-full object-contain" />
              </button>
            </div>
          </header>
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">정책 정보를 찾을 수 없습니다.</p>
            </div>
          </main>
        </div>
      </MobileFrame>
    )
  }

  return (
    <MobileFrame>
      <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
        {/* Header */}
        <header className="px-4 pt-3 pb-2 flex items-center justify-between relative bg-white">
          <BackButton />
          <h1 className="text-md font-medium absolute left-1/2 transform -translate-x-1/2">정책 상세</h1>
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
          <div className="space-y-8 space-x-1 pr-1">
            {/* Title */}
            <div>
              <h2 className="text-lg font-bold text-[#4293A0] leading-relaxed">
                {policyDetail.title}
              </h2>
            </div>

            {/* Policy Info */}
            <div className="space-y-4">
              <div className="flex">
                <span className="w-20 text-sm font-bold text-[#4293A0] ">신청기간</span>
                <span className="text-sm text-gray-600 font-semibold ">{policyDetail.applDate}</span>
              </div>
              
              
              <div className="flex">
                <span className="w-20 text-sm font-bold text-[#4293A0]">교육대상</span>
                <span className="text-sm text-gray-600 font-semibold">{policyDetail.eduTarget}</span>
              </div>
              
              <div className="flex">
                <span className="w-20 text-sm font-bold text-[#4293A0]">주관기관</span>
                <span className="text-sm text-gray-600 font-semibold">전문인력 양성기관</span>
              </div>
              
              <div className="flex">
                <span className="w-20 text-sm font-bold text-[#4293A0]">담당부서</span>
                <span className="text-sm text-gray-600 font-semibold flex-1">
                  {policyDetail.chargeAgency}
                  {policyDetail.chargeTel && (
                    <span className="text-gray-600"> ({policyDetail.chargeTel})</span>
                  )}
                </span>
              </div>
            </div>

            {/* Contents */}
            <div className="flex">
              <span className="w-20 text-sm font-bold text-[#4293A0]">요약내용</span>
              <span className="text-sm text-gray-600 font-semibold flex-1 whitespace-pre-line">
                {policyDetail.contents}
              </span>
            </div>

            {/* Info URL */}
            {policyDetail.infoUrl && (
              <div className="pt-1 pb-5">
                <a 
                  href={policyDetail.infoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#4293A0] text-white px-4 py-3 rounded-lg text-lg font-medium hover:bg-[#3a7a8a] transition-colors w-full justify-center"
                >
                  해당 공고 자세히 보기
                  <svg className="w-6 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </main>
      </div>
    </MobileFrame>
  )
}

export default PolicyDetailPage
