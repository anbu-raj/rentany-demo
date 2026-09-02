import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Smartphone, ArrowRight, Lock } from 'lucide-react';
import Button from '../../components/ui/Button';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('98450 12345');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(`/auth/verify?phone=${encodeURIComponent('+91 ' + phoneNumber)}`);
    }, 600);
  };

  return (
    <div className={`container ${styles.loginPage}`}>
      <div className={styles.loginCard}>
        <div className={styles.logoWrap}>
          <ShieldCheck size={32} className={styles.shield} />
        </div>

        <h1 className={styles.title}>Welcome to RentAny</h1>
        <p className={styles.subtitle}>
          Enter your mobile number to log in or create your verified creator account.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.phoneInputGroup}>
            <span className={styles.countryCode}>🇮🇳 +91</span>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="98765 43210"
              className={styles.phoneInput}
              required
            />
          </div>

          <Button
            type="submit"
            size="lg"
            variant="primary"
            loading={loading}
            fullWidth
            icon={ArrowRight}
            iconPosition="right"
          >
            Get One-Time Password
          </Button>
        </form>

        <div className={styles.divider}>
          <span>OR QUICK ACCESS DEMO</span>
        </div>

        <div className={styles.quickAccessRow}>
          <button
            type="button"
            className={styles.demoUserBtn}
            onClick={() => {
              setPhoneNumber('98450 12345');
              navigate('/auth/verify?phone=%2B91%2098450%2012345');
            }}
          >
            <strong>Arjun (Renter Persona)</strong>
            <span>+91 98450 12345</span>
          </button>

          <button
            type="button"
            className={styles.demoUserBtn}
            onClick={() => {
              setPhoneNumber('97412 88901');
              navigate('/auth/verify?phone=%2B91%2097412%2088901');
            }}
          >
            <strong>Priya (Owner Persona)</strong>
            <span>+91 97412 88901</span>
          </button>
        </div>

        <p className={styles.disclaimer}>
          By continuing, you agree to our Terms of Service, Community Trust Guidelines, and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
