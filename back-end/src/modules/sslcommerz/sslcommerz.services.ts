import axios from 'axios';
import { ISSLPayment } from './sslcommerz.interface';
import { AppError } from '../../error/coustom.error';
import httpStatusCode from 'http-status-codes';
import { ENV } from '../../config/env';
const paymentInit = async (payload: ISSLPayment) => {
  console.log(payload);
  try {
    const data = {
      store_id: ENV.SSL_STORE_ID,
      store_passwd: ENV.SSL_STORE_PASSWORD,
      total_amount: payload.amount,
      currency: 'BDT',
      tran_id: payload.transactionId,
      success_url: `${ENV.SSL_SUCCESS_BACK_END_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=succeeded`,
      fail_url: `${ENV.SSL_FAILED_BACK_END_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=failed`,
      cancel_url: `${ENV.SSL_CANCEL_BACK_END_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=canceled`,
      ipn_url: ENV.SSL_IPN_URL,
      cus_name: payload.name,
      cus_email: payload.email,
      cus_add2: 'N/A',
      cus_city: 'Dhaka',
      cus_state: 'Tejgaon',
      cus_postcode: 1208,
      cus_country: 'Bangladesh',
      cus_phone: payload.phone,
      cus_fax: '01711111111',
      ship_name: 'N/A',
      ship_add1: 'N/A',
      ship_add2: 'N/A',
      ship_city: 'N/A',
      ship_state: 'N/A',
      ship_postcode: 1000,
      ship_country: 'N/A',
    };
    console.log(data);

    const res = await axios({
      method: 'POST',
      url: ENV.SSL_PAYMENT_API,
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return res.data;
  } catch (error: any) {
    console.log(error);
    throw new AppError(error.message, httpStatusCode.BAD_REQUEST);
  }
};

export const sslCommerzServices = {
  paymentInit,
};
