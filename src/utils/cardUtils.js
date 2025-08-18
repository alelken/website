import React from 'react';
import ModernCard from '../components/ModernCard';

/**
 * Converts old card props to new ModernCard props
 * @param {Object} oldProps - Props from the old Card component
 * @returns {Object} Props for the ModernCard component
 */
export const convertToModernCardProps = (oldProps) => {
  const {
    title,
    children,
    image,
    icon,
    button,
    className = '',
    ...rest
  } = oldProps;

  const newProps = {
    title,
    children,
    className: `legacy-card ${className}`.trim(),
    ...rest
  };

  // Handle image prop
  if (image) {
    newProps.image = typeof image === 'string' 
      ? { src: image, alt: '' } 
      : image;
  }

  // Handle icon prop
  if (icon) {
    newProps.icon = icon;
  }

  // Handle button prop
  if (button) {
    newProps.button = {
      ...button,
      // Map old button props to new structure if needed
      label: button.label || 'Learn More',
      href: button.href || '#',
      onClick: button.onClick
    };
  }

  return newProps;
};

/**
 * A wrapper component that renders the ModernCard with converted props
 * This can be used as a drop-in replacement for the old Card component
 */
export const LegacyCardWrapper = (props) => {
  const modernProps = convertToModernCardProps(props);
  return <ModernCard {...modernProps} />;
};

export default {
  convertToModernCardProps,
  LegacyCardWrapper
};
