import api from "./api";

export const getPayments = () =>
    api.get("/payments");

export const getPaymentById = (id) =>
    api.get(`/payments/${id}`);

export const addPayment = (payment) =>
    api.post("/payments", payment);

export const updatePayment = (id, payment) =>
    api.put(`/payments/${id}`, payment);

export const deletePayment = (id) =>
    api.delete(`/payments/${id}`);

export const getPaymentsByStatus = (status) =>
    api.get(`/payments/status/${status}`);

export const getPaymentsByMonth = (month, year) =>
    api.get(`/payments/month/${month}/${year}`);