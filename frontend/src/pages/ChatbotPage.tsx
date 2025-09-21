import { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'
import BackButton from '../components/BackButton'

interface Message {
  id: number
  type: 'ai' | 'user'
  content: string
  timestamp: Date
  summary?: string
  docIds?: number[]
  docName?: string
}

interface ChatResponse {
  summary: string
  response: string
  docIds: number[]
}

function ChatbotPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const farmId = searchParams.get('farmId')
  const cropId = searchParams.get('cropId')
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: '김OO님, 안녕하세요.\n무엇이 궁금하신가요?',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 마우스휠 스크롤 이벤트
  useEffect(() => {
    const chatArea = chatAreaRef.current
    if (!chatArea) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      chatArea.scrollTop += e.deltaY
    }

    chatArea.addEventListener('wheel', handleWheel, { passive: false })
    return () => chatArea.removeEventListener('wheel', handleWheel)
  }, [])

  const sendChatRequest = async (query: string, docName: string) => {
    if (!farmId || !cropId) {
      console.error('Missing farmId or cropId')
      return null
    }

    try {
      const response = await fetch(`/api/chat-bot/${farmId}/${cropId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          docName,
          query
        })
      })

      if (response.ok) {
        const data: ChatResponse = await response.json()
        return data
      } else {
        console.error('Failed to fetch chat response')
        return null
      }
    } catch (error) {
      console.error('Error fetching chat response:', error)
      return null
    }
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const query = inputText
    setInputText('')
    setIsTyping(true)

    // docName 결정
    let docName = 'finance'
    if (query.includes('보험')) {
      docName = 'insurance'
    } else if (query.includes('정책')) {
      docName = 'policy'
    }

    // API 호출
    const response = await sendChatRequest(query, docName)
    setIsTyping(false)

    if (response) {
      const aiMessage: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.response,
        timestamp: new Date(),
        summary: response.summary,
        docIds: response.docIds,
        docName: docName
      }
      setMessages(prev => [...prev, aiMessage])
    } else {
      const errorMessage: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: '죄송합니다. 현재 AI 챗봇 서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: question,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // 기본 멘트만 표시 (API 호출 없음)
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: '금융상품에 관해 궁금하신 점이 무엇인가요? 자유롭게 질문해주세요.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getCurrentDate = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const date = now.getDate()
    const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
    const dayName = dayNames[now.getDay()]
    
    return `${year}. ${month}. ${date} ${dayName}`
  }

  return (
    <MobileFrame>
      <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
        {/* Header */}
        <header className="px-4 pt-3 pb-2 flex items-center justify-between relative bg-white">
          <BackButton />
          <h1 className="text-md font-medium absolute left-1/2 transform -translate-x-1/2">AI 챗봇 상담</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/')} className="w-5 h-5">
              <img src="/src/images/home.png" alt="홈" className="w-full h-full object-contain" />
            </button>
            <button className="w-5 h-5">
              <img src="/src/images/menu.png" alt="메뉴" className="w-full h-full object-contain" />
            </button>
          </div>
        </header>

             {/* Chat Area */}
             <main ref={chatAreaRef} className="flex-1 bg-[#4293A0]/10 overflow-y-auto px-4 py-4 scrollbar-hide">
          {/* Date */}
          <div className="text-center text-gray-400 text-xs mb-6">
            - {getCurrentDate()} -
          </div>

          {/* Messages */}
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`${message.type === 'user' ? 'flex flex-col items-end' : 'flex flex-col items-start'}`}>
                {message.type === 'ai' && message.id !== 1 && (
                  <div className="flex items-center gap-2 mb-2 ml-1">
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                      <img src="/src/images/콕뱅크.png" alt="NH농협은행" className="w-full h-full object-contain" />
                    </div>
                    <div className="text-sm text-gray-700 font-semibold">
                      NH농협은행
                    </div>
                    <div className="text-[10px] text-gray-500">
                      {message.timestamp.toLocaleTimeString('ko-KR', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </div>
                  </div>
                )}
                {message.type === 'user' && (
                  <div className="text-[10px] text-gray-500 mb-1 mr-1">
                    {message.timestamp.toLocaleTimeString('ko-KR', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true 
                    })}
                  </div>
                )}
                <div className={`max-w-[80%] ${
                  message.type === 'ai' 
                    ? 'bg-white shadow-sm rounded-r-3xl rounded-bl-3xl px-4 py-5' 
                    : 'bg-[#4293A0] text-white rounded-l-3xl rounded-br-3xl px-4 py-4'
                }`}>
                  {message.type === 'ai' && message.id === 1 ? (
                    <div>
                      <p className="text-md">
                        <span className="text-[#4293A0] font-medium">김OO</span>님, 안녕하세요.
                      </p>
                      <p className="text-md mt-1">무엇이 궁금하신가요?</p>
                      
                      {/* Quick Question Buttons */}
                      <div className="mt-4 space-y-3">
                         <button 
                           onClick={() => handleQuickQuestion('보험상품 질문하기')}
                           className="w-full flex justify-center py-0.5 px-8 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors ring-1 ring-gray-400"
                         >
                           <div className="flex items-center gap-1">
                             <div className="w-6 h-6 rounded-full flex items-center justify-center">
                               <img src="/src/images/AI_보험.png" alt="보험" className="w-4 h-4" />
                             </div>
                             <span className="text-[13px] text-gray-700">보험상품 질문하기</span>
                           </div>
                         </button>
                         
                         <button 
                           onClick={() => handleQuickQuestion('정부 지원정책 질문하기')}
                           className="w-full flex justify-center py-0.5 px-8  border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors ring-1 ring-gray-400"
                         >
                           <div className="flex items-center gap-1">
                             <div className="w-6 h-6 rounded-full flex items-center justify-center">
                               <img src="/src/images/AI_정책.png" alt="정책" className="w-4 h-4" />
                             </div>
                             <span className="text-[13px] text-gray-700">정부 지원정책 질문하기</span>
                           </div>
                         </button>
                         
                         <button 
                           onClick={() => handleQuickQuestion('금융상품 질문하기')}
                           className="w-full flex justify-center py-0.5 px-8  border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors ring-1 ring-gray-400"
                         >
                           <div className="flex items-center gap-1 ">
                             <div className="w-6 h-6 rounded-full flex items-center justify-center">
                               <img src="/src/images/AI_금융상품.png" alt="금융" className="w-4 h-4" />
                             </div>
                             <span className="text-[13px] text-gray-700">금융상품 질문하기</span>
                           </div>
                         </button>
                      </div>
                    </div>
                  ) : message.type === 'user' ? (
                    <p className="text-sm text-white whitespace-pre-line">{message.content}</p>
                  ) : (
                    <div>
                      {message.summary && (
                        <>
                          <p className="text-lg font-medium text-[#4293A0] mb-2">{message.summary}</p>
                          <hr className="border-gray-200 mb-3" />
                        </>
                      )}
                      <p className="text-sm text-gray-700 whitespace-pre-line">{message.content}</p>
                      {message.docIds && message.docIds.length > 0 && (
                        <button
                          onClick={() => {
                            const docId = message.docIds![0] // 첫 번째 docId 사용
                            if (message.docName === 'insurance') {
                              navigate(`/insurance-detail/${docId}`)
                            } else if (message.docName === 'policy') {
                              navigate(`/policy-detail/${docId}`)
                            } else if (message.docName === 'finance') {
                              navigate(`/product-detail/${docId}`)
                            }
                          }}
                          className="mt-3 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                          {message.docName === 'insurance' && '보험상품 상세 보기'}
                          {message.docName === 'policy' && '정책 상세 보기'}
                          {message.docName === 'finance' && '금융상품 상세 보기'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div ref={messagesEndRef} />
        </main>

        {/* Input Area */}
        <div className="bg-white px-4 py-4">
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-500 text-2xl">+</span>
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="궁금한 내용을 입력해 주세요."
              className="flex-1 px-4 py-3 bg-gray-50 rounded-full text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#4293A0] transition-all"
            />
          </div>
        </div>
      </div>
    </MobileFrame>
  )
}

export default ChatbotPage
