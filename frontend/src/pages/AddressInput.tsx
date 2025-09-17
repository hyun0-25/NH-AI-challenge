import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'
import BackButton from '../components/BackButton'
import DaumPostcodeModal from '../components/DaumPostcodeModal'

function AddressInput() {
  const [zip, setZip] = useState('')
  const [addr, setAddr] = useState('')
  const [detail, setDetail] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <MobileFrame>
      <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
        <header className="px-4 pt-3 pb-2">
          <BackButton />
          <h1 className="text-[20px] font-semibold"><span className="text-teal-700">농장주소</span>를 입력하면</h1>
          <div className="text-[12px] text-gray-500">내 지역에 맞는 보조금을 알려드려요</div>
        </header>
        <main className="px-4 space-y-5">
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <input value={zip} onChange={e => setZip(e.target.value)} placeholder="우편번호" className="flex-1 h-10 bg-transparent border-b border-gray-200 px-1 text-[15px] outline-none" />
              <button onClick={() => setOpen(true)} className="h-8 px-3 rounded-lg border text-[12px] text-gray-700">주소 입력</button>
            </div>
          </div>
          <div className="space-y-2">
            <input value={addr} onChange={e => setAddr(e.target.value)} placeholder="" className="w-full h-10 bg-transparent border-b border-gray-200 px-1 text-[15px] outline-none" />
            <input value={detail} onChange={e => setDetail(e.target.value)} placeholder="상세주소를 입력하세요" className="w-full h-10 bg-transparent border-b border-gray-200 px-1 text-[15px] outline-none" />
            <button type="button" onClick={() => setOpen(true)} className="text-left text-[12px] text-teal-700">도로명주소 검색하기</button>
          </div>
        </main>
        <div className="mt-auto p-0">
          <button
            disabled={!zip.trim() || !addr.trim() || !detail.trim()}
            onClick={() => navigate('/farm-info')}
            className={`w-full h-12 rounded-none ${(!zip.trim() || !addr.trim() || !detail.trim()) ? 'bg-gray-200 text-gray-400' : 'bg-teal-600 text-white'}`}
          >
            확인
          </button>
        </div>

        <DaumPostcodeModal
          open={open}
          onClose={() => setOpen(false)}
          onComplete={({ zonecode, address }) => {
            setZip(zonecode)
            setAddr(address)
          }}
        />
      </div>
    </MobileFrame>
  )
}

export default AddressInput


