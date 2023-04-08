import React from 'react'
import axios from 'axios'
import { Button, Checkbox, Form } from 'semantic-ui-react'

function SignUpForm() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    async function onSignUp() {
        try {
            const response = await axios.post('/api/auth/signup', {
                email: email,
                password: password
            })
            console.log(response)
            } 
        catch (error) {
            console.log(error)
        }
    }

    return (
        <Form onSubmit={onSignUp}>
            <Form.Field>
                <label>Email</label>
                <input
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Checkbox label='I agree to sign up' />
            </Form.Field>
            <Button type='submit'>Sign Up</Button>
        </Form>
    )
}

export default SignUpForm