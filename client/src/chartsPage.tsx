import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Pie } from '@ant-design/plots'
import axios from 'axios'
import useStore from './store'

interface User {
    city: string
    // Other user properties...
}

interface CityCount {
    type: string
    value: number
}

const ChartsPage: React.FC = () => {
    const store = useStore()
    const [cityCounts, setCityCounts] = useState<CityCount[]>([])

    useEffect(() => {
        if (store.users.length <= 0) {
            axios
                .get('http://localhost:5000/data')
                .then((res) => store.setUsers(res.data.data))
                .catch((err) => console.log(err))
        }
    }, [])

    useEffect(() => {
        // Count the occurrences of each city
        const cities: { [key: string]: number } = {}
        store.users.forEach((user) => {
            const city = user.address.city
            cities[city] = cities[city] ? cities[city] + 1 : 1
        })

        // Convert the cities object to an array of CityCount objects
        const cityCounts = Object.entries(cities).map(([city, value]) => ({
            type: city,
            value,
        }))

        // Update state with the cityCounts array
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
