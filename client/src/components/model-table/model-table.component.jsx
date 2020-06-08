import React, { useState, useEffect } from 'react'

import Table from 'react-bootstrap/Table'

import axios from 'axios'

const ModelTable = () => {
    const [allModels, setAllModels] = useState([])
    useEffect(() => {
        const getModels = async () => {
            const models = await axios.get('http://localhost:5000/api/models')
            setAllModels(models.data)
        }
        getModels()
    }, [])
    return (
        <div style={{ overflow: 'scroll' }}>
            <Table style={{ backgroundColor: 'white' }} striped bordered hover>
                <thead>
                    <tr>
                        <th>Model Type</th>
                        <th>Function Name</th>
                        <th>Path</th>
                        <th>Y Var Type</th>
                        <th>Display Name</th>
                        <th>Insert Date</th>
                        <th>Last Updated On</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allModels.map(model => (
                            <tr key={model._id}>
                                <td>{model.modelType}</td>
                                <td>{model.functionName}</td>
                                <td>{model.path}</td>
                                <td>{model.yVarType}</td>
                                <td>{model.displayName}</td>
                                <td>{model.createdAt.replace(/T/, ' ').replace(/\..+/, '') }</td>
                                <td>{model.updatedAt || '-'}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default ModelTable