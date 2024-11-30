import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.p}>&copy; 2024 OFS. All rights reserved.</p>
      <p className={styles.p}>Contact us at: support@ofs.com</p>
    </footer>
  );
}
