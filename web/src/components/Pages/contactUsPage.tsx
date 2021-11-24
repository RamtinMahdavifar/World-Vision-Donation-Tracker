import {Alert, Button, Card, Container, FloatingLabel, Form} from "react-bootstrap";
import React from "react";
import ReactDOM from "react-dom";


const {useState} = require("react")


export default function ContactUsPage() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const emailRef = React.useRef() as React.MutableRefObject<HTMLInputElement>,
        titleRef = React.useRef() as React.MutableRefObject<HTMLInputElement>,
        messageRef =React.useRef() as React.MutableRefObject<HTMLTextAreaElement>;

    async function handleSubmit(e: any) {
        e.preventDefault()

        const data = {
            "senderEmail": emailRef.current.value,
            "title": titleRef.current.value,
            "message": messageRef.current.value,
        }

        try {
            setError("")
            setMessage("")
            setLoading(true)

            await fetch("http://localhost:5001/mail/", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {

                if (response.status === 201) {
                    setMessage("An email has been sent. Thank you for contacting us, we will respond shortly.")
                } else {
                    console.log(response);
                    setError("Failed to send message")
                }
            }).finally(()=>{
                setLoading(false)

            })

        }

        catch (e) {
            console.log(e)
        }

    }

    // function onSubmit(data: any) {
    //     setButtonText("Sending...")
    //
    //     fetch("http://localhost:5001/mail/", {
    //         method: "POST",
    //         body: JSON.stringify(data),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     }).then(response => {
    //         if (response.status === 201) {
    //             alert("An email has been sent. Thank you for contacting us, we will respond shortly.")
    //         } else {
    //             console.log(response);
    //             alert("Failed to send the email. Please try again.")
    //         }
    //
    //         reset();
    //     }).catch(err => {
    //         console.log(err);
    //         alert("Failed to send the email. Please try again.")
    //     }).finally(() => {
    //         setButtonText("Send");
    //     });
    // }

    return (
        <Container className="d-flex align-items-center justify-content-center " style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: '1000px'}}>
                <Card style={{minHeight: 100}}>
                    <Card.Body>

                        <h1>Contact Us</h1>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <br/>

                            <Form.Group id="email">
                                <Form.Label> Email</Form.Label>
                                <Form.Control placeholder="Your email address" type="email" style={{textAlign: "center"}} ref={emailRef}
                                              required/>
                            </Form.Group>

                            <br/>

                            <Form.Group id="title">

                                <Form.Label> Title </Form.Label>
                                <Form.Control placeholder="Title of your message" type="text" style={{textAlign: "center"}} ref={titleRef}
                                              required/>
                            </Form.Group>

                            <br/>

                            <Form.Group id="message">

                                <Form.Label> Message </Form.Label>

                                <Form.Control
                                    as="textarea" placeholder="Please type your concern here" style={{ height: '500px' }} ref={messageRef} required/>

                            </Form.Group>



                            <Button disabled={loading} className="w-100" style={{background: "#212529"}}
                                    type="submit"> Send Message</Button>


                        </Form>

                    </Card.Body>
                </Card>
            </div>

        </Container>
    )
}