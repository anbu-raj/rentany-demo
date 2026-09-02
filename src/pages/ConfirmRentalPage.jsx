import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, Calendar, Clock, MapPin, 
  CreditCard, Check, ArrowLeft, Lock, Smartphone
} from 'lucide-react';
import { useBookingStore } from '../store/bookingStore';
import listingsData from '../data/listings.json';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import styles from './ConfirmRentalPage.module.css';

export default function ConfirmRentalPage() {
  const navigate = useNavigate();
  const { listing: storeListing, startDate, endDate, totalDays } = useBookingStore();
  
  // Fallback to first listing if navigated directly
  const listing = storeListing || listingsData[0];

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [upiId, setUpiId] = useState('arjun.mehta@oksbi');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const rentAmount = listing.pricePerDay * totalDays;
  const platformFee = Math.round(rentAmount * 0.1);
  const securityDeposit = listing.securityDeposit;
  const grandTotal = rentAmount + platformFee + securityDeposit;

  const handleConfirmPay = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate(`/listings/${listing.id}/confirmed`);
    }, 900);
  };

  return (
    <div className={`container ${styles.pageContainer}`}>
      {/* Back button */}
      <Link to={`/listings/${listing.id}`} className={styles.backLink}>
        <ArrowLeft size={16} />
        <span>Modify reservation details</span>
      </Link>

      <h1 className={styles.pageTitle}>Review & Confirm Rental</h1>
      <p className={styles.pageSubtitle}>
        Your booking is secured by RentAny Escrow. The owner is notified immediately.
      </p>

      <div className={styles.layout}>
        {/* Left Column: Handover details & Payment options */}
        <div className={styles.leftCol}>
          {/* Pickup & Return Logistics */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Pickup & Handover Details</h2>
            
            <div className={styles.logisticsGrid}>
              <div className={styles.logisticsItem}>
                <div className={styles.logisticsIconWrap}>
                  <Calendar size={18} />
                </div>
                <div>
                  <span className={styles.logisticsLabel}>Dates</span>
                  <strong>{startDate} to {endDate} ({totalDays} days)</strong>
                </div>
              </div>

              <div className={styles.logisticsItem}>
                <div className={styles.logisticsIconWrap}>
                  <Clock size={18} />
                </div>
                <div>
                  <span className={styles.logisticsLabel}>Handover Schedule</span>
                  <strong>Pickup 10:00 AM • Return 06:00 PM</strong>
                </div>
              </div>

              <div className={styles.logisticsItem}>
                <div className={styles.logisticsIconWrap}>
                  <MapPin size={18} />
                </div>
                <div>
                  <span className={styles.logisticsLabel}>Location Landmark</span>
                  <strong>{listing.location.neighborhood}, {listing.location.city}</strong>
                  <p className={styles.hint}>Exact street address revealed upon booking confirmation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Payment Method</h2>
            
            <div className={styles.paymentOptions}>
              {/* UPI Option */}
              <label className={`${styles.paymentOption} ${paymentMethod === 'upi' ? styles.optionSelected : ''}`}>
                <div className={styles.optionRadio}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                  />
                  <Smartphone size={18} />
                  <span>Instant UPI (GPay / PhonePe / Paytm)</span>
                </div>
                <Badge variant="green" size="sm">0% Surcharge</Badge>
              </label>

              {paymentMethod === 'upi' && (
                <div className={styles.upiInputBox}>
                  <label>Enter UPI ID (VPA)</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@upi"
                  />
                  <span className={styles.upiNote}>A collect request will be pushed to your UPI app.</span>
                </div>
              )}

              {/* Card Option */}
              <label className={`${styles.paymentOption} ${paymentMethod === 'card' ? styles.optionSelected : ''}`}>
                <div className={styles.optionRadio}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <CreditCard size={18} />
                  <span>Credit / Debit Card (Visa, Mastercard, RuPay)</span>
                </div>
              </label>
            </div>
          </div>

          {/* Cancellation & Protection Policy */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Cancellation & Escrow Policy</h2>
            <ul className={styles.policyList}>
              <li>
                <strong>Free cancellation</strong> up to 24 hours before pickup time.
              </li>
              <li>
                <strong>Security Deposit:</strong> Held safely by RentAny and released automatically within 4 hours after return inspection.
              </li>
              <li>
                <strong>Inspection Code:</strong> A 4-digit code will be generated on your dashboard to unlock the item at meetup.
              </li>
            </ul>

            <label className={styles.termsCheckbox}>
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
              />
              <span>
                I agree to the <a href="#terms">Rental Agreement</a>, verified ID presentation guidelines, and equipment care requirements.
              </span>
            </label>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className={styles.rightCol}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Rental Summary</h2>

            {/* Item Mini Card */}
            <div className={styles.itemSnippet}>
              <img src={listing.images[0]} alt={listing.title} className={styles.snippetImg} />
              <div className={styles.snippetDetails}>
                <span className={styles.snippetCategory}>{listing.categoryLabel}</span>
                <h3 className={styles.snippetTitle}>{listing.title}</h3>
                <span className={styles.snippetLoc}>📍 {listing.location.neighborhood}</span>
              </div>
            </div>

            <hr className={styles.summaryDivider} />

            {/* Price Details */}
            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Daily Rental (₹{listing.pricePerDay} × {totalDays} days)</span>
                <span>₹{rentAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Platform Trust & Guarantee (10%)</span>
                <span>₹{platformFee.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Refundable Security Deposit</span>
                <span>₹{securityDeposit.toLocaleString('en-IN')}</span>
              </div>

              <div className={styles.summaryTotalRow}>
                <div>
                  <strong>Total Amount to Pay</strong>
                  <span className={styles.depositNote}>Includes ₹{securityDeposit.toLocaleString('en-IN')} refundable deposit</span>
                </div>
                <strong className={styles.totalValue}>₹{grandTotal.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* Confirm & Pay Button */}
            <Button
              size="lg"
              fullWidth
              variant="primary"
              loading={submitting}
              disabled={!agreedTerms}
              onClick={handleConfirmPay}
              icon={Lock}
            >
              Pay ₹{grandTotal.toLocaleString('en-IN')} via UPI
            </Button>

            <div className={styles.securitySeal}>
              <ShieldCheck size={16} />
              <span>256-bit Encrypted Bank-Grade Escrow</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
