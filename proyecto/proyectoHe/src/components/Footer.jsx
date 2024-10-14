import React from 'react'
import styles from '../styles/footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>&copy; 2024 Red Barrel. All rights reserved.</p>
                <div className={styles.socialLinks}>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer
