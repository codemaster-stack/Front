
const API = "https://back-kafm.onrender.com/api/settings";
            let settings = {};
           let visitorCurrency = "USD";

const currencyMap = {

    NG: "NGN", // Nigeria

    GH: "GHS", // Ghana

    KE: "KES", // Kenya

    ZA: "ZAR", // South Africa

    GB: "GBP", // United Kingdom

    US: "USD", // United States

    CA: "CAD", // Canada

    AU: "AUD", // Australia

    IN: "INR", // India

    JP: "JPY", // Japan

    CN: "CNY", // China

    CH: "CHF", // Switzerland

    AE: "AED", // UAE

    SA: "SAR", // Saudi Arabia

    QA: "QAR", // Qatar

    KW: "KWD", // Kuwait

    EG: "EGP", // Egypt

    MA: "MAD", // Morocco

    ET: "ETB", // Ethiopia

    TZ: "TZS", // Tanzania

    UG: "UGX", // Uganda

    RW: "RWF", // Rwanda

    ZM: "ZMW", // Zambia

    ZW: "USD", // Zimbabwe

    CM: "XAF", // Cameroon

    SN: "XOF", // Senegal

    CI: "XOF", // Côte d'Ivoire

    BJ: "XOF", // Benin

    BF: "XOF", // Burkina Faso

    ML: "XOF", // Mali

    NE: "XOF", // Niger

    TG: "XOF", // Togo

    FR: "EUR", // France

    DE: "EUR", // Germany

    ES: "EUR", // Spain

    IT: "EUR", // Italy

    PT: "EUR", // Portugal

    NL: "EUR", // Netherlands

    BE: "EUR", // Belgium

    IE: "EUR", // Ireland

    AT: "EUR", // Austria

    FI: "EUR", // Finland

    LU: "EUR", // Luxembourg

    GR: "EUR", // Greece

    SK: "EUR", // Slovakia

    SI: "EUR", // Slovenia

    EE: "EUR", // Estonia

    LV: "EUR", // Latvia

    LT: "EUR", // Lithuania

    CY: "EUR", // Cyprus

    MT: "EUR", // Malta

    default: "USD"

};

const supportedCurrencies = [

    "NGN",

    "USD",

    "GBP",

    "EUR",

    "GHS",

    "KES",

    "ZAR"

];

async function detectVisitorCurrency() {

    try {

        const response =
        await fetch("https://ipapi.co/json/");

        const data =
        await response.json();

        const countryCode =
        data.country_code;

        visitorCurrency =
       currencyMap[countryCode] || "USD";

       if (!supportedCurrencies.includes(visitorCurrency)) {

       visitorCurrency = "USD";

      }

        console.log("Visitor country:", countryCode);

        console.log("Visitor currency:", visitorCurrency);

    }

    catch (error) {

        console.log("Currency detection failed.");

        visitorCurrency = "USD";

    }

}

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
             s.logo;

            document.getElementById("organizationLogo").style.display =
                "block";

        }

        // Banner
        if (s.banner) {

            document.getElementById("paymentBanner").src =
             s.banner;

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

detectVisitorCurrency();

loadPortal();

document
.getElementById("payButton")
.addEventListener("click", startPayment);

function startPayment() {

    if (!settings.flutterwavePublicKey) {

        alert("Flutterwave Public Key has not been configured.");

        return;

    }
         console.log("Flutterwave Public Key:", settings.flutterwavePublicKey);
         console.log("Currency:", visitorCurrency);
         console.log("Amount:", settings.amount);
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

            logo: settings.logo

        }

    });

}
