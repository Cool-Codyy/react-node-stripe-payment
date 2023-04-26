
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import style from "./PaymentSuccess.module.scss";

const PaymentSuccess = () => {
    const history = useHistory();
    useEffect(() => {
        setTimeout(() => {
            history.replace('/all-transactions'); 
        }, 3000);
    });
return(
    <div className={style.wrapper}>
    <div className={style.card}>
        <div className={style.cardChild}>
        <i style={{ color: '#9ABC66' }} className={style.checkmark}>✓</i>
        </div>
        <h1 style={{ color: '#9ABC66' }} className={style.success}>Success</h1>
        <p>you are redirect to transaction page shortly!</p>
        <p style={{ color: '#8B8000' }}>Please wait...</p>
    </div>
    </div>
)
}

export default PaymentSuccess;