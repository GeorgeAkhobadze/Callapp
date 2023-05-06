import { FC } from 'react'
import { AppstoreOutlined, PieChartOutlined } from '@ant-design/icons'
import { Menu, MenuProps, Switch, Typography } from 'antd'
import { useLocation, useNavigate } from 'react-router'

import * as Styled from './StyledHeaderMenu'

const items: MenuProps['items'] = [
    {
        label: 'Table',
        key: '/table',
        icon: <AppstoreOutlined />,
    },
    {
        label: 'Charts',
        key: '/charts',
        icon: <PieChartOutlined />,
    },
]

interface Props {
    setDarkMode: (a: boolean) => void
    darkMode: boolean
}

const HeaderMenu: FC<Props> = ({ setDarkMode, darkMode }) => {
    const { Text } = Typography
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <Styled.Header darkMode={darkMode}>
            <Menu selectedKeys={[location.pathname]} onClick={(e) => navigate(e.key)} items={items} mode='horizontal' />

            <Styled.SwitchContainer>
                <Text>Dark Mode: </Text>
                <Switch defaultChecked={darkMode} onChange={(e) => setDarkMode(e)} />
            </Styled.SwitchContainer>
        </Styled.Header>
    )
}

export default HeaderMenu
