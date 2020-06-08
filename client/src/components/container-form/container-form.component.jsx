import React, { useState, useEffect } from 'react'
import { useForm, FormContext } from "react-hook-form"

import axios from 'axios'

import './container-form.styles.css'
import ContainerFormModel from '../container-form-model/container-form-model.component'
import ContainerFormDetails from '../container-form-details/container-form-details.component'

const ContainerForm = () => {
    const methods = useForm()

    const [indexes, setIndexes] = React.useState([])
    const [counter, setCounter] = React.useState(0)

    const [allModelTypes, setAllModelTypes] = useState([])

    const submitValidation = values => {
        const arr = []
        let error = false

        if (!values.models) {
            error = true
            alert('Add models!')
            return
        }

        values.models.forEach(model => {
            if (!model.parameters) {
                error = true
                alert('Each model requires atleast 1 parameter!')
                return
            } 
        })

        values.models.forEach(model => {
            arr.push(parseInt(model.stepNumber)) 
        })
        
        for(let i = 1; i <= values.numberOfSteps; i++) {
            if(!arr.includes(i)) {
                error = true
                alert('You have to enter a model for each step!')
                return
            }
        }

        arr.forEach(param => {
            if(param > values.numberOfSteps) {
                error = true
                alert('You have entered a model step number greater than total steps of the N-Model!')
                return
            }
        })
        
        return error

    }

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

    const onSubmit = async (values, e) => {

        const error = submitValidation(values)


        if (error === false) {
            const filteredModelsArr = values.models.filter(model => !model.length)
            values.models.forEach((mod) => {
                mod.parameters = mod.parameters.filter(parameter => parameter)
            })

            values.models = filteredModelsArr

            try {
                await axios.post('http://localhost:5000/api/containers', values)
                alert('Form submitted')
                e.target.reset()
                clearModels()
            } catch (e) {
                console.error(e.message)
                alert('Error submitting form! Please try again!')
            }
     
        } else return
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