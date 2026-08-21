"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    console.log("LOGIN BUTTON CLICKED");

    try {
      const loginPromise = supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(
            new Error(
              "LOGIN_TIMEOUT"
            )
          );
        }, 10000);
      });

      const result: any = await Promise.race([
        loginPromise,
        timeoutPromise,
      ]);

      console.log(
        "SUPABASE LOGIN RESULT:",
        result
      );

      if (result?.error) {
        setError(
          `Login failed: ${result.error.message}`
        );

        setLoading(false);
        return;
      }

      if (!result?.data?.session) {
        setError(
          "Login response आला पण session मिळाली नाही."
        );

        setLoading(false);
        return;
      }

      console.log(
        "LOGIN SUCCESS:",
        result.data.session.user.email
      );

      setSuccess(
        "LOGIN SUCCESS! Admin उघडत आहे..."
      );

      setLoading(false);

      setTimeout(() => {
        router.replace("/admin");
        router.refresh();
      }, 500);

    } catch (err: any) {
      console.error(
        "LOGIN ERROR:",
        err
      );

      if (
        err?.message ===
        "LOGIN_TIMEOUT"
      ) {
        setError(
          "Supabase ला 10 सेकंदात response मिळाला नाही. Supabase URL, Publishable Key किंवा Network तपासा."
        );
      } else {
        setError(
          err?.message ||
          "Login करताना unknown error आला."
        );
      }

      setLoading(false);
    }
  }

  return (
    <main className="loginPage">

      <div className="loginCard">

        <div className="logo">
          SANKET<span>360</span>
        </div>

        <p className="label">
          ADMIN ACCESS
        </p>

        <h1>
          Welcome Back
        </h1>

        <p className="description">
          SANKET360 Admin Dashboard मध्ये
          प्रवेश करण्यासाठी login करा.
        </p>

        <form
          onSubmit={handleLogin}
        >

          <label>
            Email
          </label>

          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            autoComplete="email"
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            autoComplete="current-password"
          />

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          {success && (
            <div className="success">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "LOGGING IN..."
              : "LOGIN →"}
          </button>

        </form>

        <a
          href="/Forts"
          className="back"
        >
          ← Back to Forts
        </a>

      </div>

      <style jsx>{`

        .loginPage {
          min-height: 100vh;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 30px;

          background:
            radial-gradient(
              circle at center,
              rgba(
                231,
                169,
                59,
                0.10
              ),
              transparent 45%
            ),
            #070a08;

          color: #f4f4f1;

          font-family:
            Arial,
            Helvetica,
            sans-serif;
        }

        .loginCard {
          width: 100%;
          max-width: 430px;

          padding: 45px;

          background: #101511;

          border:
            1px solid #303832;

          box-shadow:
            0 25px 80px
            rgba(0,0,0,0.45);
        }

        .logo {
          color: white;

          font-size: 27px;

          font-weight: 900;

          letter-spacing: 3px;
        }

        .logo span {
          color: #e7a93b;
        }

        .label {
          margin-top: 35px;

          color: #e7a93b;

          font-size: 10px;

          font-weight: 900;

          letter-spacing: 3px;
        }

        h1 {
          margin: 12px 0;

          font-size: 42px;

          letter-spacing: -2px;
        }

        .description {
          color: #8f9891;

          font-size: 14px;

          line-height: 1.7;

          margin-bottom: 30px;
        }

        form {
          display: flex;

          flex-direction: column;
        }

        label {
          margin-bottom: 8px;

          color: #c4cbc6;

          font-size: 11px;

          font-weight: 800;

          letter-spacing: 1px;
        }

        input {
          width: 100%;

          padding: 14px;

          margin-bottom: 20px;

          background: #080b09;

          color: white;

          border:
            1px solid #303832;

          outline: none;

          font-size: 14px;
        }

        input:focus {
          border-color: #e7a93b;
        }

        button {
          margin-top: 5px;

          padding: 15px;

          border:
            1px solid #e7a93b;

          background: #e7a93b;

          color: #111;

          font-size: 11px;

          font-weight: 900;

          letter-spacing: 2px;

          cursor: pointer;
        }

        button:disabled {
          opacity: 0.6;

          cursor: not-allowed;
        }

        .error {
          margin-bottom: 15px;

          padding: 12px;

          border:
            1px solid #704545;

          background: #241313;

          color: #ff9d9d;

          font-size: 12px;

          line-height: 1.5;
        }

        .success {
          margin-bottom: 15px;

          padding: 12px;

          border:
            1px solid #496b4d;

          background: #122015;

          color: #9fe3a5;

          font-size: 12px;

          line-height: 1.5;
        }

        .back {
          display: block;

          margin-top: 25px;

          text-align: center;

          color: #e7a93b;

          text-decoration: none;

          font-size: 11px;

          font-weight: 800;
        }

        @media (max-width: 500px) {

          .loginPage {
            padding: 18px;
          }

          .loginCard {
            padding: 30px 22px;
          }

          h1 {
            font-size: 35px;
          }

        }

      `}</style>

    </main>
  );
}