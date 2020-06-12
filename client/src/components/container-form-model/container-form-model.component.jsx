import React, { useState } from 'react'
import axios from 'axios'

import { ConnectForm } from '../connect-form/connect-form.component';

import './container-form-model.styles.css'

const ContainerFormModel = ({ fieldName, allModelTypes, removeModel, index }) => {
    const [indexesParams, setIndexesParams] = React.useState([])
    const [counterParams, setCounterParams] = React.useState(0)
    const [modelName, setModelName] = useState([])
    const [modelNameType, setModelNameType] = useState('')

    const addParam = () => {
        setIndexesParams(prevIndexesParams => [...prevIndexesParams, counterParams]);
        setCounterParams(prevCounterParams => prevCounterParams + 1);
    }

    const removeParam = index => () => {
        setIndexesParams(prevIndexesParams => [...prevIndexesParams.filter(param => param !== index)]);
    }

    const clearParams = () => {
        setIndexesParams([]);
    }

    const handleModelChange = async e => {
        try {
            const { value } = e.target
            const data = await axios.get(`http://localhost:5000/api/modelParameters/${value}`)
            console.log(data.data)
            setModelName(data.data)
        } catch (e) {
            console.error(e.message)
        }
    }

    const handleModelNameChange = e => {
        const regex = /(?<=\[).+?(?=\])/
        const {value} = e.target
        const res = regex.exec(value)
        setModelNameType(res[0])
    }

    return (
        <ConnectForm>
            {({ register, errors }) =>
                (<fieldset className='container-form__field' name={fieldName}>
                    <label>Select Model Type
                        <select defaultValue='DEFAULT' onChange={handleModelChange} name={`${fieldName}.modelType`} required ref={register({ required: true })}>
                            <option value='DEFAULT' disabled>Choose model type here</option>
                            {allModelTypes.filter((model, index) => allModelTypes.indexOf(model) === index).map((modelType, index) => (
                                <option key={index}>{modelType}</option>
                            ))}
                        </select>
                    </label>
                    {errors.modelType && <span>This field is required</span>}

                    <label>Select Model
                        <select defaultValue='DEFAULT' onChange={handleModelNameChange}  name={`${fieldName}.modelName`} required ref={register({ required: true })}>
                            <option value='DEFAULT' disabled>Choose model here</option>
                            {modelName.map((name) => (
                                <option key={name._id}>{name.displayName} [{name.type}]</option>
                            ))}
                        </select>
                    </label>
                    {errors.modelType && <span>This field is required</span>}

                    <label>Enter the Model Name
                        <input type="text" name={`${fieldName}.modelName`} ref={register({ required: true })} placeholder="Enter model name" /></label>
                    {errors.modelName && <span>This field is required</span>}

                    <label>Enter the Step Number for this Model
                        <input type="number" min='1' name={`${fieldName}.stepNumber`} ref={register({ required: true, min: 1 })} placeholder="Enter step number" /></label>
                    {errors.stepNumber && <span>This field is required</span>}


                    {modelNameType && <p>Please add parameters of {modelNameType} type</p>}

                    <span className='container-form-model__label'>Enter Parameters</span>
                    {indexesParams.map(indexParam => {
                        const fieldName = `models[${index}].parameters[${indexParam}]`
                        return (
                            <fieldset name={fieldName} key={fieldName}>

                                <div className='container-form-model__param-container'>
                                    <input
                                        className='container-form-model__param-input'
                                        type="text"
                                        name={`${fieldName}`}
                                        ref={register}
                                        placeholder="Enter parameter"
                                        required
                                    />

                                    <button
                                        className='container-form-model__param-remove' type="button" onClick={removeParam(indexParam)}>
                                        Remove
                                    </button>
                                </div>

                            </fieldset>
                        )
                    })}

                    <div className='container-form-model__param-buttons'>
                        <button type="button" onClick={addParam}>
                            Add Parameter
                        </button>
                        <button type="button" onClick={clearParams}>
                            Clear Parameters
                         </button>
                    </div>


                    <button type="button" onClick={removeModel(index)}>
                        Remove Model
                    </button>
                </fieldset>)
            }
        </ConnectForm>

    )
}

export default ContainerFormModel
