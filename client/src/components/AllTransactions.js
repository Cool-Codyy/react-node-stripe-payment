
import { useEffect } from "react";
import { getRequest } from "../utils/api";

const AllTransactions = () => {
    function getAllTransation() {
        getRequest(`/payment/alltransaction`)
            .then((resp) => {
            console.log(resp);
            console.log('respresprespresp', resp);
            // setPaymentMethods(resp.data.data);
            })
            .catch((err) => {
            console.log(err);
            });
        }
      useEffect(getAllTransation, []);
    
return(
    <div>
   All Transation Page
    </div>
)
}

export default AllTransactions;