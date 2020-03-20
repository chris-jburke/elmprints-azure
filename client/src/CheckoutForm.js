import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom'
import {Box, Grid, Checkbox, FormControlLabel} from '@material-ui/core'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import axios from 'axios'
import ProductTile from './ProductTile'

import CardSection from './CardSection';
export default function CheckoutForm(props) {
  const [purchaseSuccess, setPurchaseSuccess] = useState(false)

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const data = await axios.post(`${process.env.REACT_APP_SERVER_URL}/cart/payment`,
    { cart: [props.currentProduct]})
    //{amount: 1500, cardType: "card"}) 
    // We pay 15€ with a credit card
    console.log(data.data.client_secret)
    const result = await stripe.confirmCardPayment(data.data.client_secret , {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
       // Successfully purchased
      setPurchaseSuccess(true)
      }
    }
  };
  if(!props.user) {
    return <Redirect to="/" />
  }
  if(purchaseSuccess) {
    return (<Redirect to="/cart/receipt" />)
  }
  const nameLabel = `Name for order: ${props.user.firstname} ${props.user.lastname}`
  return (
    <Grid
      container
      spacing={1}
      justify="space-between"
    >
      <Grid item xs={6}>
        <ProductTile imageURL={props.currentProduct.imagePath} />
      </Grid>
      <Grid item xs={6}>
        <Grid container 
              spacing={1}
              justify="space-between"
        >
          <Grid item xs={3}></Grid>
          <Grid item xs={4}>{nameLabel}</Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={12}>
            <FormControlLabel label="Confirm cardholder name:" value="start" 
            control={<Checkbox value="name-confirm-checkbox" 
            inputProps={{'aria-label': 'Confirm name for order'}} />}
             labelPlacement="start" />
          </Grid>
          <Grid item xs={12}>Shipping address:</Grid>
          <Grid item xs={12}>{props.user.shippingAddress.streetOne}</Grid>
          {props.user.shippingAddress.streetTwo && <Grid item xs={12}>{props.user.shippingAddress.streetTwo}</Grid>}
          <Grid item xs={12}>
            {props.user.shippingAddress.city}
            {props.user.shippingAddress.state}
            {props.user.shippingAddress.zipcode}
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>  
                <form onSubmit={handleSubmit}>
                  <CardSection />
                  <button disabled={!stripe}>Confirm order</button>
                 </form>
    
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}