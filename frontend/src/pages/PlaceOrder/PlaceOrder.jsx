import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",  
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const deliveryCharges = getTotalCartAmount() === 0 ? 0 : 60;
  const totalAmount = getTotalCartAmount() + deliveryCharges;

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
  
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = {
          name: item.name,
          quantity: cartItems[item._id],
          price: item.price // Ensure price is included if needed by the backend
        };
        orderItems.push(itemInfo);
      }
    });
  
    let orderData = {
      userId: token.id, // Use token.id directly
      address: data,
      items: orderItems,
      amount: totalAmount,
    };
  
    // Log the orderData to ensure it is correct
    console.log("Placing order with data:", orderData);
    console.log('Token:', token);
  
    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        const { key_id, amount, currency, order_id } = response.data;
        const options = {
          key: key_id, 
          amount: amount, 
          currency: currency,
          name: "Your Company Name",
          description: "Test Transaction",
          order_id: order_id, 
          handler: function (response) {
            alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
            window.location.replace(`${url}/verify?success=true&orderId=${order_id}`);
          },
          prefill: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            contact: data.phone
          },
          notes: {
            address: `${data.street}, ${data.city}, ${data.state}, ${data.zipcode}, ${data.country}`
          },
          theme: {
            color: "#3399cc"
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Error placing order");
        console.error(response.data.message);
      }
    } catch (error) {
      // Enhanced error logging
      console.error('Error placing order:', error.response ? error.response.data : error.message);
      alert('Error placing order');
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount, navigate]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <form className="place-order" onSubmit={placeOrder}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input name='firstName' onChange={onChangeHandler} value={data.firstName} className="input" type="text" placeholder='FIRST NAME' required />
            <input name='lastName' onChange={onChangeHandler} value={data.lastName} className="input" type="text" placeholder='LAST NAME' required />
          </div>
          <input name='email' onChange={onChangeHandler} value={data.email} className="input" type="email" placeholder='EMAIL ADDRESS' required />
          <input name='street' onChange={onChangeHandler} value={data.street} className="input" type="text" placeholder='STREET' required />
          <div className="multi-fields">
            <input name='city' onChange={onChangeHandler} value={data.city} className="input" type="text" placeholder='CITY' required />
            <input name='state' onChange={onChangeHandler} value={data.state} className="input" type="text" placeholder='STATE' required />
          </div>
          <div className="multi-fields">
            <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} className="input" type="text" placeholder='ZIP CODE' required />
            <input name='country' onChange={onChangeHandler} value={data.country} className="input" type="text" placeholder='COUNTRY' required />
          </div>
          <input name='phone' onChange={onChangeHandler} value={data.phone} className="input" type="text" placeholder='PHONE' required />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>  
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Charges</p>
                <p>₹{deliveryCharges}</p> 
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>₹{totalAmount}</p>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
