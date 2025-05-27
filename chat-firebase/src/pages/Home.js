import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bienvenido a ChatApp</h1>
      <p className={styles.description}>
        Este es un chat en tiempo real usando React y Firebase. Puedes iniciar
        sesión, chatear con otros usuarios, configurar tu cuenta y más.
      </p>
    </div>
  );
}
