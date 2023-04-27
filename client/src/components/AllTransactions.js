
import { useEffect, useState } from "react";
import { getRequest } from "../utils/api";
import "./allTransactions.css";

const AllTransactions = () => {
    const [allTransaction, setAllTransaction] = useState([]);
    function getAllTransation() {
        getRequest(`/payment/alltransaction`)
            .then((resp) => {
            console.log(resp);
            console.log('respresprespresp', resp.data);
            setAllTransaction(resp.data);
            })
            .catch((err) => {
            console.log(err);
            });
        }
      useEffect(getAllTransation, []);
    console.log('ddddd', allTransaction.data);
return(
    <div>
  <table className="table">
    <thead className="table__header">
      <tr className="table__row">
        <th className="table__cell u-text-center">Transaction ID</th>
        <th className="table__cell u-text-center">Customer ID</th>
        <th className="table__cell u-text-center">Product Info</th>
        <th className="table__cell u-text-center">Amount</th>
        <th className="table__cell u-text-center">Status</th>
        <th></th>
      </tr>
    </thead>

    {allTransaction.data && allTransaction.data.length > 0 && allTransaction.data.map((node) => (
         <tr className="table__row">
         <td className="table__account table__cell">
           <a href="#" className="table__account-content table__link table__link"><span className="table__account-number">{node.id}</span> <span className="table__account-name"></span>
           </a>
         </td>
         <td className="table__balance table__cell u-text-right u-font-mono"><span className="num_negative">{node.customer}</span></td>
         <td className="table__limit table__cell u-text-right u-font-mono">{node.description}</td>
         <td className="table__available table__cell u-text-right u-font-mono">{node.currency.toUpperCase()}{node.amount.toString().substring(0,node.amount.toString().length-2)+"."+node.amount.toString().substring(node.amount.toString().length-2)}</td>
         <td className="table__transfer table__cell u-text-center">{node.status}</td>
       </tr>
    ))}
  </table>
  </div>
//     <table>
//     <thead>
//       <tr>
//         <th>First Name</th>
//         <th>Last Name</th>
//         <th>Job Title</th>
//         <th>Twitter</th>
//       </tr>
//     </thead>
//     <tbody>
//         {allTransaction.data && allTransaction.data.length > 0 && allTransaction.data.map((node) => {
//             <tr>
//             <td data-column="First Name">James</td>
//             <td data-column="Last Name">Matman</td>
//             <td data-column="Job Title">Chief Sandwich Eater</td>
//             <td data-column="Twitter">{node.status}</td>
//             </tr>
//         })}
//     </tbody>
//   </table>
)
}

export default AllTransactions;