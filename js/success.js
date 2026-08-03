const SETTINGS_API = "https://back-kafm.onrender.com/api/settings";
const TRANSACTION_API = "https://back-kafm.onrender.com/api/transactions";

async function loadSuccessPage() {

    try {

        const response = await fetch(SETTINGS_API);

        const data = await response.json();

        if (!data.success) return;

        const s = data.settings;

        document.getElementById("successTitle").textContent =
            s.successTitle || "Payment Successful";

        document.getElementById("successMessage").textContent =
            s.successMessage || "";

        document.getElementById("referenceLabel").textContent =
            s.referenceLabel || "Reference Number";

        document.getElementById("statusLabel").textContent =
            s.statusLabel || "Status";

        document.getElementById("statusText").textContent =
            s.successStatus || "Successful";

        document.getElementById("footerMessage").textContent =
            s.successFooter || "";

        document.getElementById("returnButton").textContent =
            s.returnButtonText || "Return Home";

        const applicationNumber =
            localStorage.getItem("applicationNumber");

        document.getElementById("reference").textContent =
            applicationNumber || "Not Available";

    }

    catch (error) {

        console.error(error);

    }

}

loadSuccessPage();


// ======================================
// SAVE TRANSACTION
// ======================================

async function saveTransaction() {

    const params = new URLSearchParams(window.location.search);

    const transactionId = params.get("transaction_id");

    const txRef = params.get("tx_ref");

    const status = params.get("status");

    if (!transactionId || status !== "successful") {

        return;

    }

    // Prevent duplicate save if page refreshes
    if (sessionStorage.getItem("saved_" + transactionId)) {

        return;

    }

    try {

        const response = await fetch(TRANSACTION_API, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                transactionId,

                txRef,

                amount: 10, // we'll improve this next

                currency: "NGN", // we'll improve this next

                status: "Successful",

                customerName: "Grant Applicant",

                customerEmail: "payment@paymentportal.com",

                paymentMethod: "Flutterwave"

            })

        });

        const result = await response.json();

        if (result.success) {

            sessionStorage.setItem("saved_" + transactionId, "true");

            console.log("Transaction saved.");

        }

    }

    catch (error) {

        console.error(error);

    }

}

saveTransaction();