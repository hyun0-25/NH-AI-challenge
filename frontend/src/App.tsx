import { createContext, useContext, useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CropSelect from './pages/CropSelect.tsx'
import SelectedSummary from './pages/SelectedSummary.tsx'
import AddressInput from './pages/AddressInput.tsx'
import FarmInfo from './pages/FarmInfo.tsx'
import Dashboard from './pages/Dashboard.tsx'
import FarmManage from './pages/FarmManage.tsx'
import RegistrationComplete from './pages/RegistrationComplete.tsx'
import FarmEditComplete from './pages/FarmEditComplete.tsx'
import PolicyPage from './pages/PolicyPage.tsx'
import PolicyDetailPage from './pages/PolicyDetailPage.tsx'
import ProductPage from './pages/ProductPage.tsx'
import ProductDetailPage from './pages/ProductDetailPage.tsx'
import InsurancePage from './pages/InsurancePage.tsx'
import InsuranceDetailPage from './pages/InsuranceDetailPage.tsx'
import ChatbotPage from './pages/ChatbotPage.tsx'
import NotificationPage from './pages/NotificationPage.tsx'
import NotificationListPage from './pages/NotificationListPage.tsx'
import NotificationDetailPage from './pages/NotificationDetailPage.tsx'
import NotificationDetailPage2 from './pages/NotificationDetailPage2.tsx'

export type Crop = {
  id: string
  name: string
  emoji: string
}

type AppState = {
  selectedCrops: Crop[]
  setSelectedCrops: (crops: Crop[]) => void
  // New: selected varieties stored by category id (values are variety ids)
  selectedVarieties: Record<string, number[]>
  setSelectedVarieties: (value: Record<string, number[]>) => void
  cropOrder: string[]
  setCropOrder: (ids: string[]) => void
  cropsCatalog: Record<string, { name: string; emoji: string }>
  setCropsCatalog: (value: Record<string, { name: string; emoji: string }>) => void
  varietiesMap: Record<string, { id: number; name: string }[]>
  setVarietiesMap: (v: Record<string, { id: number; name: string }[]>) => void
  // Address/farm info
  farmZipCode: string
  setFarmZipCode: (v: string) => void
  farmLocation: string
  setFarmLocation: (v: string) => void
  farmLocationDetail: string
  setFarmLocationDetail: (v: string) => void
  farmType: string | null
  setFarmType: (v: string | null) => void
  farmTypeOtherDescription: string | null
  setFarmTypeOtherDescription: (v: string | null) => void
  farmArea: number
  setFarmArea: (v: number) => void
  farmAreaUnitType: string
  setFarmAreaUnitType: (v: string) => void
}

const AppContext = createContext<AppState | null>(null)

export const useAppState = (): AppState => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('AppContext not found')
  return ctx
}

function App() {
  const [selectedCrops, setSelectedCrops] = useState<Crop[]>([])
  const [selectedVarieties, setSelectedVarieties] = useState<Record<string, number[]>>({})
  const [cropOrder, setCropOrder] = useState<string[]>([])
  const [cropsCatalog, setCropsCatalog] = useState<Record<string, { name: string; emoji: string }>>({})
  const [varietiesMap, setVarietiesMap] = useState<Record<string, { id: number; name: string }[]>>({})
  const [farmZipCode, setFarmZipCode] = useState('')
  const [farmLocation, setFarmLocation] = useState('')
  const [farmLocationDetail, setFarmLocationDetail] = useState('')
  const [farmType, setFarmType] = useState<string | null>(null)
  const [farmTypeOtherDescription, setFarmTypeOtherDescription] = useState<string | null>(null)
  const [farmArea, setFarmArea] = useState<number>(0)
  const [farmAreaUnitType, setFarmAreaUnitType] = useState<string>('M2')

  // Keep cropOrder in sync with selected crops
  const orderedSync = useMemo(() => {
    const existing = new Set(cropOrder)
    const addition = selectedCrops.map(c => c.id).filter(id => !existing.has(id))
    const filtered = cropOrder.filter(id => selectedCrops.some(c => c.id === id))
    return [...filtered, ...addition]
  }, [cropOrder, selectedCrops])

  const value = useMemo(
    () => ({
      selectedCrops,
      setSelectedCrops,
      selectedVarieties,
      setSelectedVarieties,
      cropOrder: orderedSync,
      setCropOrder,
      cropsCatalog,
      setCropsCatalog,
      varietiesMap,
      setVarietiesMap,
      farmZipCode,
      setFarmZipCode,
      farmLocation,
      setFarmLocation,
      farmLocationDetail,
      setFarmLocationDetail,
      farmType,
      setFarmType,
      farmTypeOtherDescription,
      setFarmTypeOtherDescription,
      farmArea,
      setFarmArea,
      farmAreaUnitType,
      setFarmAreaUnitType,
    }),
    [selectedCrops, selectedVarieties, orderedSync, cropsCatalog, varietiesMap, farmZipCode, farmLocation, farmLocationDetail, farmType, farmTypeOtherDescription, farmArea, farmAreaUnitType]
  )

  return (
    <BrowserRouter>
      <AppContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/address" element={<AddressInput />} />
          <Route path="/crops" element={<CropSelect />} />
          <Route path="/summary" element={<SelectedSummary />} />
          <Route path="/farm-info" element={<FarmInfo />} />
          <Route path="/manage" element={<FarmManage />} />
          <Route path="/complete" element={<RegistrationComplete />} />
          <Route path="/farm-edit-complete" element={<FarmEditComplete />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/policy-detail/:policyId" element={<PolicyDetailPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product-detail/:productId" element={<ProductDetailPage />} />
          <Route path="/insurance" element={<InsurancePage />} />
          <Route path="/insurance-detail/:id" element={<InsuranceDetailPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/notification-list" element={<NotificationListPage />} />
          <Route path="/notification-detail" element={<NotificationDetailPage />} />
          <Route path="/notification-detail-2" element={<NotificationDetailPage2 />} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  )
}

export default App

