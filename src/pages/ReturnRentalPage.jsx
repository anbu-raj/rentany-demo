import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle2, Camera, AlertCircle, ArrowLeft, 
  ShieldCheck, UploadCloud, Check 
} from 'lucide-react';
import rentalsData from '../data/rentals.json';
import listingsData from '../data/listings.json';
import usersData from '../data/users.json';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import styles from './ReturnRentalPage.module.css';

export default function ReturnRentalPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const rental = rentalsData.find(r => r.id === id) || rentalsData[0];
  const listing = listingsData.find(l => l.id === rental.listingId) || listingsData[0];
  const owner = usersData.find(u => u.id === rental.ownerId) || usersData[1];

  const [uploadedPhotos, setUploadedPhotos] = useState([
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&auto=format&fit=crop&q=80'
  ]);
  const [cleanCheck, setCleanCheck] = useState(true);
  const [accessoriesCheck, setAccessoriesCheck] = useState(true);
  const [workingCheck, setWorkingCheck] = useState(true);
  const [notes, setNotes] = useState('All accessories packed safely. Batteries recharged.');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReturn = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate(`/rentals/${rental.id}/complete`);
    }, 800);
  };

  return (
    <div className={`container ${styles.returnPage}`}>
      <Link to={`/rentals/${rental.id}`} className={styles.backLink}>
        <ArrowLeft size={16} />
        <span>Back to Active Rental</span>
      </Link>

      <div className={styles.header}>
        <Badge variant="teal">Step 1 of 2: Pre-Return Inspection</Badge>
        <h1 className={styles.title}>Ready to Return {listing.title}</h1>
        <p className={styles.subtitle}>
          Complete this quick condition log before meeting {owner.name} to expedite your ₹{rental.securityDeposit.toLocaleString('en-IN')} deposit release.
        </p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>1. Item Condition Photos</h2>
        <p className={styles.sectionDesc}>
          Upload 2-4 quick snaps of the gear showing clean condition and packed components.
        </p>

        <div className={styles.photoGrid}>
          {uploadedPhotos.map((photo, idx) => (
            <div key={idx} className={styles.photoItem}>
              <img src={photo} alt={`Return condition ${idx + 1}`} />
              <span className={styles.photoBadge}>✓ Verified Photo</span>
            </div>
          ))}

          <div className={styles.uploadPlaceholder}>
            <UploadCloud size={24} className={styles.uploadIcon} />
            <span>Add another photo</span>
          </div>
        </div>

        <hr className={styles.divider} />

        <h2 className={styles.sectionTitle}>2. Condition Self-Declaration</h2>
        <div className={styles.checklist}>
          <label className={styles.checkItem}>
            <input
              type="checkbox"
              checked={cleanCheck}
              onChange={(e) => setCleanCheck(e.target.checked)}
            />
            <div>
              <strong>Item is Clean & Free of Foreign Matter</strong>
              <p>No liquid spills, sand, mud, or deep scratches during your rental period.</p>
            </div>
          </label>

          <label className={styles.checkItem}>
            <input
              type="checkbox"
              checked={accessoriesCheck}
              onChange={(e) => setAccessoriesCheck(e.target.checked)}
            />
            <div>
              <strong>All Original Accessories are Present</strong>
              <p>Verified chargers, caps, straps, memory cards, and protective bags.</p>
            </div>
          </label>

          <label className={styles.checkItem}>
            <input
              type="checkbox"
              checked={workingCheck}
              onChange={(e) => setWorkingCheck(e.target.checked)}
            />
            <div>
              <strong>Hardware Functions Properly</strong>
              <p>Powers on, records/operates normally without errors.</p>
            </div>
          </label>
        </div>

        <hr className={styles.divider} />

        <h2 className={styles.sectionTitle}>3. Notes for {owner.name.split(' ')[0]}</h2>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any helpful notes about battery charge or handover time..."
          className={styles.notesTextarea}
        />

        <div className={styles.actions}>
          <Button
            size="lg"
            variant="primary"
            loading={submitting}
            disabled={!cleanCheck || !accessoriesCheck || !workingCheck}
            onClick={handleSubmitReturn}
            icon={CheckCircle2}
          >
            Confirm Inspection & Generate Return Handover
          </Button>
        </div>
      </div>
    </div>
  );
}
