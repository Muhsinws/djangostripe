console.log("Sanity check!");

// Get Stripe publishable key
fetch("/config/")
  .then((result) => { return result.json(); })
  .then((data) => {
    // Initialize Stripe.js
    const stripe = Stripe(data.publicKey);

    // Event handlers for plan selection buttons
    let basicPlanBtn = document.querySelector("#basicPlanBtn");
    let standardPlanBtn = document.querySelector("#standardPlanBtn");
    let premiumPlanBtn = document.querySelector("#premiumPlanBtn");

    if (basicPlanBtn !== null) {
      basicPlanBtn.addEventListener("click", () => {
        createCheckoutSession("basic");
      });
    }

    if (standardPlanBtn !== null) {
      standardPlanBtn.addEventListener("click", () => {
        createCheckoutSession("standard");
      });
    }

    if (premiumPlanBtn !== null) {
      premiumPlanBtn.addEventListener("click", () => {
        createCheckoutSession("premium");
      });
    }

    function createCheckoutSession(plan) {
      // Get Checkout Session ID for the selected plan
      fetch("/create-checkout-session/?plan=" + plan)
        .then((result) => { return result.json(); })
        .then((data) => {
          console.log(data);
          // Redirect to Stripe Checkout
          return stripe.redirectToCheckout({sessionId: data.sessionId})
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
});
