import api from "../utils/api";

const paymentServices = {
  // Thanh toán VNPay
  addPaymentVNPay: (idShowTime: string, idBooking: string) =>
    api.post("/payment/vn-pay", { idShowTime, idBooking }).then((res) => res.data),
};

export default paymentServices;
