import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, CheckCircle2, AlertCircle, ArrowRight, 
  MapPin, ShieldCheck, ChevronRight 
} from 'lucide-react';
import rentalsData from '../data/rentals.json';
import listingsData from '../data/listings.json';
import usersData from '../data/users.json';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import styles from './MyRentalsPage.module.css';

export default function MyRentalsPage() {
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'upcoming' | 'completed'

  // Filter rentals for Arjun (usr_001)
  const myRentals = rentalsData.filter(r => r.renterId === 'usr_001');

  const filtered = myRentals.filter((rental) => {
    if (activeTab === 'active') return rental.status === 'active';
    if (activeTab === 'upcoming') return rental.status === 'confirmed' || rental.status === 'pending';
    if (activeTab === 'completed') return rental.status === 'completed';
    return true;
  });

  return (
    <div className={`container ${styles.rentalsPage}`}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>My Equipment Rentals</h1>
          <p className={styles.subtitle}>Track active handovers, return timelines, and escrow deposits.</p>
        </div>
        <Link to="/search">
          <Button variant="outline" size="sm">Browse More Gear</Button>
        </Link>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabs}>
        <button
          onClick={() => setActiveTab('active')}
          className={`${styles.tabBtn} ${activeTab === 'active' ? styles.tabActive : ''}`}
        >
          Active Rentals (1)
        </button>
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`${styles.tabBtn} ${activeTab === 'upcoming' ? styles.tabActive : ''}`}
        >
          Upcoming Bookings (1)
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`${styles.tabBtn} ${activeTab === 'completed' ? styles.tabActive : ''}`}
        >
          Past History (1)
        </button>
      </div>

      {/* Rentals List */}
      <div className={styles.list}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <p>No rentals in this status tab.</p>
          </div>
        ) : (
          filtered.map((rental) => {
            const listing = listingsData.find(l => l.id === rental.listingId) || listingsData[0];
            const owner = usersData.find(u => u.id === rental.ownerId) || usersData[1];

            return (
              <div key={rental.id} className={styles.rentalCard}>
                <img src={listing.images[0]} alt={listing.title} className={styles.itemImg} />

                <div className={styles.cardContent}>
                  <div className={styles.topRow}>
                    <div className={styles.badgeWrap}>
                      {rental.status === 'active' && <Badge variant="green">Active Rental</Badge>}
                      {rental.status === 'confirmed' && <Badge variant="teal">Confirmed Pickup</Badge>}
                      {rental.status === 'completed' && <Badge variant="gray">Completed & Deposit Returned</Badge>}
                      <span className={styles.codeText}>{rental.rentalCode}</span>
                    </div>
                    <span className={styles.priceTag}>Total: ₹{rental.totalCharged.toLocaleString('en-IN')}</span>
                  </div>

                  <h3 className={styles.itemTitle}>{listing.title}</h3>

                  <div className={styles.metaGrid}>
                    <div>
                      <span className={styles.metaLabel}>Rental Duration</span>
                      <strong>{rental.startDate} → {rental.endDate} ({rental.totalDays} days)</strong>
                    </div>

                    <div>
                      <span className={styles.metaLabel}>Host</span>
                      <strong>{owner.name} ({owner.phone})</strong>
                    </div>

                    <div className={styles.pickupLoc}>
                      <span className={styles.metaLabel}>Handover Location</span>
                      <div className={styles.locWithIcon}>
                        <MapPin size={14} />
                        <span>{rental.pickupLocation}</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.escrowStatus}>
                      <ShieldCheck size={16} className={styles.escrowIcon} />
                      <span>Security Deposit: ₹{rental.securityDeposit.toLocaleString('en-IN')} (Safe in Escrow)</span>
                    </div>

                    <div className={styles.footerActions}>
                      {rental.status === 'active' && (
                        <Link to={`/rentals/${rental.id}/return`}>
                          <Button size="sm" variant="primary">
                            Initiate Return Handover
                          </Button>
                        </Link>
                      )}

                      <Link to={`/rentals/${rental.id}`}>
                        <Button size="sm" variant="secondary" icon={ChevronRight} iconPosition="right">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
