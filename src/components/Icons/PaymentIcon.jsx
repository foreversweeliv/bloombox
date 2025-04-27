import * as React from "react"

const PaymentIcon = ({ children, className = "" }) => {
  return (
    <div className={`bg-accent-green-darker h-10 w-15 rounded-xl flex items-center justify-center ${className}`}>
      {children}
    </div>
  )
}

export default PaymentIcon 