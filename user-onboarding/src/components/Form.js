import React from "react";


export default function Form(props) {
    const {
        values,
        change,
        submit,
        disabled,
        errors
    } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onChange = evt => {
        const { name, value, checked, type } = evt.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse)
    }

    return (
        <form className='form container' onSubmit={onSubmit}>
            <div className='form-group submit'>
                <h2>Add a user</h2>

                <button disabled={disabled}>Submit</button>
                <div className='errors'>
                    <div>{errors.first_name}</div>
                    <div>{errors.last_name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.tos}</div>
                </div>
            </div>

            <div className='form-group inputs'>
                <h4>General Information</h4>
                <label>First name&nbsp;
                    <input
                    value={values.first_name}
                    onChange={onChange}
                    name='first_name'
                    type='text'
                    />
                </label>

                <label>Last name&nbsp;
                    <input
                    value={values.last_name}
                    onChange={onChange}
                    name='last_name'
                    type='text'
                    />
                </label>

                <label>Email
                    <input
                        value={values.email}
                        onChange={onChange}
                        name='email'
                        type='text'
                    />
                    </label>

                <label>Password&nbsp;
                    <input
                        value={values.password}
                        onChange={onChange}
                        name='password'
                        type='text'
                    />
                </label>
            </div>

            <div className='form-group' checkbox>
                <label>Agree to Terms of Service
                    <input 
                        type="checkbox"
                        name="tos"
                        checked={values.tos === true}
                        onChange={onChange}
                    />
                </label>
            </div>
        </form>
    )
}