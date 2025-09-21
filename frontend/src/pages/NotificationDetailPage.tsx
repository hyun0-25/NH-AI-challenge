import React from 'react'
import { useNavigate } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'
import BackButton from '../components/BackButton'

function NotificationDetailPage() {
  const navigate = useNavigate()

  return (
    <MobileFrame>
      <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
        {/* 헤더 */}
        <header className="px-4 pt-3 pb-2 flex items-center justify-between relative">
          <BackButton />
          <h1 className="text-md font-medium absolute left-1/2 transform -translate-x-1/2">내 영농/농장 정보 알림</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/')} className="w-5 h-5">
              <img src="/src/images/home.png" alt="홈" className="w-full h-full object-contain" />
            </button>
            <button className="w-5 h-5">
              <img src="/src/images/menu.png" alt="메뉴" className="w-full h-full object-contain" />
            </button>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 px-2 py-6">
          <div className="bg-white rounded-lg p-6 text-[#4293A0]">
            {/* 제목 */}
            <h2 className="text-lg text-[#4293A0] font-bold mb-4 leading-tight">
              [태풍 '너구리' 북상 - 재해보험 안내]
            </h2>
            
            {/* 설명 */}
            <p className="text-sm mb-4 leading-relaxed text-black">
              회원님의 농장(벼, 전남 해남군)은 태풍 피해 위험 지역에 해당합니다.
            </p>
            
            {/* 보장 정보 */}
            <div className="mb-3">
              <span className="text-sm font-bold">보장</span>
              <span className="text-sm ml-2 text-gray-600 font-semibold">태풍·침수·집중호우 등 자연재해</span>
            </div>
            
            {/* 보험료 지원 정보 */}
            <div className="mb-6">
              <span className="text-sm font-bold">보험료 지원</span>
              <span className="text-sm ml-2 text-gray-600 font-semibold">정부지원 50%, 지방자치단체 15~40%</span>
            </div>
            
            {/* 상세보기 버튼 */}
            <button 
              onClick={() => navigate('/insurance-detail/1')}
              className="w-full bg-[#4293A0] text-white py-4 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              <span className="text-md font-medium">보험 상세보기</span>
              <img src="/src/images/external-link.png" alt="외부 링크" className="w-5 h-5" />
            </button>
          </div>
        </main>
      </div>
    </MobileFrame>
  )
}

export default NotificationDetailPage
