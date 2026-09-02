import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle, Star, ArrowRight, ShieldCheck, 
  MessageSquare, Sparkles 
} from 'lucide-react';
import rentalsData from '../data/rentals.json';
import listingsData from '../data/listings.json';
import usersData from '../data/users.json';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import styles from './RentalCompletePage.module.css';

export default function RentalCompletePage() {
  const { id } = useParams();
  const rental = rentalsData.find(r => r.id === id) || rentalsData[0];
  const listing = listingsData.find(l => l.id === rental.listingId) || listingsData[0];
  const owner = usersData.find(u => u.id === rental.ownerId) || usersData[1];

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('Equipment was in pristine condition and worked flawlessly for my shoot!');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  return (
    <div className={`container ${styles.completePage}`}>
      <div className={styles.completeCard}>
        <div className={styles.iconCircle}>
          <CheckCircle size={44} />
        </div>

        <Badge variant="green" size="md">Rental Successfully Concluded</Badge>

        <h1 className={styles.heading}>Equipment Returned & Approved!</h1>
        <p className={styles.subheading}>
          {owner.name} confirmed the return of <strong>{listing.title}</strong>.
        </p>

        {/* Deposit Refund Notification Box */}
        <div className={styles.refundBox}>
          <div className={styles.refundHeader}>
            <ShieldCheck size={18} />
            <span>ESCROW REFUND INITIATED</span>
          </div>
          <div className={styles.refundAmount}>₹{rental.securityDeposit.toLocaleString('en-IN')}</div>
          <p className={styles.refundNotice}>
            Refund sent back to your original payment UPI ID. Credited to your bank account within 2-4 hours.
          </p>
        </div>

        {/* Review Form */}
        <div className={styles.reviewSection}>
          <h2 className={styles.reviewTitle}>How was your experience with {owner.name.split(' ')[0]}?</h2>
          
          <div className={styles.starRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`${styles.starBtn} ${star <= rating ? styles.starFilled : ''}`}
              >
                <Star size={28} />
              </button>
            ))}
          </div>

          <textarea
            rows={3}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share feedback on gear condition, handover punctuality..."
            className={styles.reviewInput}
          />

          <Button
            variant="primary"
            disabled={reviewSubmitted}
            onClick={() => setReviewSubmitted(true)}
            icon={Sparkles}
          >
            {reviewSubmitted ? '✓ Review Published' : 'Post Public Review'}
          </Button>
        </div>

        {/* Next actions */}
        <div className={styles.bottomActions}>
          <Link to="/search">
            <Button variant="outline" size="md" icon={ArrowRight} iconPosition="right">
              Explore More Gear in Bengaluru
            </Button>
          </Link>
          <Link to="/rentals">
            <Button variant="ghost" size="md">
              View Rental History
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
