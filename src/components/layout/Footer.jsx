import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.brandCol}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <ShieldCheck size={20} />
            </div>
            <span className={styles.brandName}>Rent<span>Any</span></span>
          </div>
          <p className={styles.tagline}>
            India's most trusted peer-to-peer equipment rental community. Verified locals, transparent pricing, and comprehensive gear protection.
          </p>
          <div className={styles.cityPill}>
            <span>📍 Currently live across Bengaluru</span>
          </div>
        </div>

        <div className={styles.linksCol}>
          <h4>Explore</h4>
          <Link to="/search?category=cameras">Cameras & Lenses</Link>
          <Link to="/search?category=drones">Drones & Aerial</Link>
          <Link to="/search?category=gaming">Gaming & Consoles</Link>
          <Link to="/search?category=audio">Podcast & Audio</Link>
          <Link to="/search?category=camping">Camping & Outdoors</Link>
        </div>

        <div className={styles.linksCol}>
          <h4>For Owners</h4>
          <Link to="/list">List Your Gear</Link>
          <Link to="/dashboard">Owner Dashboard</Link>
          <a href="#insurance">RentAny ₹1 Lakh Guarantee</a>
          <a href="#payouts">Instant UPI Payouts</a>
        </div>

        <div className={styles.linksCol}>
          <h4>Trust & Safety</h4>
          <a href="#id-check">Aadhaar / DigiLocker Verification</a>
          <a href="#deposit">Escrow Security Deposits</a>
          <a href="#support">24/7 Bengaluru Helpdesk</a>
          <a href="#guidelines">Community Guidelines</a>
        </div>
      </div>

      <div className={styles.subFooter}>
        <div className={`container ${styles.subFooterInner}`}>
          <p>© 2026 RentAny Technologies Pvt Ltd. All rights reserved.</p>
          <p className={styles.madeWith}>
            Crafted for creators & explorers with <Heart size={14} className={styles.heart} /> in Bengaluru
          </p>
        </div>
      </div>
    </footer>
  );
}
