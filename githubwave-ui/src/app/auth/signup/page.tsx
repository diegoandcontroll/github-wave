'use client'
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './page.module.css';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className={styles.container}>
      <div className={styles["form-wrapper"]}>
        <h1 className={styles.heading}>Cadastro Usuário</h1>
        <form>
          <label htmlFor="username" className={styles.label}>Nome de Usuário:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            placeholder="Digite seu nome de usuário"
            className={styles.input}
          />

          <label htmlFor="email" className={styles.label}>E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Digite seu e-mail"
            className={styles.input}
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
            />
            <span
              className={styles.icon}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <label htmlFor="confirm-password" className={styles.label}>Confirmar Senha:</label>
          <div className={`${styles["input-wrapper"]} ${styles["password-wrapper"]}`}>
            <input
              type={showPassword ? "text" : "password"}
              id="confirm-password"
              name="confirm-password"
              required
              placeholder="Confirme sua senha"
              className={styles.input}
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
            placeholder="insira o link da sua imagem"
            id="image"
            name="image"
            accept="image/*"
            className={styles.input}
          />

          <button type="submit" className={styles.button}>Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
