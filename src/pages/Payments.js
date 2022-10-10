//update ,delete payment
//payment and upi option should be given via email
//payment should be paid with via email upi




// Send automated follow-up reminders via email or text for overdue invoices.
// Track whether invoice emails have been opened, and when.
// Add reporting on clients, invoices, and monthly earnings.
// Give clients the ability to pay invoices directly using a link in your invoice emails.
// For invoices paid in a foreign currency, display the value of the invoice in your local currency.


import React, { useState, useEffect, useContext } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { PaymentContext } from '../context/PaymentContext'
import { MdOutlineModeEdit } from 'react-icons/md'
import { BsPlus } from 'react-icons/bs'
import { FiDelete } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import "./payments.css"
import Payment from '../components/Payment'
import useAuth from '../hooks/useAuth'


const BASE_URL = `/payments`
const Payments = () => {


  const { auth } = useAuth()

  const [showPayment, setShowPayment] = useState(false)

  const [editPayment, setEditPayment] = useState(false);
  const [updatePayment, setUpdatePayment] = useState({});



  const { setPayments, payments, paidPayment, getPayments, postPayment } = useContext(PaymentContext)
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();


    setTimeout(() => {
      
      auth?.accessToken && getPayments();
    }, 4444);


    console.log(payments);
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const handleDelete = () => { }
  const handleEdit = () => { }




  const paymetnDiv = (payment) => {
    return (
      <div className='payment-wrapper'>
        <div className='edit-delete'>
          <div style={{ fontSize: "small", backgroundColor: "transparent", display: "flex", alignItems: "center", textAlign: "center", color: "black", flex: "0" }}>
            <h1 style={{ marginTop: "15px", marginRight: "10px", color: "gray" }}>Paid</h1><input type="checkbox" style={{ width: "25px", height: "25px" }} onChange={(e) => {
              e.target.checked && paidPayment(payment.id)//
            }} />
          </div>
          <div className='edit-delete-icn-main'>
            <div className='edit-delete-icn' onClick={() => {
              setEditPayment(true)
              setUpdatePayment(payment)
            }}> <MdOutlineModeEdit /></div><div className='edit-delete-icn' ><FiDelete onClick={() => handleDelete} />

            </div>
            <p>Time</p>
          </div>
        </div>
        <div className='fullname'>fullname:{payment?.fullname}</div>
        <div className='title'>title:{payment?.title}</div>
        <div className='description'>description: {payment?.description}</div>
        <div className='gmail'>gmail:{payment?.gmail}</div>
        <div className='emailsAweek'>emailsAWeek:{payment?.emailsAweek}</div>
      </div>
    )
  }

  console.log(payments);

  return (
    <div className='wrapper'>
      {
        (!showPayment && !editPayment) && <>
          <h1>All Pending Bills </h1>
          <p>"emails will be send automatically to payer as a reminder on the emailsAWeek basis "</p>
          <div className='payment-section'>

            {

              console.log(payments.length)

            }


            {
              payments?.length && payments?.map(item => (
                paymetnDiv(item)
              ))
            }


          </div>

          <div className='add-main' onClick={() => setShowPayment(true)}>

            <BsPlus className='add-icon' /> &nbsp;New Bill
          </div></>
      }

      <>     {(showPayment || editPayment) && <Payment setShowPayment={setShowPayment} setEditPayment={setEditPayment} editPayment={editPayment} updatePayment={updatePayment} />}
      </></div>
  )
}

export default Payments