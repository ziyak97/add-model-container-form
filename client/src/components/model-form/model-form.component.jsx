import React from 'react'
import { useForm } from "react-hook-form"
import Form from 'react-bootstrap/Form'

import axios from 'axios'

const ModelForm = () => {
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = async data => {
        try {
            await axios.post('/api/models', data)
        } catch (e) {
            console.error(e)
        }

    }

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formBasicModelType">
                    <Form.Label>Model Type</Form.Label>
                    <Form.Control type="text" name="modelType" ref={register({ required: true })} placeholder="Enter model type" />
                </Form.Group>
                {errors.modelType && <span>This field is required</span>}


                <Form.Group controlId="formBasicFunctionName">
                    <Form.Label>Function Name</Form.Label>
                    <Form.Control type="text" name="functionName" ref={register({ required: true })} placeholder="Enter function name" />
                </Form.Group>
                {errors.functionName && <span>This field is required</span>}


                <Form.Group controlId="formBasicPath">
                    <Form.Label>Path</Form.Label>
                    <Form.Control type="text" name="path" ref={register({ required: true })} placeholder="Enter path" />
                </Form.Group>
                {errors.path && <span>This field is required</span>}


                <Form.Group controlId="formBasicYVarType">
                    <Form.Label>Y Var Type</Form.Label>
                    <Form.Control type="text" name="yVarType" ref={register({ required: true })} placeholder="Enter Y Var Type" />
                </Form.Group>
                {errors.yVarType && <span>This field is required</span>}


                <Form.Group controlId="formBasicDisplayName">
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control type="text" name="displayName" ref={register({ required: true })} placeholder="Enter display name" />
                </Form.Group>
                {errors.displayName && <span>This field is required</span>}

                <button type='submit'>Submit</button>
            </Form>
        </div>
    )
}

export default ModelForm
