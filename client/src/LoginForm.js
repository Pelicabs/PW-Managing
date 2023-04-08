import { Button, Checkbox, Form } from 'semantic-ui-react'

function LoginForm() {
    return (
        <Form>
            <Form.Field>
                <label>Email</label>
                <input placeholder='Email' />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder='Password' />
            </Form.Field>
            <Form.Field>
                <Checkbox label='I agree to Marcus Terms and Conditions' />
            </Form.Field>
            <Button type='submit'>Log In</Button>
        </Form>
    )
}

export default LoginForm