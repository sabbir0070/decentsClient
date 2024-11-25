import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOutFrom from './CheckOutFrom';

// const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const stripePromise = loadStripe(process.env.REACT_APP_PAYMENT_GATEWAY_PK);

const StripePayment = () => {


  return (
    <div style={{margin:'30px'}}>
    <Elements stripe={stripePromise}>
<CheckOutFrom></CheckOutFrom>
</Elements>
    </div>
  );
};

export default StripePayment;
















// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';

// // Load Stripe with your publishable key
// const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// const PaymentPage = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [amount, setAmount] = useState(0);
//   const [message, setMessage] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setIsProcessing(true);

//     try {
//       // 1. Create Payment Intent on Backend
//       const { data } = await axios.post('http://localhost:4000/create-payment-intent', {
//         amount,
//       });
//       const clientSecret = data.clientSecret;
// console.log(clientSecret);
//       // 2. Confirm the Payment
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: 'Customer Name', // Replace with actual customer data
//           },
//         },
//       });

//       if (result.error) {
//         setMessage(`Payment failed: ${result.error.message}`);
//       } else if (result.paymentIntent.status === 'succeeded') {
//         setMessage('Payment successful!');
//       }
//     } catch (error) {
//       setMessage('Error processing payment. Please try again.');
//     }

//     setIsProcessing(false);
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
//       <h2>Complete Your Payment</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Amount (USD):
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             required
//             style={{ display: 'block', marginBottom: '10px' }}
//           />
//         </label>

//         <label>Card Details:</label>
//         <CardElement options={{ hidePostalCode: true }} />

//         <button type="submit" disabled={!stripe || isProcessing}>
//           {isProcessing ? 'Processing...' : 'Pay Now'}
//         </button>
//       </form>

//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// // Wrapping PaymentPage in Elements to provide Stripe context
// const StripePayment = () => (
//   <Elements stripe={stripePromise}>
//     <PaymentPage />
//   </Elements>
// );

// export default StripePayment;



