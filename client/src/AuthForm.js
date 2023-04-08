import React from 'react'
import { Button } from 'semantic-ui-react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

function AuthForm() {
  const [type, setType] = React.useState('login')

  function toggle() {
    if (type === 'login') {
      setType('signup')
    } else {
      setType('login')
    }
  }

  const form = type === 'login' ? <LoginForm /> : <SignUpForm />
  // the above is equivalent to:
  //   let form
  //   if (type === 'login') {
  //     form = <LoginForm />
  //   } else {
  //     form = <SignupForm />
  //   }

  return (
    <div>
      <Button basic onClick={toggle}>
        {type === 'login' ? 'Sign up' : 'Log in'}
      </Button>
      {form}
    </div>
  )
}

export default AuthForm
