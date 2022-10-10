import React, { createContext, useState } from "react";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


export const PaymentContext = createContext({});



export const PaymentProvider = ({ children }) => {
    const axiosPrivate = useAxiosPrivate()
    const [payments, setPayments] = useState([])

    const paidPayment = (id) => {
        setPayments(payments.filter((item) => item.id !== id))
    }


    const postPayment = async (data) => {
        try {
            const ress = await axiosPrivate.post('/payments/',data)

            console.log(ress.data);

        } catch (error) {

            console.log(error);
        }

    }
    const getPayments = async () => {
        try {
            const ress = await axiosPrivate.get('/payments')
            setPayments(ress.data)
            console.log(ress.data);

        } catch (error) {


            console.log(error);
        }

    }



    return (
        <PaymentContext.Provider value={{ payments, setPayments, paidPayment, getPayments,postPayment }}>
            {children}
        </PaymentContext.Provider>
    )
}

export default PaymentContext

