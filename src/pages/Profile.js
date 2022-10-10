//profile pic and username gmail
//show all paid payments
//create new payment reminder
import React, { useContext, useEffect, useState } from 'react'
import PaymentContext from '../context/PaymentContext'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import "./profile.css"





const Profile = () => {





  const { getPayments, payments } = useContext(PaymentContext)





  return (
    <div >
      Profile
      <div>
        {JSON.stringify(payments)}
      </div>

    </div>
  )
}

export default Profile