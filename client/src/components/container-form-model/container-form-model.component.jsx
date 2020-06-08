import React from 'react'

import { ConnectForm } from '../connect-form/connect-form.component';

import './container-form-model.styles.css'

const ContainerFormModel = ({ fieldName, allModelTypes, removeModel, index }) => {
    const [indexesParams, setIndexesParams] = React.useState([])
    const [counterParams, setCounterParams] = React.useState(0)

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
    return (
        <ConnectForm>
            {({ register, errors }) =>
                (<fieldset className='container-form__field' name={fieldName}>
                    <label>Select Model Type
                        <select name={`${fieldName}.modelType`} required ref={register({ required: true })}>
                            {allModelTypes.map((modelType, index) => (
                                <option key={index}>{modelType}</option>
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
