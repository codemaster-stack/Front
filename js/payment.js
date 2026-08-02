
const API = "http://localhost:5000/api/settings";
            let settings = {};
            let visitorCurrency = "USD";

async function loadPortal() {

    try {

        const response = await fetch(API);

        const data = await response.json();

        if (!data.success) {

            alert("Unable to load portal settings.");

            return;

        }

        const s = data.settings;
        settings = s;

        // Logo
        if (s.logo) {

            document.getElementById("organizationLogo").src =
                "http://localhost:5000" + s.logo;

            document.getElementById("organizationLogo").style.display =
                "block";

        }

        // Banner
        if (s.banner) {

            document.getElementById("paymentBanner").src =
                "http://localhost:5000" + s.banner;

            document.getElementById("paymentBanner").style.display =
                "block";

        }

        // Text
        document.getElementById("organizationName").textContent =
            s.organizationName;

        document.getElementById("paymentTitle").textContent =
            s.title;

        document.getElementById("paymentMessage").textContent =
            s.description;

       document.getElementById("paymentNotice").textContent =
         s.paymentNotice;

        document.getElementById("payButton").textContent =
            s.buttonText;

        document.getElementById("footerText").textContent =
            s.footer;

    }

    catch (error) {

        console.error(error);

    }

}

loadPortal();

document
.getElementById("payButton")
.addEventListener("click", startPayment);

function startPayment() {

    if (!settings.flutterwavePublicKey) {

        alert("Flutterwave Public Key has not been configured.");

        return;

    }

    FlutterwaveCheckout({

        public_key: settings.flutterwavePublicKey,

        tx_ref: "PAY-" + Date.now(),

        amount: settings.amount,

        currency: visitorCurrency,

        payment_options: "card,banktransfer,ussd",

        redirect_url: window.location.origin + "/success.html",

        customer: {

            email: "payment@paymentportal.com",

            name: "Payment"

        },

        customizations: {

            title: settings.title,

            description: settings.description,

            logo: "http://localhost:5000" + settings.logo

        }

    });

}
/* ===========================================
   CAMPUSHUB FLUTTERWAVE PAYMENT
=========================================== */


// let application = null;

// const currencyMap = {

//     "Nigeria": "NGN",

//     "Ghana": "GHS",

//     "Kenya": "KES",

//     "South Africa": "ZAR",

//     "United Kingdom": "GBP",

//     "United States": "USD",

//     "Canada": "CAD",

//     "Australia": "AUD",

//     "India": "INR"

// };


// // ------------------------------------
// // PAYMENT
// // ------------------------------------

// function startFlutterwavePayment() {

//     if (!application) {

//         alert("Application not loaded.");

//         return;

//     }

//     const currency =
//         currencyMap[application.country] || "USD";

//     FlutterwaveCheckout({

//         // Paste ALL your existing FlutterwaveCheckout code here unchanged

//     });

// }

// document
// .getElementById("payButton")
// .addEventListener("click", startFlutterwavePayment);