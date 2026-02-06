"use client";

import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import styles from "./Header.module.css";

export const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className={styles.header}>
      <Image
        src="/spybee_logo_white.png"
        alt="logo"
        width={120}
        height={60}
        unoptimized
      />

      <div className={styles.userSection}>
        <div className={styles.userInfo}>
          <div className={styles.avatarWrapper}>
            <Image
              src={user?.avatar || "/usuario.png"}
              alt={user?.name || "Usuario"}
              width={40}
              height={40}
              className={styles.avatar}
              unoptimized
            />
          </div>
          <div className={styles.userDetails}>
            <span className={styles.userName}>{user?.name || "Usuario"}</span>
            <span className={styles.userEmail}>{user?.email}</span>
          </div>
        </div>

        <button
          onClick={logout}
          className={styles.logoutButton}
          aria-label="Cerrar sesión"
          title="Cerrar sesión"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};
