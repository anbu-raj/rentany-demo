import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Camera, Gamepad2, Compass, Radio, Wrench, Tv, 
  Search, ShieldCheck, Clock, Award, ArrowRight, Zap, CheckCircle2, ChevronRight
} from 'lucide-react';
import listingsData from '../data/listings.json';
import ListingGrid from '../components/listing/ListingGrid';
import Button from '../components/ui/Button';
import styles from './HomePage.module.css';

const CATEGORIES = [
  { id: 'all', label: 'All Gear', icon: Zap },
  { id: 'cameras', label: 'Cameras & Lenses', icon: Camera },
  { id: 'drones', label: 'Drones & Gimbals', icon: Compass },
  { id: 'gaming', label: 'Gaming Consoles', icon: Gamepad2 },
  { id: 'audio', label: 'Podcast & Audio', icon: Radio },
  { id: 'camping', label: 'Camping & Hiking', icon: Compass },
  { id: 'tools', label: 'Power Tools', icon: Wrench },
  { id: 'electronics', label: 'Projectors & VR', icon: Tv }
];

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchLocation, setSearchLocation] = useState('Bengaluru');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredListings = selectedCategory === 'all' 
    ? listingsData 
    : listingsData.filter(l => l.category === selectedCategory);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (searchLocation.trim()) params.set('location', searchLocation.trim());
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <div className={styles.trustBadge}>
              <ShieldCheck size={16} />
              <span>Bangalore's #1 Verified Peer-to-Peer Rental Network</span>
            </div>

            <h1 className={styles.heroTitle}>
              Rent top gear from locals.<br />
              <span className={styles.tealGradient}>Never buy just for the weekend.</span>
            </h1>

            <p className={styles.heroDescription}>
              High-end cinema cameras, DJI drones, PS5 consoles, sound gear and camping equipment — ready for instant pickup right in your neighborhood.
            </p>

            {/* Hero Search Box */}
            <form onSubmit={handleHeroSearch} className={styles.searchBox}>
              <div className={styles.searchField}>
                <span className={styles.fieldLabel}>What gear do you need?</span>
                <div className={styles.fieldInputGroup}>
                  <Search size={18} className={styles.fieldIcon} />
                  <input
                    type="text"
                    placeholder="e.g. Sony A7 IV, PS5, Drone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.divider}></div>

              <div className={styles.searchField}>
                <span className={styles.fieldLabel}>Location</span>
                <div className={styles.fieldInputGroup}>
                  <input
                    type="text"
                    placeholder="Indiranagar, Koramangala..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className={styles.heroSearchBtn}>
                Search Gear
              </Button>
            </form>

            {/* Key trust bullets */}
            <div className={styles.trustRow}>
              <div className={styles.trustItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>₹1 Lakh Damage Protection</span>
              </div>
              <div className={styles.trustItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>DigiLocker Verified Owners</span>
              </div>
              <div className={styles.trustItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>Safe Refundable Escrow</span>
              </div>
            </div>
          </div>

          <div className={styles.heroImageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&auto=format&fit=crop&q=80"
              alt="Community camera handover in Bengaluru"
              className={styles.heroImage}
            />
            <div className={styles.heroImageCard}>
              <div className={styles.cardHeader}>
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                  alt="Priya"
                  className={styles.cardAvatar}
                />
                <div>
                  <div className={styles.cardTitle}>Priya Nair</div>
                  <div className={styles.cardSub}>Indiranagar · ★ 4.98</div>
                </div>
              </div>
              <p className={styles.cardQuote}>
                "Made ₹24,000 last month renting out my second camera body safely on RentAny."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Bar */}
      <section className={styles.categoriesSection}>
        <div className={`container ${styles.categoriesContainer}`}>
          <div className={styles.categoriesList}>
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`${styles.categoryChip} ${isActive ? styles.categoryActive : ''}`}
                >
                  <Icon size={16} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className={styles.listingsSection}>
        <div className={`container`}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>
                {selectedCategory === 'all' ? 'Featured Items in Bengaluru' : `Available in ${selectedCategory}`}
              </h2>
              <p className={styles.sectionSubtitle}>
                Pre-inspected equipment with instant owner approval
              </p>
            </div>
            <Link to="/search" className={styles.viewAllLink}>
              <span>View all 48+ listings</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <ListingGrid listings={filteredListings} />
        </div>
      </section>

      {/* How it Works Section */}
      <section className={styles.howItWorks}>
        <div className={`container`}>
          <div className={styles.centerHeader}>
            <span className={styles.subHeading}>Simpler Than Buying</span>
            <h2 className={styles.sectionTitle}>How RentAny Works</h2>
            <p className={styles.sectionSubtitle}>
              Three simple steps to access world-class production gear and tools
            </p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <h3 className={styles.stepTitle}>Browse & Reserve</h3>
              <p className={styles.stepDesc}>
                Explore vetted gear near you. Select your rental dates and reserve instantly with transparent pricing and zero hidden fees.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <h3 className={styles.stepTitle}>Meet & Inspect</h3>
              <p className={styles.stepDesc}>
                Pick up directly from a verified local owner. Do a quick 2-minute condition check and unlock the equipment with OTP.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>3</div>
              <h3 className={styles.stepTitle}>Create & Return</h3>
              <p className={styles.stepDesc}>
                Shoot your video, host your game night, or complete your project. Return on time and get your security deposit refunded right away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Turn Gear into Income Banner */}
      <section className={styles.bannerSection}>
        <div className={`container`}>
          <div className={styles.bannerCard}>
            <div className={styles.bannerContent}>
              <span className={styles.bannerBadge}>Owner Community</span>
              <h2 className={styles.bannerTitle}>
                Got high-end gear sitting on your shelf?
              </h2>
              <p className={styles.bannerDesc}>
                Turn idle cameras, lenses, drones, and consoles into passive monthly income. Fully covered by our ₹1 Lakh Equipment Guarantee.
              </p>
              <div className={styles.bannerActions}>
                <Link to="/list">
                  <Button size="lg" variant="primary">
                    List Your Gear For Free
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="secondary">
                    View Earnings Calculator
                  </Button>
                </Link>
              </div>
            </div>
            <div className={styles.bannerImageWrapper}>
              <img
                src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80"
                alt="List gear on RentAny"
                className={styles.bannerImage}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
