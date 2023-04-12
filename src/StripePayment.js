import React, { useState } from "react"; 
import { loadStripe } from "@stripe/stripe-js"; 

import {
  testmode,
  stripeprod,
  stripetest,
  host
} from './assets/config'
 
 
function StripePayment() { 
  const [product, setProduct] = useState({ 
    name: "6L. Zurich NFT", 
    price: 2500, 
    productOwner: "Zurich NFT", 
    description: 
      "One of only 100 unique 6L Zurich NFTs", 
    quantity: 100, 
  }); 

  const makePayment = async () => { 
    let stripe

    if(testmode == 1) {
      stripe= await loadStripe(stripetest)
    } else {
      stripe = await loadStripe(stripeprod)
    }

    const body = { product }; 
    const headers = { 
      "Content-Type": "application/json", 
    }; 
 
    const response = await fetch( 
      "http://localhost:3001/checkout", 
      { 
        method: "POST", 
        headers: headers, 
        body: JSON.stringify(body), 
      } 
    ); 
 
    const session = await response.json(); 
 
    const result = stripe.redirectToCheckout({ 
      sessionId: session.id, 
    }); 
 
    if (result.error) { 
      console.log(result.error); 
    } 
  }; 
 
  return ( 
    <div style={{ width: "20rem" }}> 
      <image 
        variant="top" src="https://images.pexels.com/photos/12428359/pexels-photo-12428359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
      /> 
      <div> 
        <h2>{product.name}</h2> 
        <p>{product.description}</p> 
        <button variant="primary" onClick={makePayment}> 
          Buy Now for {product.price} 
        </button> 
      </div> 
    </div> 
  ); 
}  
export default StripePayment; 