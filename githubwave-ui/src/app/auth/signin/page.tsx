'use client';
import React, { useRef, useState } from "react";
import { FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa';
import styles from './page.module.css';
import Link from 'next/link';
import { signIn } from 'next-auth/react'
import { useToaster } from "@/contexts/toaster/ToasterContext";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const { dispatch } = useToaster();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleToast = () => {
    dispatch({ type: 'ADD_MESSAGE', text: 'Login bem realizado!' });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      return null;
    } else {
      router.push('/');
    }
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
  

  return (
    <div className={styles.container}>
      <div className={styles["form-wrapper"]}>
        <h1 className={styles.heading}>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className={styles.label}>E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Digite seu e-mail"
            className={styles.input}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password" className={styles.label}>Senha:</label>
          <div className={styles["input-wrapper"]}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              placeholder="Digite sua senha"
              className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className={styles.icon}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className={styles.button}>Entrar</button>

          <button type="button" className={`${styles.button} ${styles.githubButton}`}>
            <FaGithub className={styles.githubIcon} /> Login com GitHub
          </button>

          <p className={styles.signupPrompt}>
            Não tem uma conta? <Link href="/auth/signup" className={styles.signupLink}>Crie uma aqui</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
