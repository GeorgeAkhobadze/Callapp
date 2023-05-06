import fs from 'fs'

export const getUsers = async (_req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync('data.json'))
        res.status(201).json({ total: data.length, data })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createUser = async (req, res) => {
    const body = req.body

    try {
        fs.readFile('data.json', function (err, data) {
            let json = JSON.parse(data)

            const newUser = { id: json.length == 0 ? 1 : json[json.length - 1].id + 1, ...body }
            json.push(newUser)

            fs.writeFileSync('data.json', JSON.stringify(json))
            res.status(201).json(newUser)
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
    const { params, body } = req

    try {
        fs.readFile('data.json', function (err, data) {
            if (err) throw err

            const json = JSON.parse(data)
            const itemIndex = json.findIndex((item) => item.id === Number(params.id))

            if (itemIndex !== -1) {
                json[itemIndex] = { ...json[itemIndex], ...body }
                fs.writeFile('data.json', JSON.stringify(json), (err) => {
                    if (err) throw err
                    res.status(200).json(json)
                })
            } else {
                res.status(404).json({ message: 'User not found' })
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    const { params } = req

    try {
        fs.readFile('data.json', function (err, data) {
            const json = JSON.parse(data)
            const filteredData = json.filter((x) => x.id != params.id)
            fs.writeFileSync('data.json', JSON.stringify(filteredData))

            res.status(200).json(filteredData)
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
