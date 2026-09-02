import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/ui/Button';
import styles from './VerifyPage.module.css';

export default function VerifyPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const phone = searchParams.get('phone') || '+91 98450 12345';
  const { login } = useAuthStore();

  const [otp, setOtp] = useState(['4', '8', '2', '9', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(45);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (val, idx) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val.slice(-1);
    setOtp(newOtp);

    // Auto move to next input
    if (val && idx < 5) {
      const nextInput = document.getElementById(`otp-${idx + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(phone);
      setLoading(false);
      navigate('/');
    }, 700);
  };

  return (
    <div className={`container ${styles.verifyPage}`}>
      <div className={styles.verifyCard}>
        <Link to="/auth" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Change mobile number</span>
        </Link>

        <h1 className={styles.title}>Enter 6-digit Code</h1>
        <p className={styles.subtitle}>
          We sent an SMS with a 6-digit verification code to <strong>{phone}</strong>
        </p>

        <form onSubmit={handleVerify} className={styles.form}>
          <div className={styles.otpGrid}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                className={styles.otpInput}
                autoFocus={idx === 4}
              />
            ))}
          </div>

          <Button
            type="submit"
            size="lg"
            variant="primary"
            loading={loading}
            fullWidth
            icon={CheckCircle2}
          >
            Verify & Sign In
          </Button>
        </form>

        <div className={styles.resendRow}>
          {timer > 0 ? (
            <span className={styles.timerText}>Resend code in {timer}s</span>
          ) : (
            <button onClick={() => setTimer(45)} className={styles.resendBtn}>
              Resend code now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
