import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import Form from 'react-bootstrap/Form'

import axios from 'axios'

const ParametersForm = () => {
    const { register, handleSubmit, errors } = useForm()
    const [allModelTypes, setAllModelTypes] = useState([])
    useEffect(() => {
        const getModels = async () => {
            const models = await axios.get('http://localhost:5000/api/models')
            models.data.forEach(model => setAllModelTypes(prevState => [...prevState, model.modelType]))
        }
        getModels()
    }, [])
    const onSubmit = async data => {
        try {
            console.log(data)
            await axios.post('http://localhost:5000/api/modelParameters', data)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formBasicModelType">
                    <Form.Label>Select Model Type</Form.Label>
                    <Form.Control name="modelType" ref={register({ required: true })} as="select">
                        {allModelTypes.map((modelType, index) => (
                            <option key={index}>{modelType}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                {errors.modelType && <span>This field is required</span>}


                <Form.Group controlId="formBasicParameterName">
                    <Form.Label>Parameter Name</Form.Label>
                    <Form.Control type="text" name="parameterName" ref={register({ required: true })} placeholder="Enter parameter name" />
                </Form.Group>
                {errors.parameterName && <span>This field is required</span>}


                <Form.Group controlId="formBasicDisplayName">
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control type="text" name="displayName" ref={register({ required: true })} placeholder="Enter display name" />
                </Form.Group>
                {errors.displayName && <span>This field is required</span>}

                <Form.Group controlId="formBasicMinValue">
                    <Form.Label>Min Value</Form.Label>
                    <Form.Control type="number" name="minValue" ref={register} placeholder="Enter min value" />
                </Form.Group>

                <Form.Group controlId="formBasicMaxValue">
                    <Form.Label>Max Value</Form.Label>
                    <Form.Control type="number" name="maxValue" ref={register} placeholder="Enter max value" />
                </Form.Group>

                <Form.Group controlId="formBasicDefaultValue">
                    <Form.Label>Default Value</Form.Label>
                    <Form.Control type="number" name="defaultValue" ref={register} placeholder="Enter Default Value" />
                </Form.Group>

                <Form.Group controlId="formBasicType">
                    <Form.Label>Type</Form.Label>
                    <Form.Control type="text" name="type" ref={register({ required: true })} placeholder="Enter type" />
                </Form.Group>
                {errors.yVarType && <span>This field is required</span>}


                <Form.Group controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as='textarea' type="text" name="description" ref={register} placeholder="Enter description" />
                </Form.Group>
                
                <button type='submit'>Submit</button>
            </Form>
        </div>
    )
}

export default ParametersForm
