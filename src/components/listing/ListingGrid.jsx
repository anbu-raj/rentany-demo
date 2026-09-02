import React from 'react';
import ListingCard from './ListingCard';
import styles from './ListingGrid.module.css';

export default function ListingGrid({ listings = [] }) {
  if (!listings.length) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>No listings found</p>
        <p className={styles.emptySubtitle}>Try adjusting your filters or search keywords.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
