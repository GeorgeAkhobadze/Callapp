import React, { useState, useEffect } from 'react'
import { Pie } from '@ant-design/plots'
import useStore from './store'
import { getAllUsersAPI } from './API/API'

interface CityCount {
    type: string
    value: number
}

const ChartsPage: React.FC = () => {
    const store = useStore()
    const [cityCounts, setCityCounts] = useState<CityCount[]>([])

    useEffect(() => {
        if (store.users.length <= 0) {
            getAllUsersAPI()
                .then((res) => store.setUsers(res.data.data))
                .catch((err) => console.log(err))
        }
    }, [])

    useEffect(() => {
        const cities: { [key: string]: number } = {}
        store.users.forEach((user) => {
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

export default ChartsPage
