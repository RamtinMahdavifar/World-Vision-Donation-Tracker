import React, { useState } from "react"
import {Form, Button, Card, Alert, Container} from "react-bootstrap"

import { Link, useNavigate } from "react-router-dom"
import {useAuth} from "../../../contexts/AuthContext ";

export default function EditProfileCustomer() {
    const emailRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
    const passwordRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
    const passwordConfirmRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
    const { currentUser, updatePasswordCurrentUser, updateEmailCurrentUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e:any) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmailCurrentUser(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePasswordCurrentUser(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                navigate('../profile', { replace: true })
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (


        <Container className="d-flex align-items-center justify-content-center " style={{minHeight: "60vh"}}>
            <div className="w-100" style={{maxWidth: '1000px'}}>
            <Card style={{minHeight: 350}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile Customer</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                ref={emailRef}
                                required
                                defaultValue={currentUser.email}
                            />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordRef}
                                placeholder="Leave blank to keep the same"
                            />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordConfirmRef}
                                placeholder="Leave blank to keep the same"
                            />
                        </Form.Group>
                        <br/>
                        <Button disabled={loading} style={{background: "#212529"}} className="w-100" type="submit" >
                            Update
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/profile">Cancel</Link>
            </div>

            </div>
        </Container>

    )
}