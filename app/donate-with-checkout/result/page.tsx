import type { Stripe } from 'stripe';
import PrintObject from '@/components/PrintObject';
import { stripe } from '@/lib/stripe';

export default async function ResultPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}): Promise<JSX.Element> {
  if (!searchParams.session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.retrieve(
    searchParams.session_id,
    {
      expand: ['line_items', 'payment_intent'],
    }
  );

  const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;

  // Check if payment was successful
  const isPaymentSuccessful = paymentIntent.status === 'succeeded';

  return (
    <div className="text-center my-10">
      <h2 className={`text-4xl font-bold ${isPaymentSuccessful ? 'text-green-500' : 'text-red-500'}`}>
        {isPaymentSuccessful ? 'Dontation Successful' : 'Payment Failed'}
      </h2>
      {isPaymentSuccessful && (
        <>
          <h3 className="text-2xl mt-4 text-green-500">Thank you for your Donation!</h3>
          <p className="text-lg mt-2">Transaction ID: {paymentIntent.id}</p>
        </>
      )}
      <h3 className="text-xl mt-4">Checkout Session response:</h3>
      <PrintObject content={checkoutSession} />
    </div>
  );
}
