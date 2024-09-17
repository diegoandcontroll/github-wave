'use client';
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoMdLogIn } from 'react-icons/io';
import styles from './page.module.css';
import Link from 'next/link';
import { useToaster } from "@/contexts/toaster/ToasterContext";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const { dispatch } = useToaster();
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordC, setPasswordC] = useState('');
  const router = useRouter()
  const handleToast = () => {
    dispatch({ type: 'ADD_MESSAGE', text: 'Usuario criado com sucesso!' });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(password === passwordC){
      const res = await fetch('https://github-wave.onrender.com/api/gitwave/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: username,
          email,
          password,
          image
        })
      })
  
      if (!res.ok) {
        return null;
      } else {
        setUsername('')
        setImage('')
        setEmail('')
        setPassword('')
        setPasswordC('')
        handleToast();
        router.push('/')
      }
    }
    
  };
  return (
    <div className={styles.container}>
      <div className={styles["form-wrapper"]}>
        <h1 className={styles.heading}>Cadastro Usuário</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className={styles.label}>Nome de Usuário:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            placeholder="Digite seu nome de usuário"
            className={styles.input}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email" className={styles.label}>E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Digite seu e-mail"
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
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

          <label htmlFor="confirm-password" className={styles.label}>Confirmar Senha:</label>
          <div className={styles["input-wrapper"]}>
            <input
              type={showPassword ? "text" : "password"}
              id="confirm-password"
              name="confirm-password"
              required
              placeholder="Confirme sua senha"
              className={styles.input}
              onChange={(e) => setPasswordC(e.target.value)}
            />
            <span
              className={styles.icon}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <label htmlFor="image" className={styles.label}>Imagem de Perfil:</label>
          <input
            type="text"
            placeholder="Insira o link da sua imagem"
            id="image"
            name="image"
            className={styles.input}
            onChange={(e) => setImage(e.target.value)}
          />

          <button type="submit" className={styles.button}>Cadastrar</button>

          <p className={styles.loginPrompt}>
            Já tem uma conta? <span><Link href="/auth/signin" className={styles.loginLink}>Faça login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
