import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'
import BackButton from '../components/BackButton'
import DaumPostcodeModal from '../components/DaumPostcodeModal'

function AddressInput() {
  const [zip, setZip] = useState('')
  const [addr, setAddr] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <MobileFrame>
      <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
        <header className="px-4 pt-3 pb-2">
          <BackButton />
          <div className="text-sm font-semibold">농장주소를 입력하면</div>
          <div className="text-sm text-gray-500">내 지역에 맞는 보조금을 알려드려요</div>
        </header>
        <main className="px-4 space-y-3">
          <div className="space-y-2">
            <label className="text-sm text-gray-600">우편번호</label>
            <div className="flex gap-2">
              <input value={zip} onChange={e => setZip(e.target.value)} placeholder="" className="flex-1 h-11 rounded-lg bg-gray-100 px-3 text-sm outline-none" />
              <button onClick={() => setOpen(true)} className="px-3 rounded-lg border text-sm">주소 검색</button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-600">상세주소를 입력하세요</label>
            <input value={addr} onChange={e => setAddr(e.target.value)} placeholder="" className="w-full h-11 rounded-lg bg-gray-100 px-3 text-sm outline-none" />
          </div>
          <div className="text-xs text-blue-600">주소찾기 인증이 안되었어요?</div>
        </main>
        <div className="mt-auto p-3">
          <button onClick={() => navigate('/farm-info')} className="w-full bg-blue-600 text-white rounded-lg h-12">확인</button>
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


