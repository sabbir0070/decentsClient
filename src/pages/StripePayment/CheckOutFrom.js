
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

// import '../../App.css'
import { AuthContext } from '../Providers/AuthProvider';
import './CheckOutForm.css';
const CheckOutFrom = () => {

  const { t } = useTranslation();
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('');
  const [message, setMessage] = useState(null);
  const [practice, setPractice] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [amount, setAmount] = useState(100);
  const [closed, setClosed] = useState(false);
  const { user } = useContext(AuthContext)
  const [axiosSecure] = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (amount === 100) {
      axiosSecure.post('/create-payment-intent', { price: amount })
        .then(res => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
    }
  }, [axiosSecure, amount])

  // const [succeeded, setSucceeded] = useState('');

  const handleClickClosed = () => {
    if (!closed) {
      setClosed(true);
      return navigate('/telehealth', { state: { from: location } })
    }

  }

  const handleSubmit = async (event) => {
    console.log(user, 'checkoutForm');
    event.preventDefault();

    if (!stripe || !elements) {
      setMessage('Stripe is not loaded. Please try again later')
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setMessage('Please enter your card details');
      return;
    }

    setIsProcessing(true);


    // Create the payment method first
    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: {
        name: user?.displayName,
        email: user?.email,
      },
    });

    if (paymentMethodError) {
      setMessage(`Payment failed: ${paymentMethodError.message}`);
      setIsProcessing(false);
      return;
    }
    else {
      console.log('PaymentMethode', paymentMethod);
    }

    // Confirm the payment intent
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      },
    });
    if (confirmError) {
      setMessage(`Payment confirmation failed: ${confirmError.message}`);
      console.log(`ata ki seta${confirmError.message}`);
      setIsProcessing(false)
    }


    if (paymentIntent.status === 'succeeded') {
      setMessage('Payment successful!');
      const payment = {
        name: user?.displayName,
        email: user?.email,
        practice: practice,
        price: amount,
        status: paymentIntent.status,
        transaction: paymentIntent.id,
        date: new Date()   // utc date convert. use moment js 
      }
      axios.post('http://localhost:5001/payments', payment)
        .then(data => {
          console.log(data);
          if (data?.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your Payment Successful",
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              window.location.href = "/telehealth"; // Replace "/another-route-path" with the desired route
            });

          }
        })
        .catch(error => {
          console.log(error);
        })

    }

    console.log('checkoutform');
    setIsProcessing(false);

  };

  return (

    <div style={{
      position: 'relative',
      maxWidth: '60%',
      margin: '0 auto',
      padding: '20px',
      textAlign: 'center',
      border: '5px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }}>

      {/* Close Button */}
      <button className="closes-icon"
        onClick={handleClickClosed}  // Navigate to telehealth on click
      >
        &times;
      </button>
      <h4>{('Join the Coalition')}</h4>
      <p>{t("Initial Payment of $100. Let's change the healthcare industry forever!")}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={user?.displayName}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Medical Practice"
          value={practice}
          onChange={(e) => setPractice(e.target.value)}
          required
        />
        <input style={{
          display: 'flex', justifyContent: 'flex-start',
          padding: '12px',
          marginBottom: '15px',
          width: "100%",
          maxWidth: '40%',
          border: '1px solid #ccc',
          borderRadius: '6px',

        }}
          type="number"
          placeholder="Amount (USD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: 'gray',
                  fontWeight: '500'
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        {

          <button type="submit" disabled={!stripe || !clientSecret}>
            {isProcessing ? 'Processing...' : `Pay $${amount}`}

          </button>

        }
        <h4> {message} </h4>
      </form>
    </div>
  );
};

export default CheckOutFrom;




