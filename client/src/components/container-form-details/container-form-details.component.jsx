import React from 'react'
import { FormContext, useForm, useFormContext } from "react-hook-form"

import { ConnectForm } from '../connect-form/connect-form.component';

const ContainerFormDetails = () => {
    return (
           <ConnectForm>
            {({ register, errors }) =>
                (<fieldset className='container-form__field' name='name'>
                        <label>Enter the Container Name
                <input type="text" name="containerName" ref={register({ required: true })} placeholder="Enter container name" /></label>
                {errors.containerName && <span>This field is required</span>}


                <label>Enter the number of steps for the Model
                <input type="number" min='1' name="numberOfSteps" ref={register({ required: true, min: 1 })} placeholder="Enter number of steps" /></label>
                {errors.numberOfSteps && <span>This field is required</span>}
                </fieldset>)
            }
        </ConnectForm>

    )
}

export default ContainerFormDetails
