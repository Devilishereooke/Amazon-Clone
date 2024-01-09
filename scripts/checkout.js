import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { totalCartQuantity } from "../data/cart.js";

updateItemNumber();
renderOrderSummary();
renderPaymentSummary();

export function updateItemNumber(){
    const cartQuantity = totalCartQuantity();
    document.querySelector(".js-items").innerHTML = cartQuantity;
}