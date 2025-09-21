import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'
import BackButton from '../components/BackButton'

interface Notification {
  id: number
  type: 'disaster' | 'support'
  title: string
  description: string
  timestamp: string
  date: string
}

function NotificationListPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'all' | 'disaster' | 'support'>('all')

  // 알림 데이터
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'disaster',
      title: '[태풍 \'너구리\' 북상 - 재해보험 안내]',
      description: '회원님의 농장(토마토, 영동군) 태풍 피해 위험. 보험료 정부 50% 지원.',
      timestamp: '오늘 10:23',
      date: ''
    },
    {
      id: 2,
      type: 'support',
      title: '[청년농업인 정착 지원사업 신청 가능]',
      description: '만 35세 농업인 대상, 월 110만원 3년 지원. 6월 30일까지 신청.',
      timestamp: '',
      date: '2025.09.15'
    }
  ]

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true
    return notification.type === activeTab
  })

  const handleDeleteNotification = (id: number) => {
    // 알림 삭제 로직
    console.log('Delete notification:', id)
  }

  const handleDeleteAll = () => {
    // 모든 알림 삭제 로직
    console.log('Delete all notifications')
  }

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

        {/* 탭 네비게이션 */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab('all')}
                className={`text-sm font-medium pb-2 ${
                  activeTab === 'all' 
                    ? 'text-black border-b border-gray-400' 
                    : 'text-gray-500'
                }`}
              >
                전체 (2)
              </button>
              <button
                onClick={() => setActiveTab('disaster')}
                className={`text-sm font-medium pb-2 ${
                  activeTab === 'disaster' 
                    ? 'text-black border-b border-gray-400' 
                    : 'text-gray-500'
                }`}
              >
                재해 알림 (1)
              </button>
              <button
                onClick={() => setActiveTab('support')}
                className={`text-sm font-medium pb-2 ${
                  activeTab === 'support' 
                    ? 'text-black border-b border-gray-400' 
                    : 'text-gray-500'
                }`}
              >
                지원 사업 알림 (1)
              </button>
            </div>
            <button
              onClick={handleDeleteAll}
              className="text-[12px] text-gray-500"
            >
              모두 삭제
            </button>
          </div>
        </div>

        {/* 알림 목록 */}
        <main className="flex-1 overflow-auto px-4">
          <div className="space-y-0">
            {filteredNotifications.map((notification, index) => (
              <div 
                key={notification.id} 
                className="bg-white border-b border-gray-200 p-4 relative cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  if (notification.id === 1) { // 태풍 너구리 알림
                    navigate('/notification-detail')
                  } else if (notification.id === 2) { // 청년농업인 알림
                    navigate('/notification-detail-2')
                  }
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-[11px] text-gray-400">
                        {notification.timestamp || notification.date}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteNotification(notification.id)
                        }}
                        className="text-gray-400 hover:text-gray-600 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                    <h3 className="text-sm font-bold text-black mb-2 leading-tight">
                      {notification.title}
                    </h3>
                    <div className="text-xs text-gray-500 font-semibold leading-relaxed">
                      {notification.description.split('. ').map((line, lineIndex) => (
                        <div key={lineIndex} className="mb-1">
                          {line}{lineIndex < notification.description.split('. ').length - 1 ? '.' : ''}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </MobileFrame>
  )
}

export default NotificationListPage
