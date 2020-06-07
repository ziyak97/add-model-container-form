import React, { useState, useEffect } from 'react'

import Table from 'react-bootstrap/Table'

import axios from 'axios'

const ParameterTable = () => {
    const [allParameters, setAllParameters] = useState([])
    useEffect(() => {
        const getModels = async () => {
            const models = await axios.get('http://localhost:5000/api/modelParameters')
            console.log(models)
            setAllParameters(models.data)
        }
        getModels()
    }, [])
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Model Type</th>
                        <th>Parameter Name</th>
                        <th>Display Name</th>
                        <th>Min Value</th>
                        <th>Max Value</th>
                        <th>Default Value</th>
                        <th>Type</th>
                        <th>Y Var Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allParameters.map(model => (
                            <tr key={model._id}>
                                <td>{model.modelType}</td>
                                <td>{model.parameterName}</td>
                                <td>{model.displayName}</td>
                                <td>{model.minValue || '-'}</td>
                                <td>{model.maxValue || '-'}</td>
                                <td>{model.defaultValue || '-'}</td>
                                <td>{model.type}</td>
                                <td>{model.yVarType}</td>
                                <td>{model.description || '-'}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default ParameterTable