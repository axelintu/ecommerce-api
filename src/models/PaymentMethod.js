import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema({

}, {
	timestamps: true
});

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);

export default PaymentMethod;
