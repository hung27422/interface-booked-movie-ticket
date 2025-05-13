import api from "../utils/api";

const paymentServices = {
  // Thanh toán VNPay
  addPaymentVNPay: (idShowTime: string) =>
    api.post("/payment/vn-pay", { idShowTime }).then((res) => res.data),
};

export default paymentServices;
