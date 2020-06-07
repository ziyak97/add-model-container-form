import React, { useState, useEffect } from 'react'
import { useForm, FormContext } from "react-hook-form"

import axios from 'axios'

import './container-form.styles.css'
import ContainerFormModel from '../container-form-model/container-form-model.component'
import ContainerFormDetails from '../container-form-details/container-form-details.component'

const ContainerForm = () => {
    const methods = useForm();

    const [indexes, setIndexes] = React.useState([])
    const [counter, setCounter] = React.useState(0)

    const [allModelTypes, setAllModelTypes] = useState([])

    const addModel = () => {
        setIndexes(prevIndexes => [...prevIndexes, counter]);
        setCounter(prevCounter => prevCounter + 1);
    }

    const removeModel = index => () => {
        setIndexes(prevIndexes => [...prevIndexes.filter(model => model !== index)]);
    }

    const clearModels = () => {
        setIndexes([]);
    }

    const onSubmit = values => {
        if(!values.models) {
            console.log('Add models!')
            return
        }
        const filteredModelsArr = values.models.filter(model => !model.length)
        const filteredParamsArr = values.models.forEach(model => model.params.filter(param => !param.length))

        values.models = filteredModelsArr
        values.models.params = filteredParamsArr
        console.log(values)
    }

    useEffect(() => {
        const getModels = async () => {
            const models = await axios.get('http://localhost:5000/api/models')
            models.data.forEach(model => setAllModelTypes(prevState => [...prevState, model.modelType]))
        }
        getModels()
    }, [])

    return (
            <FormContext {...methods} >
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <ContainerFormDetails />

                    {indexes.map(index => {
                        const fieldName = `models[${index}]`
                        
                        return (
                            <ContainerFormModel
                                key={fieldName}
                                fieldName={fieldName}
                                allModelTypes={allModelTypes}
                                index={index}
                                removeModel={removeModel}
                            />
                        )
                    })}

                    <button type="button" onClick={addModel}>
                        Add Model
                    </button>

                    <button type="button" onClick={clearModels}>
                        Clear Models
                    </button>

                    <input type="submit" />
                </form>
            </FormContext>
    )
}

export default ContainerForm