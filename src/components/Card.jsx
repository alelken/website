import React from 'react'

const Card = ({ title, children, image, button, className = '', ...rest }) => (
  <div className={`card ${className}`} {...rest}>
    {image && <img src={image.src} alt={image.alt || ''} className="card-image" />}
    {title && <h3>{title}</h3>}
    {typeof children === 'string' ? <p>{children}</p> : children}
    {button && (
      <a href={button.href} className="btn" onClick={button.onClick}>
        {button.label}
      </a>
    )}
  </div>
)

export default Card
