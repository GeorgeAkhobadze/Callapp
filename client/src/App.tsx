import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

import useStore, { UserInterface } from './store'
import { Input, Button, Table, Modal, Form, Select, InputNumber, Menu, MenuProps } from 'antd'
import axios from 'axios'

import UserModal from './components/UserModal/UserModal'
import TablePage from './tablePage'
import { Route, Routes, useNavigate } from 'react-router'
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
