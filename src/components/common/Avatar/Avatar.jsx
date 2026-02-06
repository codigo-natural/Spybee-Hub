import Image from 'next/image';
import styles from './Avatar.module.css';

export const Avatar = ({ nombre, cargo, imagenPerfil }) => {
  return (
    <div className={styles.usuario}>
      <div className={styles.avatarContainer}>
        <div className={styles.hexagonAvatar}>
          <div className={styles.userIcon}>
            {imagenPerfil ? (
              <Image
                src={imagenPerfil}
                alt="Imagen de perfil"
                width={24}
                height={24}
                className={styles.avatarImage}
                unoptimized
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className={styles.avatarFallbackIcon}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.995 8.995 0 0112 21a8.995 8.995 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </div>
        </div>
      </div>
      <div className={styles.detallesUsuario}>
        <span className={styles.nombreUsuario}>{nombre}</span>
        <span className={styles.cargoUsuario}>{cargo}</span>
      </div>
      <Image src="/downArrow.svg" alt="arrow-down" width={24} height={24} className={styles.arrowIcon} />
    </div>
  );
}
