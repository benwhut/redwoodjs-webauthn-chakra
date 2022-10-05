import { useEffect, useRef, useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { Spinner } from '@chakra-ui/react'

const ForgotPasswordPage = () => {
  const [isDisabled, setIsDisabled] = useState(false)
  const [spinnerLoading, setSpinnerLoading] = useState(false)
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef(null)
  useEffect(() => {
    usernameRef?.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    setIsDisabled(true)
    const response = await forgotPassword(data.username)

    if (response.error) {
      toast.success(response.error)
      navigate(routes.login())
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        "If an account exists, an email will be sent to reset your password in the next few minutes. Please check your spam/junk folder if you don't see it in your inbox."
      )
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Forgot Password" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                Forgot Password
              </h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <div className="text-left">
                    <Label
                      name="username"
                      className="rw-label"
                      errorClassName="rw-label rw-label-error"
                    >
                      Email
                    </Label>
                    <TextField
                      name="username"
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      ref={usernameRef}
                      validation={{
                        required: {
                          value: true,
                          message: 'Email is required',
                        },
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: 'Invalid email format'
                        },
                      }}
                    />

                    <FieldError name="username" className="rw-field-error" />
                  </div>

                  <div className="rw-button-group">
                    {!isDisabled ? (
                      <Submit className="rw-button rw-button-blue">Submit</Submit>
                    ) : (
                      <Spinner 
                        thickness='5px'
                        speed='0.65s'
                        emptyColor='gray.300'
                        color='blue.500'
                        size='lg'
                      />
                    )}
                    
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ForgotPasswordPage
