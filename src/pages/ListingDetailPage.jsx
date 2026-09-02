import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Star, MapPin, ShieldCheck, Zap, Calendar, 
  CheckCircle2, Clock, Info, ArrowLeft, MessageSquare, AlertCircle
} from 'lucide-react';
import listingsData from '../data/listings.json';
import usersData from '../data/users.json';
import { useBookingStore } from '../store/bookingStore';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import styles from './ListingDetailPage.module.css';

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = listingsData.find(l => l.id === id) || listingsData[0];
  const owner = usersData.find(u => u.id === listing.ownerId) || usersData[1];

  const { setListing, setDateRange } = useBookingStore();

  // Booking widget form state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [startDate, setStartDate] = useState('2026-09-10');
  const [endDate, setEndDate] = useState('2026-09-13');

  // Compute number of days between dates
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const totalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const rentTotal = listing.pricePerDay * totalDays;
  const platformFee = Math.round(rentTotal * 0.1);
  const securityDeposit = listing.securityDeposit;
  const grandTotal = rentTotal + platformFee + securityDeposit;

  const handleProceedToConfirm = () => {
    setListing(listing);
    setDateRange(startDate, endDate, totalDays);
    navigate(`/listings/${listing.id}/confirm`);
  };

  return (
    <div className={`container ${styles.detailContainer}`}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link to="/search" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Back to search</span>
        </Link>
        <span className={styles.crumbSep}>/</span>
        <span>{listing.categoryLabel}</span>
        <span className={styles.crumbSep}>/</span>
        <span className={styles.crumbActive}>{listing.title}</span>
      </div>

      {/* Main Title Header */}
      <div className={styles.titleHeader}>
        <div>
          <div className={styles.badgeRow}>
            {listing.instantBooking && (
              <Badge variant="teal" icon={Zap}>Instant Book</Badge>
            )}
            <Badge variant="gray">{listing.categoryLabel}</Badge>
          </div>
          <h1 className={styles.title}>{listing.title}</h1>
          <div className={styles.metaRow}>
            <div className={styles.rating}>
              <Star size={15} className={styles.starIcon} />
              <strong>{listing.rating}</strong>
              <span className={styles.reviewCount}>({listing.reviewsCount} reviews)</span>
            </div>
            <span>•</span>
            <div className={styles.location}>
              <MapPin size={15} />
              <span>{listing.location.neighborhood}, {listing.location.city} ({listing.location.distance})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className={styles.gallery}>
        <div className={styles.mainImageWrapper}>
          <img
            src={listing.images[selectedImageIndex] || listing.images[0]}
            alt={listing.title}
            className={styles.mainImage}
          />
        </div>
        <div className={styles.thumbnails}>
          {listing.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className={`${styles.thumbBtn} ${selectedImageIndex === idx ? styles.thumbActive : ''}`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} />
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Layout: Details (left) and Sticky Booking Widget (right) */}
      <div className={styles.contentLayout}>
        {/* Left: Detailed Information */}
        <div className={styles.leftCol}>
          {/* Owner Profile Card */}
          <div className={styles.ownerCard}>
            <img src={owner.avatar} alt={owner.name} className={styles.ownerAvatar} />
            <div className={styles.ownerDetails}>
              <div className={styles.ownerNameRow}>
                <h3>Hosted by {owner.name}</h3>
                {owner.verified && (
                  <Badge variant="teal" size="sm" icon={ShieldCheck}>Verified ID</Badge>
                )}
              </div>
              <p className={styles.ownerBio}>{owner.bio}</p>
              <div className={styles.ownerStats}>
                <span>★ {owner.rating} ({owner.reviewsCount} ratings)</span>
                <span>•</span>
                <span>Responds in {owner.responseTime}</span>
                <span>•</span>
                <span>Member since {owner.memberSince}</span>
              </div>
            </div>
            <Link to="/messages" className={styles.chatBtnWrapper}>
              <Button variant="outline" size="sm" icon={MessageSquare}>
                Chat
              </Button>
            </Link>
          </div>

          <hr className={styles.divider} />

          {/* Description */}
          <section className={styles.section}>
            <h2>About this item</h2>
            <p className={styles.descriptionText}>{listing.description}</p>
          </section>

          <hr className={styles.divider} />

          {/* Specifications Grid */}
          <section className={styles.section}>
            <h2>Technical Specifications</h2>
            <div className={styles.specsGrid}>
              {listing.specs.map((spec, idx) => (
                <div key={idx} className={styles.specItem}>
                  <span className={styles.specLabel}>{spec.label}</span>
                  <span className={styles.specValue}>{spec.value}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className={styles.divider} />

          {/* Included Accessories */}
          <section className={styles.section}>
            <h2>What's included in the box</h2>
            <ul className={styles.includedList}>
              {listing.included.map((item, idx) => (
                <li key={idx} className={styles.includedItem}>
                  <CheckCircle2 size={16} className={styles.includedCheck} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <hr className={styles.divider} />

          {/* Peace of Mind Guarantee */}
          <div className={styles.guaranteeBox}>
            <ShieldCheck size={28} className={styles.guaranteeIcon} />
            <div>
              <h4>RentAny ₹1 Lakh Damage Protection</h4>
              <p>
                Every rental booked on RentAny includes verified ID checks and insurance coverage for accidental damage. Your security deposit is held securely in escrow.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Sticky Booking Calculator Widget */}
        <div className={styles.rightCol}>
          <div className={styles.bookingCard}>
            <div className={styles.cardPriceRow}>
              <div>
                <span className={styles.priceAmount}>₹{listing.pricePerDay.toLocaleString('en-IN')}</span>
                <span className={styles.pricePer}> / day</span>
              </div>
              <div className={styles.cardDeposit}>
                Deposit: ₹{listing.securityDeposit.toLocaleString('en-IN')} (refundable)
              </div>
            </div>

            {/* Date Pickers */}
            <div className={styles.datePickerContainer}>
              <div className={styles.dateField}>
                <label>PICKUP DATE</label>
                <div className={styles.inputWithIcon}>
                  <Calendar size={15} />
                  <input
                    type="date"
                    value={startDate}
                    min="2026-09-02"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.dateField}>
                <label>RETURN DATE</label>
                <div className={styles.inputWithIcon}>
                  <Calendar size={15} />
                  <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.handoverInfo}>
              <Clock size={14} />
              <span>Standard Handover: 10:00 AM • Return: 06:00 PM</span>
            </div>

            {/* Live Price Breakdown Calculation */}
            <div className={styles.breakdown}>
              <div className={styles.breakdownRow}>
                <span>₹{listing.pricePerDay} × {totalDays} {totalDays === 1 ? 'day' : 'days'}</span>
                <span>₹{rentTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.breakdownRow}>
                <span className={styles.feeWithInfo}>
                  Platform Trust & Protection fee (10%)
                  <Info size={13} title="Covers verification and 24/7 Bengaluru support" />
                </span>
                <span>₹{platformFee.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.breakdownRow}>
                <span className={styles.feeWithInfo}>
                  Refundable Security Deposit
                  <Info size={13} title="Returned within 4 hours of condition inspection" />
                </span>
                <span>₹{securityDeposit.toLocaleString('en-IN')}</span>
              </div>

              <div className={styles.breakdownTotal}>
                <span>Total Due Today</span>
                <span className={styles.totalValue}>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
              <p className={styles.escrowNotice}>
                * Your security deposit (₹{securityDeposit.toLocaleString('en-IN')}) is 100% refunded when item is returned in good condition.
              </p>
            </div>

            {/* Primary Action Button */}
            <Button
              size="lg"
              fullWidth
              variant="primary"
              onClick={handleProceedToConfirm}
              icon={Zap}
            >
              Request to Rent • ₹{grandTotal.toLocaleString('en-IN')}
            </Button>

            <div className={styles.guaranteeSnippet}>
              <ShieldCheck size={14} />
              <span>Free cancellation up to 24 hours before pickup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
