import { cart, totalCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shipingCents = 0;
    let totalBeforeTaxCents = 0;
    let taxCents = 0;
    let totalPriceCents = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shipingCents += deliveryOption.priceCents;
    })

    totalBeforeTaxCents = productPriceCents + shipingCents;
    taxCents = totalBeforeTaxCents * 0.1;
    totalPriceCents = totalBeforeTaxCents + taxCents;
    
    let cartQuantity = totalCartQuantity();

    const paymentSummaryHTML = 
        `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">
                $${formatCurrency(productPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>
                Shipping &amp; handling:
            </div>
            <div class="payment-summary-money">
                $${formatCurrency(shipingCents)}
            </div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
                $${formatCurrency(totalBeforeTaxCents)}
            </div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">
            $${formatCurrency(taxCents)}
        </div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalPriceCents)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>`
    
    document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

}