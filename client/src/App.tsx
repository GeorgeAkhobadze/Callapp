import { FC, useState } from 'react'
import { ConfigProvider, theme } from 'antd'
import { Route, Routes } from 'react-router'
import { Navigate } from 'react-router-dom'

import * as Styled from './StyledApp'
import TablePage from 'page/usersPage/UsersPage'
import ChartsPage from 'page/chartPage/ChartPage'
import HeaderMenu from 'components/headerMenu/HeaderMenu'

const App: FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(true)

    return (
        <Styled.App darkMode={darkMode}>
            <ConfigProvider
                theme={
                    darkMode
                        ? {
                              algorithm: theme.darkAlgorithm,
                          }
                        : {
                              algorithm: theme.defaultAlgorithm,
                          }
                }
            >
                <HeaderMenu darkMode={darkMode} setDarkMode={setDarkMode} />

                <Routes>
                    <Route path='/' element={<Navigate to='/table' />} />
                    <Route path='/table' element={<TablePage />} />
                    <Route path='/charts' element={<ChartsPage />} />
                </Routes>
            </ConfigProvider>
        </Styled.App>
    )
}

export default App
