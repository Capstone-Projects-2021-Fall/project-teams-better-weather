import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory} from "react-router-dom"
import Navbar from './Navbar';
import firebase from 'firebase/compat/app'

//Database
import { ref, set } from "firebase/database"
import {db} from './Firebase'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    //Adds user to location database (realtime Firebase)
    function addUserDB(email, password) {
        var user = firebase.auth().currentUser
        set(ref(db, '/users/' + user.uid), {
          Email: email,
          Password: password,
          LastLocation: 'New York'
        });
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }
        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            addUserDB(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch(error) {
            setError('Failed to create an account')
        }
        setLoading(false)
    }

    return (
        <>
            <div className="pages-bkg">
                <Navbar />
            </div>
            <Card className="d-flex align-items-center justify-content-center">
                <Card.Body> 
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/sign-in">Log In</Link>
                <br></br>
                <Link to="/">Go back to main page</Link>
            </div>
        </>
    )
}
