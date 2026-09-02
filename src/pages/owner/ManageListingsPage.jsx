import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Eye, PauseCircle, PlayCircle, Star, ArrowLeft } from 'lucide-react';
import listingsData from '../../data/listings.json';
import usersData from '../../data/users.json';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import styles from './ManageListingsPage.module.css';

export default function ManageListingsPage() {
  const owner = usersData[1]; // Priya
  const [listings, setListings] = useState(
    listingsData.filter(l => l.ownerId === owner.id).map(l => ({ ...l, status: 'active' }))
  );

  const toggleStatus = (id) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: item.status === 'active' ? 'paused' : 'active' };
      }
      return item;
    }));
  };

  return (
    <div className={`container ${styles.managePage}`}>
      <Link to="/dashboard" className={styles.backLink}>
        <ArrowLeft size={16} />
        <span>Back to Host Dashboard</span>
      </Link>

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Manage Listed Equipment</h1>
          <p className={styles.subtitle}>
            You have {listings.length} items listed in Bengaluru. Pause availability anytime for personal use.
          </p>
        </div>

        <Link to="/list">
          <Button variant="primary" icon={PlusCircle}>
            List New Gear
          </Button>
        </Link>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Equipment</th>
              <th>Category</th>
              <th>Daily Rate</th>
              <th>Status</th>
              <th>Rating</th>
              <th className={styles.alignRight}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className={styles.itemCell}>
                    <img src={item.images[0]} alt={item.title} className={styles.itemThumb} />
                    <div>
                      <strong className={styles.itemTitle}>{item.title}</strong>
                      <span className={styles.itemLoc}>📍 {item.location.neighborhood}</span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className={styles.categoryText}>{item.categoryLabel}</span>
                </td>

                <td>
                  <span className={styles.rateText}>₹{item.pricePerDay}</span>
                  <span className={styles.subRate}> (Dep: ₹{item.securityDeposit})</span>
                </td>

                <td>
                  <Badge variant={item.status === 'active' ? 'green' : 'gray'}>
                    {item.status === 'active' ? 'Active & Bookable' : 'Paused by Host'}
                  </Badge>
                </td>

                <td>
                  <div className={styles.ratingCell}>
                    <Star size={13} className={styles.starIcon} />
                    <span>{item.rating} ({item.reviewsCount})</span>
                  </div>
                </td>

                <td className={styles.alignRight}>
                  <div className={styles.actionRow}>
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className={styles.iconAction}
                      title={item.status === 'active' ? 'Pause Listing' : 'Resume Listing'}
                    >
                      {item.status === 'active' ? <PauseCircle size={18} /> : <PlayCircle size={18} />}
                    </button>

                    <Link to={`/listings/${item.id}`} className={styles.iconAction} title="View Live Page">
                      <Eye size={18} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
