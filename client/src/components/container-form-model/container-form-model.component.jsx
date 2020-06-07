import React from 'react'
import { FormContext, useForm, useFormContext } from "react-hook-form"

import { ConnectForm } from '../connect-form/connect-form.component';



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


                    <button type="button" onClick={removeModel(index)}>
                        Remove
                    </button>
                </fieldset>)
            }
        </ConnectForm>

    )
}

export default ContainerFormModel
