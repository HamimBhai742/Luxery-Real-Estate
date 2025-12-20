import CheckoutClient from './SimpleCheckout';

const CheckOutPage = async ({ params }: { params: { bookingId: string } }) => {
  const { bookingId } = await params;
  
  return <CheckoutClient bookingId={bookingId} />;
};

export default CheckOutPage;
