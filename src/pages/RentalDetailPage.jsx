import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, Calendar, Clock, MapPin, Key, 
  MessageSquare, AlertTriangle, ArrowLeft, CheckCircle2, Phone 
} from 'lucide-react';
import rentalsData from '../data/rentals.json';
import listingsData from '../data/listings.json';
import usersData from '../data/users.json';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import styles from './RentalDetailPage.module.css';

export default function RentalDetailPage() {
  const { id } = useParams();
  const rental = rentalsData.find(r => r.id === id) || rentalsData[0];
  const listing = listingsData.find(l => l.id === rental.listingId) || listingsData[0];
  const owner = usersData.find(u => u.id === rental.ownerId) || usersData[1];

  return (
    <div className={`container ${styles.detailPage}`}>
      <Link to="/rentals" className={styles.backLink}>
        <ArrowLeft size={16} />
        <span>Back to My Rentals</span>
      </Link>

      {/* Header Banner */}
      <div className={styles.headerCard}>
        <div className={styles.headerInfo}>
          <div className={styles.badgeRow}>
            {rental.status === 'active' && <Badge variant="green" size="md">Rental Currently Active</Badge>}
            {rental.status === 'confirmed' && <Badge variant="teal" size="md">Confirmed • Ready for Pickup</Badge>}
            <span className={styles.rentalCode}>{rental.rentalCode}</span>
          </div>
          <h1 className={styles.itemTitle}>{listing.title}</h1>
          <p className={styles.timeNotice}>
            Rental window: <strong>{rental.startDate} 10:00 AM</strong> to <strong>{rental.endDate} 06:00 PM</strong>
          </p>
        </div>

        <div className={styles.headerActions}>
          <Link to={`/rentals/${rental.id}/return`}>
            <Button size="lg" variant="primary">
              Return Gear & Release Deposit
            </Button>
          </Link>
          <Link to="/messages">
            <Button size="lg" variant="outline" icon={MessageSquare}>
              Chat Host
            </Button>
          </Link>
        </div>
      </div>

      {/* 2-Col layout */}
      <div className={styles.layout}>
        {/* Left Col */}
        <div className={styles.leftCol}>
          {/* Active Handover Status Card */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Rental Lifecycle Status</h2>
            
            <div className={styles.timeline}>
              <div className={`${styles.timelineStep} ${styles.stepComplete}`}>
                <div className={styles.stepDot}><CheckCircle2 size={16} /></div>
                <div>
                  <strong>Booking Reserved & Deposit Escrowed</strong>
                  <p>Paid ₹{rental.totalCharged.toLocaleString('en-IN')} via UPI</p>
                </div>
              </div>

              <div className={`${styles.timelineStep} ${styles.stepComplete}`}>
                <div className={styles.stepDot}><CheckCircle2 size={16} /></div>
                <div>
                  <strong>In-Person Item Handover Complete</strong>
                  <p>Handover OTP verified by {owner.name} in Indiranagar</p>
                </div>
              </div>

              <div className={`${styles.timelineStep} ${styles.stepActive}`}>
                <div className={styles.stepDotActive}></div>
                <div>
                  <strong>Active Rental Period</strong>
                  <p>Return scheduled before {rental.endDate} at 6:00 PM</p>
                </div>
              </div>

              <div className={styles.timelineStep}>
                <div className={styles.stepDotPending}></div>
                <div>
                  <strong>Return Inspection & Deposit Refund</strong>
                  <p>Owner inspects condition & ₹{rental.securityDeposit.toLocaleString('en-IN')} auto-refunds</p>
                </div>
              </div>
            </div>
          </div>

          {/* Included Accessories Checklist */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Equipment Checklist for Return</h2>
            <p className={styles.checklistSubtitle}>
              Please verify all original parts are packed before meeting {owner.name.split(' ')[0]}:
            </p>
            <ul className={styles.checklist}>
              {listing.included.map((item, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} className={styles.tealCheck} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Col */}
        <div className={styles.rightCol}>
          {/* Host Info Box */}
          <div className={styles.card}>
            <h3 className={styles.sideTitle}>Host Details</h3>
            <div className={styles.hostProfile}>
              <img src={owner.avatar} alt={owner.name} className={styles.hostAvatar} />
              <div>
                <strong>{owner.name}</strong>
                <span className={styles.hostRole}>Verified Owner • {owner.rating} ★</span>
              </div>
            </div>

            <div className={styles.contactRow}>
              <Phone size={15} />
              <span>{owner.phone}</span>
            </div>

            <div className={styles.contactRow}>
              <MapPin size={15} />
              <span>{rental.pickupLocation}</span>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className={styles.card}>
            <h3 className={styles.sideTitle}>Financial Summary</h3>
            <div className={styles.finRow}>
              <span>Daily Rate ({rental.totalDays} days)</span>
              <span>₹{rental.rentAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className={styles.finRow}>
              <span>Platform Fee (10%)</span>
              <span>₹{rental.platformFee.toLocaleString('en-IN')}</span>
            </div>
            <div className={styles.finRow}>
              <span>Security Deposit (Escrow)</span>
              <span className={styles.depositHighlight}>₹{rental.securityDeposit.toLocaleString('en-IN')}</span>
            </div>
            <hr className={styles.finDivider} />
            <div className={styles.finTotal}>
              <span>Total Paid</span>
              <strong>₹{rental.totalCharged.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          {/* Need Help Box */}
          <div className={styles.helpBox}>
            <AlertTriangle size={18} className={styles.helpIcon} />
            <div>
              <strong>Emergency or Issue?</strong>
              <p>RentAny Bengaluru local support is available 24/7 on WhatsApp: +91 80 4912 0000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
