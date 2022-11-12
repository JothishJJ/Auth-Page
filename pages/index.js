import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";

import styles from "../styles/Home.module.css";

import { useAuthState } from "react-firebase-hooks/auth";

import { Card, Button, Alert } from "react-bootstrap";

import { useAuth } from "../lib/AuthContext";
import { auth } from "../lib/firebase";

export default function Home() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [user, loading] = useAuthState(auth);

  if (!user) {
    Router.push("/Login");
    return <></>;
  }

  if (loading) {
    return <></>;
  }

  async function handleLogout() {
    setError("");

    try {
      await logout();
      router.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div>
        <Head>
          <title>AuthPage</title>
        </Head>
        <h1>Dashboard</h1>
        <Card>
          <Card.Body>
            <h2 className="text-center" mb-4>
              Profile
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email:</strong> {currentUser.email}
            <Link
              href="/update-profile"
              className="btn btn-success w-100 mt-3 link"
            >
              Update Profile
            </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout} className={styles.link}>
            Log Out
          </Button>
        </div>
      </div>
    </>
  );
}
