import { FC, useState, useEffect } from 'react'
import { Pie } from '@ant-design/plots'

import useStore from 'store/store'
import { UserInterface } from 'assets/interface/user.interface'
import useUser from 'assets/hooks/useUser.hook'

interface CityCount {
    type: string
    value: number
}

const ChartPage: FC = () => {
    const store = useStore()
    const { handleUserFetching } = useUser()

    const [cityCounts, setCityCounts] = useState<CityCount[]>([])

    useEffect(() => {
        handleUserFetching()
    }, [])

    useEffect(() => {
        const cities: { [key: string]: number } = {}

        store.users.forEach((user: UserInterface) => {
            const city = user.address.city
            cities[city] = cities[city] ? cities[city] + 1 : 1
        })

        const cityCounts = Object.entries(cities).map(([city, value]) => ({
            type: city,
            value,
        }))
        setCityCounts(cityCounts)
    }, [store.users])

    const config = {
        appendPadding: 10,
        data: cityCounts,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'outer',
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    }

    return <Pie {...config} />
}

export default ChartPage
