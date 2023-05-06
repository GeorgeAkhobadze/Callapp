import './App.css'
import TablePage from './tablePage'
import { Route, Routes } from 'react-router'
import HeaderMenu from './components/HeaderMenu/HeaderMenu'
import ChartsPage from './chartsPage'

function App() {
    return (
        <div className='app'>
            <HeaderMenu />
            <Routes>
                <Route path='/table' element={<TablePage />} />
                <Route path='/charts' element={<ChartsPage />} />
            </Routes>
        </div>
    )
}

export default App
