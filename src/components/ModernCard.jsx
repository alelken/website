import React from 'react';
import PropTypes from 'prop-types';

const ModernCard = ({
  title,
  children,
  image,
  icon,
  button,
  className = '',
  variant = 'default', // 'default', 'outlined', 'elevated', 'filled'
  hoverEffect = 'scale', // 'scale', 'lift', 'fade', 'none'
  ...rest
}) => {
  const cardClasses = [
    'modern-card',
    `modern-card--${variant}`,
    hoverEffect !== 'none' ? `modern-card--hover-${hoverEffect}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...rest}>
      {image && (
        <div className="modern-card__media">
          <img 
            src={image.src} 
            alt={image.alt || ''} 
            className="modern-card__image"
            loading="lazy"
            width={image.width || '100%'}
            height={image.height || 'auto'}
          />
        </div>
      )}
      
      <div className="modern-card__content">
        {icon && (
          <div className="modern-card__icon">
            {typeof icon === 'string' ? <i className={icon} /> : icon}
          </div>
        )}
        
        {title && <h3 className="modern-card__title">{title}</h3>}
        
        <div className="modern-card__body">
          {typeof children === 'string' ? <p>{children}</p> : children}
        </div>
        
        {button && (
          <div className="modern-card__actions">
            {button.href ? (
              <a 
                href={button.href} 
                className={button.className || 'btn btn-primary'}
                onClick={button.onClick}
                aria-label={button.ariaLabel || button.label}
                target={button.target || '_self'}
                rel={button.target === '_blank' ? 'noopener noreferrer' : undefined}
              >
                {button.label}
                {button.icon && <span className="modern-card__button-icon">{button.icon}</span>}
              </a>
            ) : (
              <button 
                className={button.className || 'btn btn-primary'}
                onClick={button.onClick}
                aria-label={button.ariaLabel || button.label}
                type={button.type || 'button'}
              >
                {button.label}
                {button.icon && <span className="modern-card__button-icon">{button.icon}</span>}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

ModernCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  button: PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    onClick: PropTypes.func,
    ariaLabel: PropTypes.string,
    target: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.node,
  }),
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'outlined', 'elevated', 'filled']),
  hoverEffect: PropTypes.oneOf(['scale', 'lift', 'fade', 'none']),
};

export default ModernCard;
