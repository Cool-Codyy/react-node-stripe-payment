import style from "./PaymentSuccess.module.scss";
const PaymentFailure = () => {
return(
    <div className={style.wrapper}>
    <div className={style.card}>
        <div className={style.cardChild}>
        <i style={{ color: 'red' }} className={style.checkmark}>x</i>
        </div>
        <h1 style={{ color: 'red' }} className={style.failure}>Sorry!</h1>
        <p>Payment Failure!!!</p>
    </div>
    </div>
)
}

export default PaymentFailure;