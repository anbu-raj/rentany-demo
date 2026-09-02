import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ShieldCheck, Zap } from 'lucide-react';
import Badge from '../ui/Badge';
import usersData from '../../data/users.json';
import styles from './ListingCard.module.css';

export default function ListingCard({ listing }) {
  const owner = usersData.find(u => u.id === listing.ownerId) || usersData[1];

  return (
    <Link to={`/listings/${listing.id}`} className={styles.card}>
      {/* Image Header with Aspect Ratio 4:3 */}
      <div className={styles.imageWrapper}>
        <img
          src={listing.images[0]}
          alt={listing.title}
          className={styles.image}
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className={styles.imageOverlay}>
          {listing.instantBooking && (
            <Badge variant="teal" size="sm" icon={Zap}>
              Instant Book
            </Badge>
          )}
          <span className={styles.categoryPill}>
            {listing.categoryLabel}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className={styles.content}>
        {/* Rating & Location Row */}
        <div className={styles.topMeta}>
          <div className={styles.rating}>
            <Star size={14} className={styles.starIcon} />
            <span className={styles.score}>{listing.rating}</span>
            <span className={styles.reviews}>({listing.reviewsCount})</span>
          </div>
          <div className={styles.location}>
            <MapPin size={13} />
            <span>{listing.location.neighborhood}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className={styles.title} title={listing.title}>
          {listing.title}
        </h3>

        {/* Price and Owner Info */}
        <div className={styles.bottomRow}>
          <div className={styles.pricing}>
            <span className={styles.currency}>₹</span>
            <span className={styles.price}>{listing.pricePerDay.toLocaleString('en-IN')}</span>
            <span className={styles.perDay}>/day</span>
          </div>

          <div className={styles.ownerInfo}>
            <img src={owner.avatar} alt={owner.name} className={styles.ownerAvatar} />
            <span className={styles.ownerName}>{owner.name.split(' ')[0]}</span>
            {owner.verified && <ShieldCheck size={14} className={styles.verifiedIcon} title="Verified ID" />}
          </div>
        </div>
      </div>
    </Link>
  );
}
