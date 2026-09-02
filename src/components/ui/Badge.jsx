import React from 'react';
import styles from './Badge.module.css';

export default function Badge({
  children,
  variant = 'teal', // 'teal' | 'green' | 'amber' | 'gray' | 'red'
  size = 'md', // 'sm' | 'md'
  icon: Icon,
  className = ''
}) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`}>
      {Icon && <Icon size={size === 'sm' ? 12 : 14} className={styles.icon} />}
      <span>{children}</span>
    </span>
  );
}
