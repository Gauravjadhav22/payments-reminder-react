import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PaymentContext from '../context/PaymentContext'
import useAxiosPrivate from '../hooks/useAxiosPrivate'








const BASE_URL = `/payments`


const container = {
  position: "absolute",
  top: "0%",
  left: "0",
  marginTop: "10%",
  width: "100vw",
  backgroundColor: "black",
  display: "flex", justifyContent: "center", alignItems: "center",

}

const main = {

  display: "flex",
  border: "2px solid blue",
  boxShadow: "0px 0px 10px 2px rgba(16,131,198,0.9)",
  backgroundColor: "rgba(0,38,61,0.49)",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "baseline",
  fontSize: "x-large",
  color: "white",
  padding: "25px",
  textAlign: "center",
  marginBottom: "150px",
  marginTop: "50px"
}

const inpt = {

  margin: "14px",
  fontSize: "x-large",
  padding: "15px 5px",
  borderRadius: "5px"
}

const inptMain = {
  paddingTop: "15px"
}

const heading = {
  color: "gray",
  fontSize: "xx-large"
}

const upbtn = {
  padding: "8px 15px",
  backgroundColor: "purple",
  color: "white",
  fontSize: "large",
  alignSelf: "center",
  margin: "15px"
}

const Payment = ({ editPayment,setShowPayment, setEditPayment, updatePayment }) => {

console.log(editPayment);

  const { setPayments, payments, paidPayment, getPayments } = useContext(PaymentContext)
  const navigate = useNavigate()
  const [errMsg, setErrMsg] = useState("");

  const axiosPrivate = useAxiosPrivate()
  const [fullname, setFullname] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [gmail, setGmail] = useState("")
  const [contact, setContact] = useState("")
  const [emailsAWeek, setEmailsAWeek] = useState(0)

  const postPayment = async () => {
    try {
      const response = await axiosPrivate.post(BASE_URL,
        JSON.stringify(fullname, title, contact, emailsAWeek, description, gmail),
        {

          withCredentials: true
        })
      console.log(response.data);
      setFullname("")
      setTitle("")
      setContact("")
      setDescription("")
      setEmailsAWeek("")
      setGmail("")
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username , Password or gmail");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }

  }


  const handleClick =()=>{
    setEditPayment(false)
    setShowPayment(false)
  }

  return (
    <div style={container}>
      <div style={main}>
        <h1 style={heading}>Add New Bill</h1>
        <div style={inptMain}>Fullname:<input style={inpt} placeholder='fullname' type='text' value={updatePayment?.fullname} /></div>
        <br /><div style={inptMain}>Title:<input style={inpt} placeholder='title' type='text' value={updatePayment?.title} /></div>
        <br /><div style={inptMain}>Description:<input style={inpt} placeholder='description' type='text' value={updatePayment?.description} /></div>
        <br /><div style={inptMain}>Gamail:<input style={inpt} placeholder='gmail' type='text' value={updatePayment?.gmail} /></div>
        <br /><div style={inptMain}>Mails Per Week:<input style={inpt} placeholder='0' type='number' value={updatePayment?.emailsAweek} min="1" max="5" /></div>
        {!updatePayment.title ? <button style={upbtn} onClick={() => handleClick()}>Add Payment</button> : <button style={upbtn} onClick={() =>handleClick()}>Update Payment</button>}
      </div>
    </div>
  )
}

export default Payment