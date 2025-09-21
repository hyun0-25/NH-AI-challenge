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
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null)
  const [loading, setLoading] = useState(true)
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
          // Fallback demo data
          const demoData: ProductDetail = {
            financeId: 1,
            productName: "후계농육성자금",
            productFeature: "1. 지원자격 및 요건을 모두 갖춘 자 중에서 사업계획서와 관련서류를 제출하고 도지사, 시장 군수구청 장이 심사하는 「후계농업경영인심사위원회」 또는 「농어업ㆍ농어촌 및 식품산업 정책심의회」심사 결과 동 사업대상자로 선발된 자 2. 사업 선정연도 기준 5년이 지나지 않은 자",
            loanTarget: "원금균등할부상환 : 25년이내 (5년 거치 20년 원금균등분할상환) ※ 거치기간은 최대 5년 이내에서 선택가능하며, 원금 상환기간은 20년 초과할 수 없음",
            loanPeriod: "원금균등할부상환 : 25년이내 (5년 거치 20년 원금균등분할상환) 거치기간은 최대 5년 이내에서 선택가능하며, 원금 상환기간은 20년 초과할 수 없음",
            loanLimit: "최대 5억원 이내 개인의 신용, 담보, 상환능력 및 부채현황 등에 따라 은행 신용평가시스템에서 산출한 한도로 차등 적용합니다. 최소 대출신청 가능금액은 100만원 이상 대출 신청 가능합니다.(10만원 단위)",
            repaymentMethod: "원금균등할부상환",
            principalRepaymentGuide: "거치기간 동안 이자를 매1년마다 후취납부하고, 거치기간 종료 후 대출원금을 분할 상환기간연수만큼 균등하게 분할하고 이자를 더하여 매1년 단위로 후취납부",
            overdueGuide: "이자, 분할상환금, 분할상환원리금을 기일 내 상환하지 않은 경우 상환하여야 할 금액에 대하여 그 다음 날부터 지연배상금이 부과됩니다. 대출기간 만료일에 채무를 이행하지 않거나, 은행여신거래기본약관에 의하여 기한의 이익을 상실한 때에는 그 다음 날부터 대출금잔액에 대하여 지연배상금을 지급하여야 합니다. 지연배상금률은 연체기간에 관계없이 연체일수×(정부이차보전기준금리*+3%)÷365(윤년은 366)로 적용하되, 지연배상금률이 연 15%를 초과하는 경우에는 연 15%를 적용합니다. 농림축산식품부의 '농림사업정책자금 이차보전규정'에서 정한 가장 많이 대출된 자금의 담보대출금 잔액가중평균금리를 적용함",
            collateralGuarantee: "부동산, 보증서",
            requiredDocuments: "영업점에서 심사 후 자금용도와 담보에 따라 개별 안내 예정",
            customerBurdenCosts: "인지세 대출금액이 5천만원 이하인 경우 : 비과세 인지세는 대출거래 계약 체결 시 대출금액에 따라 납부하는 세금으로 7만원(대출금액 5천만원 초과) 또는 15만원(대출금액 1억 초과)이 발생하며, 이 중 고객은 50%를 부담합니다. 고객부담 인지세(5천만원 이하: 비과세, 5천만원초과~1억원이하: 35,000원, 1억원초과 10억원 이하: 75,000원)",
            payment: "대출 신규 시 원하는 날짜로 이체일자를 지정하여, 매년 납입합니다. 직전 이자납입일(또는 신규일)부터 이자납입일 전일까지의 대출잔액에 대출금리를 곱하여 이자를 계산합니다. 자세한 사항은 상품설명서 및 대출거래 약정서를 참고하시기 바랍니다. 대출 이자는 매월 이자납입일(휴일이면 다음 영업일)에 자동이체 계좌에서 자동 출금됩니다. 지급가능금액이 부족한 경우, 연체 이자가 발생할 수 있으므로 상환자금을 해당일 중 입금하시거나 휴일에도 인터넷/스마트뱅킹에서 직접 상환할 수 있습니다.",
            precautions: "대출신청인이 신용관리대상자(신용회복지원 또는 배드뱅크 포함)이거나 금융기관의 신용평가 결과 등에 따라 대출이 일부 제한될 수 있으며, 대출한도는 신청인의 소득, 부채, 신용도 등에 따라 달라질 수 있습니다. 정부정책, 금융시장 환경변화 및 신청인의 신용평가 결과 등에 따라 대출자격, 대출한도, 대출금리 등 대출 조건이변 경될 수 있습니다. 상환능력에 비해 대출금액이 과도할 경우 개인신용평점이 하락할 수 있으며, 개인신용평점 하락으로 금융거래와 관련된불 이익이 발생할 수 있습니다. 일정 기간 납부해야 할 원리금이 연체될 경우 대출 기한이 도래하기 전에 모든 원리금을 변제해야 할 의무가 발생할수 있습니다. 계약기간 중 대출금을 상환하시는 경우 중도상환해약금이 면제되나, 대출금액에 따른 인지대 등 부대비용이 발생할 수 있습니다. 이자납입 지연 시 정부이차보전기준금리*+연3%p의 연체이자율이 적용되며, 농협은행 최고 연15%, 농·축협 최고 연18%의 연체이자가 발생됩니다. (연체이자율 변동주기 : 매년1월1일, 7월1일 해당일에 변동) 정부이차보전기준금리 : 이차보전 대상기간 중 가장 많이 대출된 자금의 담보대출금 잔액가중평균금리로 산정 금융상품을 가입하시기 전에 상품설명서 및 약관을 반드시 읽어보시고 기타 자세한 내용은 가까운 NH농협은행 및 농축협 영업점 또는 고객행복센터(1661-3000, 1522-3000)로 문의하시기 바랍니다.",
            others: "거절사유 금융기관 연체대출금 보유자, 신용도판단정보등록 고객 등 해당사유에 해당하는 경우 은행 내부심사 기준에 의하여 대출신청이 불가능합니다. 금융사기 등 신고 등록 계좌 보유 고객이나 대출한도 연결계좌에 입금 또는 지급정지 등록 등 거래제한 사유에 해당하는 경우에는 신청이 불가능합니다. 대출상품에 대한 내용은 변경될 수 있으며, 변경된 내용이 NH농협은행 인터넷뱅킹 상에 즉시 반영되지 않을 수 있습니다.",
            complianceSupervisor: "2025-3502 (심의일 : 2025.06.19.) 유효기간 : 2025.06.19. ~ 2026.06.19.",
            loanInterestRate: "고정금리 : 1.5% 변동금리 : 대출시점에서 금융기관이 고시하는 금리 적용(매 6개월마다 변경) 정부에서 정한 사업시행지침에따라 금리는 변경될 수 있습니다.",
            rateType: "고정+변동"
          }
          setProductDetail(demoData)
        }
      } catch (error) {
        console.error('Error fetching product detail:', error)
        // Fallback demo data
        const demoData: ProductDetail = {
          financeId: 1,
          productName: "후계농육성자금",
          productFeature: "1. 지원자격 및 요건을 모두 갖춘 자 중에서 사업계획서와 관련서류를 제출하고 도지사, 시장 군수구청 장이 심사하는 「후계농업경영인심사위원회」 또는 「농어업ㆍ농어촌 및 식품산업 정책심의회」심사 결과 동 사업대상자로 선발된 자 2. 사업 선정연도 기준 5년이 지나지 않은 자",
          loanTarget: "원금균등할부상환 : 25년이내 (5년 거치 20년 원금균등분할상환) ※ 거치기간은 최대 5년 이내에서 선택가능하며, 원금 상환기간은 20년 초과할 수 없음",
          loanPeriod: "원금균등할부상환 : 25년이내 (5년 거치 20년 원금균등분할상환) 거치기간은 최대 5년 이내에서 선택가능하며, 원금 상환기간은 20년 초과할 수 없음",
          loanLimit: "최대 5억원 이내 개인의 신용, 담보, 상환능력 및 부채현황 등에 따라 은행 신용평가시스템에서 산출한 한도로 차등 적용합니다. 최소 대출신청 가능금액은 100만원 이상 대출 신청 가능합니다.(10만원 단위)",
          repaymentMethod: "원금균등할부상환",
          principalRepaymentGuide: "거치기간 동안 이자를 매1년마다 후취납부하고, 거치기간 종료 후 대출원금을 분할 상환기간연수만큼 균등하게 분할하고 이자를 더하여 매1년 단위로 후취납부",
          overdueGuide: "이자, 분할상환금, 분할상환원리금을 기일 내 상환하지 않은 경우 상환하여야 할 금액에 대하여 그 다음 날부터 지연배상금이 부과됩니다. 대출기간 만료일에 채무를 이행하지 않거나, 은행여신거래기본약관에 의하여 기한의 이익을 상실한 때에는 그 다음 날부터 대출금잔액에 대하여 지연배상금을 지급하여야 합니다. 지연배상금률은 연체기간에 관계없이 연체일수×(정부이차보전기준금리*+3%)÷365(윤년은 366)로 적용하되, 지연배상금률이 연 15%를 초과하는 경우에는 연 15%를 적용합니다. 농림축산식품부의 '농림사업정책자금 이차보전규정'에서 정한 가장 많이 대출된 자금의 담보대출금 잔액가중평균금리를 적용함",
          collateralGuarantee: "부동산, 보증서",
          requiredDocuments: "영업점에서 심사 후 자금용도와 담보에 따라 개별 안내 예정",
          customerBurdenCosts: "인지세 대출금액이 5천만원 이하인 경우 : 비과세 인지세는 대출거래 계약 체결 시 대출금액에 따라 납부하는 세금으로 7만원(대출금액 5천만원 초과) 또는 15만원(대출금액 1억 초과)이 발생하며, 이 중 고객은 50%를 부담합니다. 고객부담 인지세(5천만원 이하: 비과세, 5천만원초과~1억원이하: 35,000원, 1억원초과 10억원 이하: 75,000원)",
          payment: "대출 신규 시 원하는 날짜로 이체일자를 지정하여, 매년 납입합니다. 직전 이자납입일(또는 신규일)부터 이자납입일 전일까지의 대출잔액에 대출금리를 곱하여 이자를 계산합니다. 자세한 사항은 상품설명서 및 대출거래 약정서를 참고하시기 바랍니다. 대출 이자는 매월 이자납입일(휴일이면 다음 영업일)에 자동이체 계좌에서 자동 출금됩니다. 지급가능금액이 부족한 경우, 연체 이자가 발생할 수 있으므로 상환자금을 해당일 중 입금하시거나 휴일에도 인터넷/스마트뱅킹에서 직접 상환할 수 있습니다.",
          precautions: "대출신청인이 신용관리대상자(신용회복지원 또는 배드뱅크 포함)이거나 금융기관의 신용평가 결과 등에 따라 대출이 일부 제한될 수 있으며, 대출한도는 신청인의 소득, 부채, 신용도 등에 따라 달라질 수 있습니다. 정부정책, 금융시장 환경변화 및 신청인의 신용평가 결과 등에 따라 대출자격, 대출한도, 대출금리 등 대출 조건이변 경될 수 있습니다. 상환능력에 비해 대출금액이 과도할 경우 개인신용평점이 하락할 수 있으며, 개인신용평점 하락으로 금융거래와 관련된불 이익이 발생할 수 있습니다. 일정 기간 납부해야 할 원리금이 연체될 경우 대출 기한이 도래하기 전에 모든 원리금을 변제해야 할 의무가 발생할수 있습니다. 계약기간 중 대출금을 상환하시는 경우 중도상환해약금이 면제되나, 대출금액에 따른 인지대 등 부대비용이 발생할 수 있습니다. 이자납입 지연 시 정부이차보전기준금리*+연3%p의 연체이자율이 적용되며, 농협은행 최고 연15%, 농·축협 최고 연18%의 연체이자가 발생됩니다. (연체이자율 변동주기 : 매년1월1일, 7월1일 해당일에 변동) 정부이차보전기준금리 : 이차보전 대상기간 중 가장 많이 대출된 자금의 담보대출금 잔액가중평균금리로 산정 금융상품을 가입하시기 전에 상품설명서 및 약관을 반드시 읽어보시고 기타 자세한 내용은 가까운 NH농협은행 및 농축협 영업점 또는 고객행복센터(1661-3000, 1522-3000)로 문의하시기 바랍니다.",
          others: "거절사유 금융기관 연체대출금 보유자, 신용도판단정보등록 고객 등 해당사유에 해당하는 경우 은행 내부심사 기준에 의하여 대출신청이 불가능합니다. 금융사기 등 신고 등록 계좌 보유 고객이나 대출한도 연결계좌에 입금 또는 지급정지 등록 등 거래제한 사유에 해당하는 경우에는 신청이 불가능합니다. 대출상품에 대한 내용은 변경될 수 있으며, 변경된 내용이 NH농협은행 인터넷뱅킹 상에 즉시 반영되지 않을 수 있습니다.",
          complianceSupervisor: "2025-3502 (심의일 : 2025.06.19.) 유효기간 : 2025.06.19. ~ 2026.06.19.",
          loanInterestRate: "고정금리 : 1.5% 변동금리 : 대출시점에서 금융기관이 고시하는 금리 적용(매 6개월마다 변경) 정부에서 정한 사업시행지침에따라 금리는 변경될 수 있습니다.",
          rateType: "고정+변동"
        }
        setProductDetail(demoData)
      } finally {
        setLoading(false)
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

  if (loading) {
    return (
      <MobileFrame>
        <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
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
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">로딩 중...</p>
            </div>
          </main>
        </div>
      </MobileFrame>
    )
  }

  if (!productDetail) {
    return (
      <MobileFrame>
        <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
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
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">상품 정보를 찾을 수 없습니다.</p>
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