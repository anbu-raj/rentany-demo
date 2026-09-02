import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  CheckCircle, Calendar, MapPin, Key, MessageSquare, 
  ArrowRight, ShieldCheck, Download, Share2
} from 'lucide-react';
import listingsData from '../data/listings.json';
import usersData from '../data/users.json';
import { useBookingStore } from '../store/bookingStore';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import styles from './BookingConfirmedPage.module.css';

export default function BookingConfirmedPage() {
  const { id } = useParams();
  const { listing: storeListing, startDate, endDate } = useBookingStore();
  const listing = storeListing || listingsData.find(l => l.id === id) || listingsData[0];
  const owner = usersData.find(u => u.id === listing.ownerId) || usersData[1];

  const rentalCode = 'RENT-A7IV-3891';
  const handoverOtp = '4829';

  return (
    <div className={`container ${styles.confirmedPage}`}>
      <div className={styles.confirmedCard}>
        {/* Animated Checkmark Circle */}
        <div className={styles.iconCircle}>
          <CheckCircle size={44} className={styles.checkSvg} />
        </div>

        <Badge variant="green" size="md">Booking Reserved & Paid</Badge>

        <h1 className={styles.heading}>You're all set to pick up!</h1>
        <p className={styles.subheading}>
          Payment of rental and refundable security deposit received in escrow. A WhatsApp confirmation has been dispatched.
        </p>

        {/* Handover OTP Box */}
        <div className={styles.otpBox}>
          <div className={styles.otpHeader}>
            <Key size={16} />
            <span>YOUR HANDOVER OTP</span>
          </div>
          <div className={styles.otpCode}>{handoverOtp}</div>
          <p className={styles.otpHint}>
            Share this 4-digit code with {owner.name} after verifying the item condition in-person to release the equipment.
          </p>
        </div>

        {/* Booking Details Summary */}
        <div className={styles.summaryGrid}>
          <div className={styles.summaryItem}>
            <span className={styles.itemLabel}>Rental ID</span>
            <strong>{rentalCode}</strong>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.itemLabel}>Reserved Item</span>
            <strong>{listing.title}</strong>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.itemLabel}>Pickup Date & Time</span>
            <strong>{startDate} at 10:00 AM</strong>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.itemLabel}>Return Scheduled</span>
            <strong>{endDate} at 06:00 PM</strong>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.itemLabel}>Pickup Landmark</span>
            <strong>Indiranagar 100ft Road Metro, Bengaluru</strong>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.itemLabel}>Host Contact</span>
            <strong>{owner.name} ({owner.phone})</strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <Link to={`/rentals/rnt_001`}>
            <Button size="lg" variant="primary" icon={ArrowRight} iconPosition="right">
              View Active Rental Dashboard
            </Button>
          </Link>

          <Link to="/messages">
            <Button size="lg" variant="outline" icon={MessageSquare}>
              Message {owner.name}
            </Button>
          </Link>
        </div>

        {/* Footer Guarantee */}
        <div className={styles.confirmedFooter}>
          <ShieldCheck size={16} className={styles.shield} />
          <span>Security deposit is protected in escrow until your safe return.</span>
        </div>
      </div>
    </div>
  );
}
