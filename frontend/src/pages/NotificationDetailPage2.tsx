import React from 'react'
import { useNavigate } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'
import BackButton from '../components/BackButton'

function NotificationDetailPage2() {
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
              [청년농업인 영농정착 지원사업 신청 안내]
            </h2>
            
            {/* 설명 */}
            <p className="text-sm mb-4 leading-relaxed text-black">
              회원님의 나이(만 35세), 농장(토마토, 75㎡, 충북 영동군) 조건에 따라 신청 가능합니다.
            </p>
            
            {/* 지원 정보 */}
            <div className="mb-3">
              <span className="text-sm font-bold text-[#4293A0]">지원</span>
              <span className="text-sm ml-2 text-gray-600 font-semibold">월 최대 110만 원 (최대 3년)</span>
            </div>
            
            {/* 신청기간 정보 */}
            <div className="mb-6">
              <span className="text-sm font-bold text-[#4293A0]">신청기간</span>
              <span className="text-sm ml-2 text-gray-600 font-semibold">2025-9-15 ~ 2025-10-15</span>
            </div>
            
            {/* 상세보기 버튼 */}
            <button 
              onClick={() => navigate('/policy-detail/1')}
              className="w-full bg-[#4293A0] text-white py-4 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              <span className="text-md font-medium">해당 공고 자세히 보기</span>
              <img src="/src/images/external-link.png" alt="외부 링크" className="w-5 h-5" />
            </button>
          </div>
        </main>
      </div>
    </MobileFrame>
  )
}

export default NotificationDetailPage2
