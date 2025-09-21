import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'

function NotificationPage() {
  const navigate = useNavigate()
  const [showNotification, setShowNotification] = useState(false)

  const handleScreenClick = () => {
    if (!showNotification) {
      setShowNotification(true)
    }
  }

  const handleNotificationClick = () => {
    navigate('/notification-list')
  }

  return (
    <MobileFrame>
      <div className="w-full h-full relative overflow-hidden -mt-[44px]" onClick={handleScreenClick}>
        {/* iOS Background Image - 상태바 영역까지 덮기 */}
        <div className="absolute inset-0 top-0">
          <img 
            src="/src/images/iOS.png" 
            alt="iOS Background" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Push Notification - 애니메이션과 함께 나타남 */}
        {showNotification && (
          <div className={`absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${
            showNotification ? 'animate-slide-down' : 'animate-slide-up'
          }`}>
              <div 
                className="bg-gray-100 bg-opacity-85 rounded-2xl px-4 py-3 w-[370px] shadow-lg cursor-pointer"
                onClick={handleNotificationClick}
              >
                <div className="flex items-center space-x-3">
                  {/* App Icon - 콕뱅크 이미지 사용 */}
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img 
                    src="/src/images/콕뱅크.png" 
                    alt="콕뱅크" 
                    className="w-11 h-11 object-contain"
                  />
                </div>
                
                {/* Notification Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-gray-800 font-semibold text-md leading-tight">
                      [태풍 '너구리' 북상 - 재해보험 안내]
                    </div>
                    <div className="text-xs text-gray-500 ml-2">지금</div>
                  </div>
                  
                  <div className="text-gray-400 text-sm leading-tight">
                    회원님의 농장(토마토, 영동군) 태풍 피해 위험.
                  </div>
                  
                  <div className="text-gray-400 text-sm leading-tight">
                    보험료 정부 50% 지원.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </MobileFrame>
  )
}

export default NotificationPage
