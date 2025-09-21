import React from 'react'
import { useNavigate } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'

function FarmEditComplete() {
  const navigate = useNavigate()

  return (
    <MobileFrame>
      <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
        {/* Header */}
        <div className="flex justify-end items-center px-4 pt-3 pb-2">
          <div className="flex gap-4">
            <button onClick={() => navigate('/')} className="w-5 h-5">
              <img src="/src/images/home.png" alt="홈" className="w-full h-full object-contain" />
            </button>
            <button className="w-5 h-5">
              <img src="/src/images/menu.png" alt="메뉴" className="w-full h-full object-contain" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-md font-medium mb-6 mt-6">
            <span className="text-gray-900">작물/농장 정보 수정 </span>
            <span className="text-[#4293A0]">완료</span>
          </h1>
          
          <div className="text-[16px] text-gray-500 leading-relaxed mb-8">
            작물/농장 정보 수정이 완료되었어요!<br />
            이제부터 내 작물/농장에 맞는<br />
            재해 보험, 지원 정책, 금융 상품을<br />
            추천받아보세요.
          </div>

          {/* Illustration */}
          <div className="relative w-80 h-80 flex items-center justify-center">
            <img 
              src={new URL('../images/정보입력 완료 화면 이미지.png', import.meta.url).href}
              alt="정보수정 완료"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="px-6 pb-12 space-y-3">
          <button 
            onClick={() => navigate('/address')}
            className="w-full h-14 bg-[#4293A0]/10 rounded-lg font-medium"
          >
            내 농장 추가 등록하기
          </button>
          <button 
            onClick={() => navigate('/manage')}
            className="w-full h-14 bg-[#4293A0] text-white rounded-lg font-medium"
          >
            MY 영농/농장 정보 보러가기
          </button>
        </div>
      </div>
    </MobileFrame>
  )
}

export default FarmEditComplete
