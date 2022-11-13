import { Form, Button, Card, Container, Alert } from "react-bootstrap";

import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useRef, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { useAuth } from "../lib/AuthContext";

import Loading from "../lib/Loading";

export default function ForgotPassword() {
  const emailRef = useRef();

  const { resetPassword } = useAuth();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [user, loadingAuth] = useAuthState(auth);

  if (user) {
    Router.push("/");
    return <Loading />;
  }

  if (loadingAuth) {
    return <Loading />;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Go check your inbox to reset your password.");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center md-4">Reset Password</h2>
              {message && (
                <>
                  <br />
                  <Alert variant="success">{message}</Alert>
                </>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <br />

                <Button
                  disabled={loading}
                  type="submit"
                  className="w-100"
                  variant="success"
                >
                  Reset Password
                </Button>
              </Form>
              {error && (
                <>
                  <br />
                  <Alert variant="danger">{error}</Alert>
                </>
              )}
              <div className="w-100 text-center mt-3">
                <Link href="/Login">Login</Link>
              </div>
              <div className="w-100 text-center mt-2">
                Don&#39;t have an account? <Link href="/Signup">Sign Up</Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
