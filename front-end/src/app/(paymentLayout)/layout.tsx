import React from 'react';

const PaymentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>Payment</h1>
      {children}
    </div>
  );
};

export default PaymentLayout;
