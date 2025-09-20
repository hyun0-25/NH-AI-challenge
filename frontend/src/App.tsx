import { createContext, useContext, useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CropSelect from './pages/CropSelect.tsx'
import SelectedSummary from './pages/SelectedSummary.tsx'
import AddressInput from './pages/AddressInput.tsx'
import FarmInfo from './pages/FarmInfo.tsx'
import Dashboard from './pages/Dashboard.tsx'
import FarmManage from './pages/FarmManage.tsx'
import RegistrationComplete from './pages/RegistrationComplete.tsx'

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
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  )
}

export default App

