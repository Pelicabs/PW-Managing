import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios'

function LoginForm() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    async function onLogin() {
        try {
            const response = await axios.post('/api/auth/login', {
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
        <Form onSubmit={onLogin}>
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
                <Checkbox label='I agree to Marcus Terms and Conditions' />
            </Form.Field>
            <Button type='submit'>Log In</Button>
        </Form>
    )
}

export default LoginForm