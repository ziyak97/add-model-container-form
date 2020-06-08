import React, { useState, useEffect } from 'react'

import Table from 'react-bootstrap/Table'

import axios from 'axios'

import './container-table.styles.css'

const ContainerTable = () => {
    const [allParameters, setAllParameters] = useState([])

    const handleDelete = async (id) => {
        axios.delete(`http://localhost:5000/api/containers/${id}`)
        alert('Container Deleted!')
    }

    useEffect(() => {
        const getModels = async () => {
            const containers = await axios.get('http://localhost:5000/api/containers')
            console.log(containers.data)
            setAllParameters(containers.data)
        }
        getModels()
    }, [])
    return (
        <div className='container-table'>
            {allParameters.map(container => (
                <div key={container._id}>
                    <div style={{ overflow: 'scroll' }}>
                        <Table style={{ backgroundColor: 'white' }} striped bordered hover>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center' }} colSpan='5'>N-Model name - {container.containerName}</th>
                                </tr>
                                <tr>
                                    <th>Model Name</th>
                                    <th>Model Type</th>
                                    <th>Step Number</th>
                                    <th>Total Steps</th>
                                    <th>Parameters</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    container.models.map(model => (
                                        <tr key={model._id}>
                                            <td>{model.modelName}</td>
                                            <td>{model.modelType}</td>
                                            <td>{model.stepNumber}</td>
                                            <td>{container.numberOfSteps}</td>
                                            <td>{model.parameters.map((param, i) => <div key={i}>{param}</div>)}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>

                    <button className='container-table__button-remove' onClick={() => handleDelete(container._id)}>Remove {container.containerName}</button>
                </div>
            ))}

        </div>
    )
}

export default ContainerTable