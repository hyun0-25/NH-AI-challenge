import { createContext, useContext, useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CropSelect from './pages/CropSelect.tsx'
import SelectedSummary from './pages/SelectedSummary.tsx'
import AddressInput from './pages/AddressInput.tsx'
import FarmInfo from './pages/FarmInfo.tsx'
import Dashboard from './pages/Dashboard.tsx'
import FarmManage from './pages/FarmManage.tsx'

export type Crop = {
  id: string
  name: string
  emoji: string
}

type AppState = {
  selectedCrops: Crop[]
  setSelectedCrops: (crops: Crop[]) => void
  selectedSubtypes: Record<string, string[]>
  setSelectedSubtypes: (value: Record<string, string[]>) => void
  cropOrder: string[]
  setCropOrder: (ids: string[]) => void
  cropsCatalog: Record<string, { name: string; emoji: string }>
  setCropsCatalog: (value: Record<string, { name: string; emoji: string }>) => void
}

const AppContext = createContext<AppState | null>(null)

export const useAppState = (): AppState => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('AppContext not found')
  return ctx
}

function App() {
  const [selectedCrops, setSelectedCrops] = useState<Crop[]>([])
  const [selectedSubtypes, setSelectedSubtypes] = useState<Record<string, string[]>>({})
  const [cropOrder, setCropOrder] = useState<string[]>([])
  const [cropsCatalog, setCropsCatalog] = useState<Record<string, { name: string; emoji: string }>>({})

  // Keep cropOrder in sync with selected crops
  const orderedSync = useMemo(() => {
    const existing = new Set(cropOrder)
    const addition = selectedCrops.map(c => c.id).filter(id => !existing.has(id))
    const filtered = cropOrder.filter(id => selectedCrops.some(c => c.id === id))
    return [...filtered, ...addition]
  }, [cropOrder, selectedCrops])

  const value = useMemo(
    () => ({ selectedCrops, setSelectedCrops, selectedSubtypes, setSelectedSubtypes, cropOrder: orderedSync, setCropOrder, cropsCatalog, setCropsCatalog }),
    [selectedCrops, selectedSubtypes, orderedSync, cropsCatalog]
  )

  return (
    <BrowserRouter>
      <AppContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/crops" element={<CropSelect />} />
          <Route path="/summary" element={<SelectedSummary />} />
          <Route path="/address" element={<AddressInput />} />
          <Route path="/farm-info" element={<FarmInfo />} />
          <Route path="/manage" element={<FarmManage />} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  )
}

export default App

