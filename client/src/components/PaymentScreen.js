import React, { useState } from "react";
import style from "./PaymentScreen.module.scss";
import { postRequest } from "../utils/api";

import PaymentForm from "./PaymentForm";
import ListPaymentMethods from "./ListPaymentMethods";

export default function PaymentScreen() {
  const [selectedMethod, setSelectedMethod] = useState({});
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [activeScreen, setActiveScreen] = useState({
    prePayment: true,
    paymentMethods: false,
    paymentForm: false,
  });
  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState('');

  function handleSelectCard(method) {
    setSelectedMethod(method);
    createPaymentIntent(method.id);
  }

  function createPaymentIntent(selectedPaymentMethodId) {
    const data = {
      paymentMethod: selectedPaymentMethodId,
      amount,
    };
    postRequest(`/payment/create`, {...data})
      .then((resp) => {
        setPaymentIntent(resp.data);
        setActiveScreen({ paymentForm: false, paymentMethods: true });
        changeActiveScreen("paymentForm");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changeActiveScreen(screen) {
    let toUpdate = { prePayment: false, paymentMethods: false, paymentForm: false };
    toUpdate[screen] = true;
    setActiveScreen(toUpdate);
  }

  function handleChangeAmount(e) {
    const { value } = e.target;
    if(!(/^[1-9]*$/).test(value)) {
      setAmountError('Please enter valid amount');
    } else {
      setAmount((prev) => Number(value));  
      setAmountError('');
    }
  }

  function handleClickMakePayment() {
    changeActiveScreen("paymentMethods");
  }

  return (
    <div className={style.wrapper}>
      {activeScreen.prePayment && 
      <div>
            <div className={style.innerWrapper}>
            <div className={style.title}>Make Payment</div>
            <div className={style.row}>
              <label>Amount</label>
              <input
                onChange={handleChangeAmount}
                id="amount"
                type="text"
                name="name"
                placeholder="Enter the amount"
              />
          {amountError !== '' &&
            <p className={style.error}>{amountError}</p>
          }
            </div>
            <div className={style.addressWrapper}>
              <div className={style.btnContainer}>
                <button onClick={handleClickMakePayment}>Make Payment</button>
              </div>
            </div>
          </div>
        </div>
      }

      {activeScreen.paymentMethods && <ListPaymentMethods handleSelectCard={handleSelectCard} />}

      {activeScreen.paymentForm && paymentIntent && (
        <PaymentForm paymentIntent={paymentIntent} paymentMethod={selectedMethod} />
      )}
    </div>
  );
}
