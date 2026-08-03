const API = "https://back-kafm.onrender.com/api/settings";

async function loadSuccessPage() {

    try {

        const response = await fetch(API);

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

        console.log(error);

    }

}

loadSuccessPage();