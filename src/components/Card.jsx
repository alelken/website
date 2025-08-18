import React from 'react';

const Card = ({ 
  title, 
  children, 
  image, 
  icon,
  button, 
  className = '', 
  ...rest 
}) => (
  <div className={`card ${className}`} {...rest}>
    <div className="card-content">
      {icon && <div className="card-icon">{icon}</div>}
      {title && <h3 className="card-title">{title}</h3>}
      {image && <img src={image.src} alt={image.alt || ''} className="card-image" />}
      <div className="card-body">
        {typeof children === 'string' ? <p>{children}</p> : children}
      </div>
      {button && (
        <a 
          href={button.href} 
          className="btn" 
          onClick={button.onClick}
          aria-label={button.ariaLabel || button.label}
        >
          {button.label}
        </a>
      )}
    </div>
  </div>
);

export default Card;
