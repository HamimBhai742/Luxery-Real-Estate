import CheckoutClient from '../../../../../components/CheckOut/SimpleCheckout';

export const metadata = {
  title: 'Checkout - Complete Your Payment',
  description: 'Proceed to complete your booking payment securely.',
};

const CheckOutPage = async ({ params }: { params: { bookingId: string } }) => {
  const { bookingId } = await params;
  return <CheckoutClient bookingId={bookingId} />;
};

export default CheckOutPage;
