import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'
import BackButton from '../components/BackButton'

interface ProductDetail {
  financeId: number
  productName: string
  productFeature: string
  loanTarget: string
  loanPeriod: string
  loanLimit: string
  repaymentMethod: string
  principalRepaymentGuide: string
  overdueGuide: string
  collateralGuarantee: string
  requiredDocuments: string
  customerBurdenCosts: string
  payment: string
  precautions: string
  others: string
  complianceSupervisor: string
  loanInterestRate: string
  rateType: string
}

function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const [productDetail, setProductDetail] = useState<ProductDetail>({
    financeId: 0,
    productName: "",
    productFeature: "",
    loanTarget: "",
    loanPeriod: "",
    loanLimit: "",
    repaymentMethod: "",
    principalRepaymentGuide: "",
    overdueGuide: "",
    collateralGuarantee: "",
    requiredDocuments: "",
    customerBurdenCosts: "",
    payment: "",
    precautions: "",
    others: "",
    complianceSupervisor: "",
    loanInterestRate: "",
    rateType: ""
  })
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    productInfo: true,
    precautions: false,
    others: false
  })

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`)
        if (response.ok) {
          const data = await response.json()
          setProductDetail(data)
        } else {
          console.error('Failed to fetch product detail')
        }
      } catch (error) {
        console.error('Error fetching product detail:', error)
      } finally {
      }
    }

    if (productId) {
      fetchProductDetail()
    }
  }, [productId])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }




  return (
    <MobileFrame>
      <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
        {/* Header */}
        <header className="px-4 pt-3 pb-2 flex items-center justify-between relative bg-white">
          <BackButton />
          <h1 className="text-md font-medium absolute left-1/2 transform -translate-x-1/2">상품 상세</h1>
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
          <div className="space-y-6 ">
            {/* Title */}
            <div className='px-2'>
              <h2 className="text-xl font-bold text-[#4293A0] leading-relaxed">
                {productDetail.productName}
              </h2>
              <p className="text-sm font-medium text-gray-700 mt-2 leading-relaxed">
                {productDetail.productFeature}
              </p>
            </div>

            {/* Basic Info */}
            <div className="space-y-3 px-2">
              <div className="flex">
                <span className="w-10 text-sm font-bold text-[#4293A0]">대상</span>
                <span className="text-sm text-gray-600 flex-1">{productDetail.loanTarget}</span>
              </div>
              <div className="flex">
                <span className="w-10 text-sm font-bold text-[#4293A0]">한도</span>
                <span className="text-sm text-gray-600 flex-1">{productDetail.loanLimit}</span>
              </div>
              <div className="flex">
                <span className="w-10 text-sm font-bold text-[#4293A0]">금리</span>
                <span className="text-sm text-gray-600 flex-1">{productDetail.loanInterestRate}</span>
              </div>
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
                      <div className="space-y-2">
                        <span className="text-sm font-bold ">대출기간</span>
                        <p className="text-[13px] text-gray-700 leading-relaxed">{productDetail.loanPeriod}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-bold ">상환방법</span>
                        <p className="text-[13px] text-gray-700 leading-relaxed">{productDetail.repaymentMethod}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-bold ">원금 또는 이자상환안내</span>
                        <p className="text-[13px] text-gray-700 leading-relaxed">{productDetail.principalRepaymentGuide}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-bold ">연체이자(지연배상금)안내</span>
                        <p className="text-[13px] text-gray-700 leading-relaxed">{productDetail.overdueGuide}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-bold ">담보 및 보증이부</span>
                        <p className="text-[13px] text-gray-700 leading-relaxed">{productDetail.collateralGuarantee}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-bold ">필요서류</span>
                        <p className="text-[13px] text-gray-700 leading-relaxed">{productDetail.requiredDocuments}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-bold">고객부담비용(수수료)</span>
                        <div className="space-y-2">
                          <div className="space-y-2">
                            <span className="text-sm font-bold text-gray-600">인지세(공동)</span>
                            <p className="text-[13px] text-gray-700 leading-relaxed">{productDetail.customerBurdenCosts}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-bold ">이자납입</span>
                        <p className="text-[13px] text-gray-700 leading-relaxed">{productDetail.payment}</p>
                      </div>
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
                    <p className="text-[13px] text-gray-700 leading-relaxed">{productDetail.precautions}</p>
                  </div>
                )}
              </div>

              {/* 기타안내 */}
              <div className="bg-gray-50 rounded-lg">
                <button
                  onClick={() => toggleSection('others')}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <span className="text-base font-semibold text-gray-500">기타안내</span>
                  <img 
                    src="/src/images/chevron-down.png" 
                    alt="펼치기" 
                    className={`w-4 h-4 transform transition-transform ${expandedSections.others ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedSections.others && (
                  <div className="px-5 pb-4">
                    <p className="text-[13px] text-gray-700 leading-relaxed">{productDetail.others}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Compliance Supervisor */}
            <div className="pt-4 pb-6">
              <p className="text-xs text-gray-500 text-center">
                {productDetail.complianceSupervisor}
              </p>
            </div>
          </div>
        </main>
      </div>
    </MobileFrame>
  )
}

export default ProductDetailPage