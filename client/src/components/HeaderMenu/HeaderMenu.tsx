import { AppstoreOutlined, DeleteOutlined, PieChartOutlined } from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import { useNavigate } from 'react-router'
const HeaderMenu = () => {
    const navigate = useNavigate()
    const items: MenuProps['items'] = [
        {
            label: 'Table',
            key: 'table',
            icon: <AppstoreOutlined />,
        },
        {
            label: 'Charts',
            key: 'charts',
            icon: <PieChartOutlined />,
        },
    ]
    return <Menu onClick={(e) => navigate(e.key)} items={items} mode='horizontal' />
}

export default HeaderMenu
