import * as React from "react"

const SocialIcon = ({ children, className = "" }) => {
  return (
    <div className={`h-10 text-accent-dark ${className}`}>
      {children}
    </div>
  )
}

export default SocialIcon 