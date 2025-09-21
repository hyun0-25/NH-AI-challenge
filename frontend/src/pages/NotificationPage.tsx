import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingScreen from '../components/LoadingScreen'

function NotificationPage() {
  const navigate = useNavigate()
  const [showNotification, setShowNotification] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleScreenClick = () => {
    if (!showNotification) {
      setShowNotification(true)
    }
  }

  const handleNotificationClick = () => {
    setIsLoading(true)
    // 로딩 후 알림내역 페이지로 이동
    setTimeout(() => {
      navigate('/notification-list')
    }, 2000) // 2초 후 이동
  }

  // 로딩 중일 때 로딩창 표시
  if (isLoading) {
    return (
      <LoadingScreen
        title="알림내역을 불러오고 있습니다"
        subtitle="농장 관련 중요한 소식을 확인해드릴게요."
        showHeader={false}
      />
    )
  }

  return (
    <div className="iphone-preview-wrap">
      <div className="iphone-device relative overflow-hidden">
        {/* iOS Background Image - 아이폰 프레임 전체를 덮기 */}
        <div className="absolute inset-0">
          <img 
            src="/src/images/iOS.png" 
            alt="iOS Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* 상태바 */}
        <div className="status-bar">
          <span></span>
          <div className="text-xs text-white">9:41 ▪︎ LTE ▪︎ 100%</div>
        </div>
        <div className="iphone-notch" />
        
        {/* 콘텐츠 영역 */}
        <div className="iphone-content relative" onClick={handleScreenClick}>

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
                    
                    <div className="text-gray-600 text-sm leading-tight">
                      회원님의 농장(토마토, 영동군) 태풍 피해 위험.
                    </div>
                    
                    <div className="text-gray-600 text-sm leading-tight">
                      보험료 정부 50% 지원.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotificationPage
