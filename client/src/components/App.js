import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PaymentScreen from "./PaymentScreen";
import AddPayMethod from "./AddPayMethod";
// import Register from "./Register";
import StripeWrapper from "./StripeWrapper";
import PaymentSuccess from "./PaymentSuccess";
import PaymentFailure from "./PaymentFailure";
import AllTransactions from "./AllTransactions";

function App() {
  return (
    <StripeWrapper>
      <BrowserRouter>
        <Switch>
          {/* <Route path="/add-payment-method" component={AddPayMethod} /> */}
          <Route path="/make-payment" component={PaymentScreen} />
          <Route path="/payment-success" component={PaymentSuccess} />
          <Route path="/payment-failure" component={PaymentFailure} />
          <Route path="/all-transactions" component={AllTransactions} />
          <Route path="/" component={AddPayMethod} />
        </Switch>
      </BrowserRouter>
    </StripeWrapper>
  );
}

export default App;
