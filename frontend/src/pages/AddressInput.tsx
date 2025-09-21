import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'
import BackButton from '../components/BackButton'
import DaumPostcodeModal from '../components/DaumPostcodeModal'
import { useAppState } from '../App'

function AddressInput() {
  const { farmZipCode, setFarmZipCode, farmLocation, setFarmLocation, farmLocationDetail, setFarmLocationDetail } = useAppState()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <MobileFrame>
      <div className="w-full h-full bg-white mobile-safe-area flex flex-col">
        <header className="px-4 pt-3 pb-10">
          <BackButton />
          <h1 className="text-2xl pt-5"><span className="text-[#4293A0] font-bold">농장주소</span>를 입력하면</h1>
          <div className="text-[18px] text-gray-400">내 지역에 맞는 보조금을 알려드려요</div>
        </header>
        <main className="px-4 space-y-5">
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <input value={farmZipCode} onChange={e => setFarmZipCode(e.target.value)} placeholder="우편번호" className="flex-1 h-10 bg-transparent border-b border-gray-200 px-1 text-[17px] outline-none" />
              <button onClick={() => setOpen(true)} className="h-8 px-2 rounded-lg border text-[14px] text-[#4293A0] ring-2 ring-[#4293A0]">주소 입력</button>
            </div>
          </div>
          <div className="space-y-6">
            <input value={farmLocation} onChange={e => setFarmLocation(e.target.value)} placeholder="" className="w-full h-10 bg-transparent border-b border-gray-200 px-1 text-[17px] outline-none" />
            <input value={farmLocationDetail} onChange={e => setFarmLocationDetail(e.target.value)} placeholder="상세주소를 입력하세요" className="w-full h-10 bg-transparent border-b border-gray-200 px-1 text-[17px] outline-none" />
          </div>
        </main>
        <div className="mt-auto">
          <button
            disabled={!farmZipCode.trim() || !farmLocation.trim() || !farmLocationDetail.trim()}
            onClick={() => navigate('/farm-info')}
            className={`w-full h-12 rounded-none ${(!farmZipCode.trim() || !farmLocation.trim() || !farmLocationDetail.trim()) ? 'bg-gray-200 text-gray-400' : 'bg-[#4293A0] text-white'}`}
          >
            확인
          </button>
          <div className="h-4 bg-white"></div>
        </div>

        <DaumPostcodeModal
          open={open}
          onClose={() => setOpen(false)}
          onComplete={({ zonecode, address }) => {
            setFarmZipCode(zonecode)
            setFarmLocation(address)
          }}
        />
      </div>
    </MobileFrame>
  )
}

export default AddressInput


