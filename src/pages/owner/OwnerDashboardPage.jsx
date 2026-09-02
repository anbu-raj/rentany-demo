import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, PackageCheck, AlertCircle, Clock, 
  PlusCircle, ArrowRight, Eye, Calendar, DollarSign, ShieldCheck 
} from 'lucide-react';
import rentalsData from '../../data/rentals.json';
import listingsData from '../../data/listings.json';
import usersData from '../../data/users.json';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import styles from './OwnerDashboardPage.module.css';

export default function OwnerDashboardPage() {
  const owner = usersData[1]; // Priya Nair
  
  // Pending incoming requests
  const pendingRequests = rentalsData.filter(r => r.status === 'pending');
  const activeRentals = rentalsData.filter(r => r.status === 'active');
  const ownerListings = listingsData.filter(l => l.ownerId === owner.id);

  return (
    <div className={`container ${styles.dashboardPage}`}>
      {/* Top Header */}
      <div className={styles.header}>
        <div>
          <div className={styles.welcomePill}>
            <ShieldCheck size={14} />
            <span>Verified Gear Host</span>
          </div>
          <h1 className={styles.title}>Host Dashboard — {owner.name}</h1>
          <p className={styles.subtitle}>Manage incoming rental requests, equipment inventory, and payout earnings.</p>
        </div>

        <div className={styles.headerActions}>
          <Link to="/list">
            <Button variant="primary" size="md" icon={PlusCircle}>
              List New Equipment
            </Button>
          </Link>
          <Link to="/dashboard/listings">
            <Button variant="outline" size="md">
              Manage Listings ({ownerListings.length})
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats 4-Card Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>August Earnings</span>
            <div className={styles.statIconWrap}><TrendingUp size={18} /></div>
          </div>
          <div className={styles.statValue}>₹28,450</div>
          <span className={styles.statChange}>+18% from last month</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Active Rented Gear</span>
            <div className={styles.statIconWrap}><PackageCheck size={18} /></div>
          </div>
          <div className={styles.statValue}>{activeRentals.length} Items</div>
          <span className={styles.statSub}>Due for return this week</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Pending Requests</span>
            <div className={`${styles.statIconWrap} ${styles.alertIcon}`}><AlertCircle size={18} /></div>
          </div>
          <div className={styles.statValue}>{pendingRequests.length} Waiting</div>
          <span className={styles.statChangeWarn}>Action required within 12h</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Host Rating</span>
            <div className={styles.statIconWrap}>★</div>
          </div>
          <div className={styles.statValue}>{owner.rating} / 5.0</div>
          <span className={styles.statSub}>{owner.reviewsCount} verified reviews</span>
        </div>
      </div>

      {/* Main Content: Pending Requests + Current Active Equipment */}
      <div className={styles.mainGrid}>
        {/* Left: Incoming Requests to Accept/Decline */}
        <div className={styles.requestsSection}>
          <div className={styles.sectionTitleRow}>
            <h2>Incoming Booking Requests</h2>
            <span className={styles.badgeCount}>{pendingRequests.length} Pending</span>
          </div>

          <div className={styles.requestsList}>
            {pendingRequests.map((req) => {
              const item = listingsData.find(l => l.id === req.listingId) || listingsData[2];
              const renter = usersData.find(u => u.id === req.renterId) || usersData[2];

              return (
                <div key={req.id} className={styles.requestCard}>
                  <div className={styles.reqTop}>
                    <img src={item.images[0]} alt={item.title} className={styles.reqItemImg} />
                    <div className={styles.reqDetails}>
                      <span className={styles.reqCategory}>{item.categoryLabel}</span>
                      <h3 className={styles.reqItemTitle}>{item.title}</h3>
                      <div className={styles.reqDates}>
                        <Calendar size={14} />
                        <span>{req.startDate} to {req.endDate} ({req.totalDays} days)</span>
                      </div>
                    </div>
                    <div className={styles.reqPayout}>
                      <span className={styles.payoutLabel}>Your Payout</span>
                      <strong className={styles.payoutAmount}>₹{req.rentAmount.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>

                  <hr className={styles.cardDivider} />

                  <div className={styles.renterRow}>
                    <div className={styles.renterProfile}>
                      <img src={renter.avatar} alt={renter.name} className={styles.renterAvatar} />
                      <div>
                        <strong>{renter.name}</strong>
                        <span className={styles.renterLocation}>★ {renter.rating} • {renter.location}</span>
                      </div>
                    </div>

                    <div className={styles.actionBtns}>
                      <Link to={`/dashboard/requests/${req.id}`}>
                        <Button size="sm" variant="primary" icon={ArrowRight} iconPosition="right">
                          Review & Accept
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Equipment Status */}
        <div className={styles.activeSection}>
          <div className={styles.sectionTitleRow}>
            <h2>Currently With Renters</h2>
          </div>

          <div className={styles.activeList}>
            {activeRentals.map((act) => {
              const item = listingsData.find(l => l.id === act.listingId) || listingsData[0];
              const renter = usersData.find(u => u.id === act.renterId) || usersData[0];

              return (
                <div key={act.id} className={styles.activeCard}>
                  <div className={styles.activeItemHeader}>
                    <img src={item.images[0]} alt={item.title} className={styles.activeThumb} />
                    <div>
                      <h4 className={styles.activeTitle}>{item.title}</h4>
                      <span className={styles.returnDeadline}>
                        Return Due: <strong>{act.endDate} 06:00 PM</strong>
                      </span>
                    </div>
                  </div>

                  <div className={styles.renterSnippet}>
                    <span>Renter: <strong>{renter.name}</strong> ({renter.phone})</span>
                  </div>

                  <div className={styles.depositShield}>
                    <ShieldCheck size={14} />
                    <span>₹{act.securityDeposit.toLocaleString('en-IN')} Deposit Protected</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
