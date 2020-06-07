import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"

import axios from 'axios'

import './container-form.styles.css'

const ContainerForm = () => {
    const [indexes, setIndexes] = React.useState([])
    const [counter, setCounter] = React.useState(0)

    const [indexesParams, setIndexesParams] = React.useState([])
    const [counterParams, setCounterParams] = React.useState(0)

    const [allModelTypes, setAllModelTypes] = useState([])

    const addModel = () => {
        setIndexes(prevIndexes => [...prevIndexes, counter]);
        setCounter(prevCounter => prevCounter + 1);
    }

    const removeModel = index => () => {
        setIndexes(prevIndexes => [...prevIndexes.filter(model => model !== index)]);
        // setCounter(prevCounter => prevCounter - 1);
    }

    const clearModels = () => {
        setIndexes([]);
    }

    const addParam = () => {
        setIndexesParams(prevIndexesParams => [...prevIndexesParams, counterParams]);
        setCounterParams(prevCounterParams => prevCounterParams + 1);
    }

    const removeParam = index => () => {
        setIndexesParams(prevIndexesParams => [...prevIndexesParams.filter(param => param !== index)]);
        // setCounter(prevCounter => prevCounter - 1);
    }

    const clearParams = () => {
        setIndexesParams([]);
    }

    const { handleSubmit, register, errors } = useForm();
    const onSubmit = values => {
        // if(!values.models) {
        //     console.log('Add models!')
        //     return
        // }
        const filteredModelsArr = values.models.filter(model => !model.length)
        const filteredParamsArr = values.models.forEacparams.filter(param => !param.length)

        values.models = filteredModelsArr
        values.models.params = filteredParamsArr
        console.log(values)
    };

    useEffect(() => {
        const getModels = async () => {
            const models = await axios.get('http://localhost:5000/api/models')
            models.data.forEach(model => setAllModelTypes(prevState => [...prevState, model.modelType]))
        }
        getModels()
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Enter the Container Name
                <input type="text" name="containerName" ref={register({ required: true })} placeholder="Enter container name" /></label>
                {errors.containerName && <span>This field is required</span>}


                <label>Enter the number of steps for the Model
                <input type="number" min='1' name="numberOfSteps" ref={register({ required: true, min: 1 })} placeholder="Enter number of steps" /></label>
                {errors.numberOfSteps && <span>This field is required</span>}

                {indexes.map(index => {
                    const fieldName = `models[${index}]`
                    return (
                        <fieldset className='container-form__field' name={fieldName} key={fieldName}>
                            <label>Select Model Type</label>
                            <select name={`${fieldName}.modelType`} required ref={register({ required: true })}>
                                {allModelTypes.map((modelType, index) => (
                                    <option key={index}>{modelType}</option>
                                ))}
                            </select>
                            {errors.modelType && <span>This field is required</span>}

                            {indexesParams.map(indexParam => {
                                const fieldName = `models[${index}].params[${indexParam}]`
                                return (
                                    <fieldset className='container-form__field' name={fieldName} key={fieldName}>
                                        <label>
                                            Enter Parameter:
                                            <input
                                                type="text"
                                                name={`${fieldName}`}
                                                ref={register}
                                            />
                                        </label>
                                        <button type="button" onClick={removeParam(indexParam)}>
                                            Remove
                                        </button>
                                    </fieldset>
                                )
                            })}

                            <button type="button" onClick={addParam}>
                                Add Param
                            </button>
                            <button type="button" onClick={clearParams}>
                                Clear Params
                            </button>


                            {/* 
                            <label>
                                Last Name {index}:
                                <input
                                    type="text"
                                    name={`${fieldName}.lastName`}
                                    ref={register}
                                />
                            </label> */}

                            <button type="button" onClick={removeModel(index)}>
                                Remove
                            </button>
                        </fieldset>
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
        </div>
    )
}

export default ContainerForm