import { Form, Button, Card, Container, Alert } from "react-bootstrap";

import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useRef, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";

import { useAuth } from "../lib/AuthContext";

import Loading from "../lib/Loading";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { currentUser, updateCurrentPassword, updateEmailAddress } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [user, loadingAuth] = useAuthState(auth);

  if (!user) {
    Router.push("/Login");
    return <Loading />;
  }

  if (loadingAuth) {
    return <Loading />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmailAddress(emailRef.current.value));
    }
    if (passwordRef.current.value !== currentUser.password) {
      promises.push(updateCurrentPassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        Router.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Head>
        <title>Update Profile</title>
      </Head>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center md-4">Update Profile</h2>
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
                <br />
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Leave blank to keep the same"
                  />
                </Form.Group>
                <br />
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    placeholder="Leave blank to keep the same"
                  />
                </Form.Group>
                <br />
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-100"
                  variant="success"
                >
                  Sign Up
                </Button>
              </Form>
              {error && (
                <>
                  <br />
                  <Alert variant="danger">{error}</Alert>
                </>
              )}
              <div className="w-100 text-center mt-2">
                <Link href="/">Cancel</Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
