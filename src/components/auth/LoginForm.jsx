"use client";

import { useState } from "react";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { Input } from "../ui/Input/input";
import { Button } from "../ui/Button/Button";
import styles from "./LoginForm.module.css";
import Image from "next/image";

export const LoginForm = ({ onSubmit, error, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && (
        <div className={styles.error}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <Image
            src="/spybee_logo_black.png"
            alt="Spybee Logo"
            width={120}
            height={60}
            unoptimized

          />
        </div>
        <h1 className={styles.title}>Ingresa a tu espacio de trabajo</h1>
      </div>

      <Input
        id="email"
        type="email"
        label="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        icon={<Mail size={18} />}
        required
        autoComplete="email"
        minLength={undefined}
      />

      <Input
        id="password"
        type="password"
        label="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        icon={<Lock size={18} />}
        required
        minLength={6}
        autoComplete="current-password"
      />

      <Button type="submit" variant="primary" fullWidth disabled={loading}>
        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>

      <div className={styles.demo}>
        <p className={styles.demoTitle}>Demo:</p>
        <p className={styles.demoText}>
          Usa cualquier email y una contraseña de al menos 6 caracteres
        </p>
      </div>
    </form>
  );
}
