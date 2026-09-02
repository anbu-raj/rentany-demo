import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, UploadCloud, 
  Camera, Gamepad2, Compass, Radio, Wrench, Tv, Sparkles, ShieldCheck 
} from 'lucide-react';
import { useWizardStore } from '../../../store/wizardStore';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import styles from './ListingWizard.module.css';

const CATEGORY_OPTIONS = [
  { id: 'cameras', label: 'Cameras & Lenses', icon: Camera },
  { id: 'drones', label: 'Drones & Aerial', icon: Compass },
  { id: 'gaming', label: 'Gaming Consoles', icon: Gamepad2 },
  { id: 'audio', label: 'Podcast & Audio', icon: Radio },
  { id: 'tools', label: 'Power Tools', icon: Wrench },
  { id: 'electronics', label: 'Displays & Projectors', icon: Tv }
];

export default function ListingWizard() {
  const navigate = useNavigate();
  const { step, formData, setStep, nextStep, prevStep, updateField, resetWizard } = useWizardStore();

  const handlePublish = () => {
    // Navigate to manage listings after publish
    resetWizard();
    navigate('/dashboard/listings');
  };

  return (
    <div className={`container ${styles.wizardContainer}`}>
      <Link to="/dashboard" className={styles.backLink}>
        <ArrowLeft size={16} />
        <span>Exit Listing Wizard</span>
      </Link>

      {/* Wizard Progress Stepper */}
      <div className={styles.stepperCard}>
        <div className={styles.stepperHeader}>
          <div>
            <span className={styles.stepBadge}>Step {step} of 4</span>
            <h1 className={styles.wizardTitle}>
              {step === 1 && 'Item Basics & Category'}
              {step === 2 && 'Upload Clear Gear Photos'}
              {step === 3 && 'Pricing & Security Deposit'}
              {step === 4 && 'Preview & Publish to Bengaluru'}
            </h1>
          </div>
          <div className={styles.progressIndicator}>
            <div className={styles.progressBar} style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>
        </div>
      </div>

      {/* Wizard Content Shell */}
      <div className={styles.contentCard}>
        {/* STEP 1: BASICS */}
        {step === 1 && (
          <div className={styles.stepForm}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Select Category</label>
              <div className={styles.catGrid}>
                {CATEGORY_OPTIONS.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = formData.category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => updateField('category', cat.id)}
                      className={`${styles.catButton} ${isSelected ? styles.catSelected : ''}`}
                    >
                      <Icon size={22} className={styles.catIcon} />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Item Listing Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="e.g. Fujifilm X-T5 Mirrorless Camera + 18-55mm Kit"
                className={styles.input}
              />
              <span className={styles.fieldHint}>Include brand, model, and key attached lenses/parts.</span>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Description & Included Accessories</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Describe current condition, recent servicing, included battery count, SD card storage, and carrying bag..."
                className={styles.textarea}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Pickup Neighborhood (Bengaluru)</label>
              <input
                type="text"
                value={formData.neighborhood}
                onChange={(e) => updateField('neighborhood', e.target.value)}
                placeholder="Indiranagar, Koramangala, HSR..."
                className={styles.input}
              />
            </div>
          </div>
        )}

        {/* STEP 2: PHOTOS */}
        {step === 2 && (
          <div className={styles.stepForm}>
            <div className={styles.photoUploadArea}>
              <UploadCloud size={40} className={styles.cloudIcon} />
              <h3>Drag & drop equipment photos</h3>
              <p>High resolution photos increase booking inquiries by 3.5x</p>
              <Button size="sm" variant="outline">Browse Local Files</Button>
            </div>

            <div className={styles.mockUploadList}>
              <div className={styles.mockPhoto}>
                <img
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80"
                  alt="Front Angle"
                />
                <span className={styles.coverBadge}>Primary Cover</span>
              </div>

              <div className={styles.mockPhoto}>
                <img
                  src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&auto=format&fit=crop&q=80"
                  alt="Accessories"
                />
              </div>

              <div className={styles.addSlot}>
                <span>+ Add Slot</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PRICING */}
        {step === 3 && (
          <div className={styles.stepForm}>
            <div className={styles.pricingGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Rental Rate / Day (₹)</label>
                <div className={styles.inputPrefix}>
                  <span>₹</span>
                  <input
                    type="number"
                    value={formData.pricePerDay || 1200}
                    onChange={(e) => updateField('pricePerDay', Number(e.target.value))}
                    placeholder="1200"
                  />
                </div>
                <span className={styles.fieldHint}>Average cameras rent for ₹1,200 - ₹1,800/day in Indiranagar.</span>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Security Deposit (Escrow) (₹)</label>
                <div className={styles.inputPrefix}>
                  <span>₹</span>
                  <input
                    type="number"
                    value={formData.securityDeposit || 10000}
                    onChange={(e) => updateField('securityDeposit', Number(e.target.value))}
                    placeholder="10000"
                  />
                </div>
                <span className={styles.fieldHint}>Held safely by RentAny and refunded to renter on return.</span>
              </div>
            </div>

            <div className={styles.guaranteeCallout}>
              <ShieldCheck size={24} className={styles.shieldIcon} />
              <div>
                <strong>₹1 Lakh Host Protection Guarantee</strong>
                <p>All items on RentAny are automatically insured against accidental damage or loss during verified bookings.</p>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.toggleRow}>
                <input
                  type="checkbox"
                  checked={formData.instantBooking}
                  onChange={(e) => updateField('instantBooking', e.target.checked)}
                />
                <div>
                  <strong>Allow Instant Booking</strong>
                  <p className={styles.fieldHint}>Renter can reserve directly without waiting for manual acceptance.</p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* STEP 4: PREVIEW */}
        {step === 4 && (
          <div className={styles.stepForm}>
            <div className={styles.previewNotice}>
              <Sparkles size={18} className={styles.sparkle} />
              <span>Here is how your equipment will look to thousands of verified Bengaluru creators:</span>
            </div>

            <div className={styles.previewCard}>
              <img
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80"
                alt="Listing preview"
                className={styles.previewImg}
              />
              <div className={styles.previewInfo}>
                <Badge variant="teal">Instant Bookable</Badge>
                <h3 className={styles.previewTitle}>
                  {formData.title || 'Fujifilm X-T5 Mirrorless Camera + 18-55mm Kit'}
                </h3>
                <p className={styles.previewDesc}>
                  {formData.description || 'Spotless condition camera with 2 extra batteries, charger, and weatherproof carrying case.'}
                </p>
                <div className={styles.previewPricing}>
                  <strong className={styles.previewPrice}>₹{formData.pricePerDay || 1200} / day</strong>
                  <span className={styles.previewDeposit}>Deposit: ₹{formData.securityDeposit || 10000}</span>
                </div>
                <span className={styles.previewLoc}>📍 {formData.neighborhood || 'Indiranagar, Bengaluru'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation */}
        <div className={styles.footerButtons}>
          {step > 1 && (
            <Button variant="ghost" onClick={prevStep} icon={ArrowLeft}>
              Back
            </Button>
          )}

          <div className={styles.spacer}></div>

          {step < 4 ? (
            <Button variant="primary" onClick={nextStep} icon={ArrowRight} iconPosition="right">
              Continue to Step {step + 1}
            </Button>
          ) : (
            <Button variant="primary" size="lg" onClick={handlePublish} icon={CheckCircle2}>
              Publish Live Listing
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
