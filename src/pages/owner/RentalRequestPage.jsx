import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle2, XCircle, ShieldCheck, Calendar, 
  Clock, MapPin, ArrowLeft, MessageSquare 
} from 'lucide-react';
import rentalsData from '../../data/rentals.json';
import listingsData from '../../data/listings.json';
import usersData from '../../data/users.json';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import styles from './RentalRequestPage.module.css';

export default function RentalRequestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const rental = rentalsData.find(r => r.id === id) || rentalsData[2]; // Default to rnt_003 (pending)
  const item = listingsData.find(l => l.id === rental.listingId) || listingsData[2];
  const renter = usersData.find(u => u.id === rental.renterId) || usersData[2];

  const [status, setStatus] = useState('pending'); // 'pending' | 'accepted' | 'declined'

  const handleAccept = () => {
    setStatus('accepted');
  };

  const handleDecline = () => {
    setStatus('declined');
  };

  return (
    <div className={`container ${styles.requestPage}`}>
      <Link to="/dashboard" className={styles.backLink}>
        <ArrowLeft size={16} />
        <span>Back to Owner Dashboard</span>
      </Link>

      <div className={styles.header}>
        <Badge variant={status === 'accepted' ? 'green' : status === 'declined' ? 'red' : 'amber'}>
          {status === 'accepted' ? 'Request Accepted' : status === 'declined' ? 'Request Declined' : 'Action Required'}
        </Badge>
        <h1 className={styles.title}>Rental Booking Request</h1>
        <p className={styles.subtitle}>
          Review renter credentials and equipment details before accepting.
        </p>
      </div>

      <div className={styles.layout}>
        {/* Left Column: Details */}
        <div className={styles.leftCol}>
          {/* Renter Profile Card */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Renter Profile & Verification</h2>
            <div className={styles.renterBox}>
              <img src={renter.avatar} alt={renter.name} className={styles.renterAvatar} />
              <div>
                <div className={styles.renterNameRow}>
                  <h3>{renter.name}</h3>
                  {renter.verified && (
                    <Badge variant="teal" size="sm" icon={ShieldCheck}>Aadhaar Verified</Badge>
                  )}
                </div>
                <span className={styles.renterMeta}>
                  ★ {renter.rating} ({renter.reviewsCount} completed rentals) • Member since {renter.memberSince}
                </span>
                <span className={styles.renterLoc}>📍 {renter.location}</span>
              </div>
            </div>

            <div className={styles.verificationNote}>
              <ShieldCheck size={16} className={styles.shield} />
              <span>Identity, phone number, and security deposit have been pre-cleared by RentAny.</span>
            </div>
          </div>

          {/* Reservation Breakdown */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Rental Schedule & Item</h2>
            <div className={styles.itemRow}>
              <img src={item.images[0]} alt={item.title} className={styles.itemThumb} />
              <div>
                <h4>{item.title}</h4>
                <p className={styles.itemTagline}>{item.tagline}</p>
              </div>
            </div>

            <div className={styles.scheduleGrid}>
              <div className={styles.scheduleItem}>
                <Calendar size={16} />
                <div>
                  <span className={styles.scheduleLabel}>Dates</span>
                  <strong>{rental.startDate} → {rental.endDate}</strong>
                </div>
              </div>

              <div className={styles.scheduleItem}>
                <Clock size={16} />
                <div>
                  <span className={styles.scheduleLabel}>Duration</span>
                  <strong>{rental.totalDays} Days ({rental.startDate} 10 AM Handover)</strong>
                </div>
              </div>

              <div className={styles.scheduleItem}>
                <MapPin size={16} />
                <div>
                  <span className={styles.scheduleLabel}>Meetup Point</span>
                  <strong>{rental.pickupLocation}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Payout and Decision */}
        <div className={styles.rightCol}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Your Payout Breakdown</h2>
            
            <div className={styles.payoutRows}>
              <div className={styles.payoutRow}>
                <span>Gross Rental ({rental.totalDays} days × ₹{rental.pricePerDay})</span>
                <span>₹{rental.rentAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.payoutRow}>
                <span>RentAny Host Fee (0% Promotional)</span>
                <span className={styles.freeFee}>FREE</span>
              </div>
              <div className={styles.payoutRow}>
                <span>Held Security Deposit</span>
                <span>₹{rental.securityDeposit.toLocaleString('en-IN')} (Escrow)</span>
              </div>

              <hr className={styles.payoutDivider} />

              <div className={styles.payoutTotal}>
                <span>Your Total Payout</span>
                <strong className={styles.payoutBig}>₹{rental.rentAmount.toLocaleString('en-IN')}</strong>
              </div>
              <p className={styles.payoutNote}>
                Paid to your bank UPI within 1 hour after handover OTP verification.
              </p>
            </div>

            {status === 'pending' ? (
              <div className={styles.decisionActions}>
                <Button
                  size="lg"
                  fullWidth
                  variant="primary"
                  onClick={handleAccept}
                  icon={CheckCircle2}
                >
                  Accept Booking Request
                </Button>

                <Button
                  size="md"
                  fullWidth
                  variant="ghost"
                  onClick={handleDecline}
                  icon={XCircle}
                >
                  Decline Dates
                </Button>
              </div>
            ) : status === 'accepted' ? (
              <div className={styles.acceptedBanner}>
                <CheckCircle2 size={24} className={styles.greenCheck} />
                <div>
                  <strong>Booking Confirmed!</strong>
                  <p>A pickup OTP has been assigned to {renter.name.split(' ')[0]}. Contact via WhatsApp to coordinate meetup.</p>
                </div>
                <Link to="/messages" className={styles.msgLink}>
                  <Button size="sm" variant="outline" icon={MessageSquare}>Open Chat</Button>
                </Link>
              </div>
            ) : (
              <div className={styles.declinedBanner}>
                <p>Request declined. The calendar dates have been freed up.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
