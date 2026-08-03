const API = "https://back-kafm.onrender.com/api/settings";

const uploadAPI = "https://back-kafm.onrender.com/api/upload";

const token = localStorage.getItem("token");

let logo = "";

let banner = "";

// ------------------------------------
// AUTH CHECK
// ------------------------------------

if (!token) {

    window.location.href = "login.html";

}

// ------------------------------------
// LOGOUT
// ------------------------------------

document
.getElementById("logoutBtn")
.addEventListener("click", () => {

    localStorage.removeItem("token");

    localStorage.removeItem("admin");

    window.location.href = "login.html";

});

// ------------------------------------
// LOAD SETTINGS
// ------------------------------------

async function loadSettings() {

    try {

        const response = await fetch(API);

        const data = await response.json();

        if (!data.success) return;

        const s = data.settings;

        logo = s.logo || "";

        banner = s.banner || "";

        // Logo Preview
        if (logo) {

           document.getElementById("logoPreview").src =
               logo;

            document.getElementById("logoPreview").style.display =
                "block";

        }

        // Banner Preview
        if (banner) {

            document.getElementById("bannerPreview").src =
                banner;

            document.getElementById("bannerPreview").style.display =
                "block";

        }

        document.getElementById("organizationName").value =
            s.organizationName || "";

        document.getElementById("title").value =
            s.title || "";

        document.getElementById("description").value =
            s.description || "";


         document.getElementById("paymentNotice").value =
             s.paymentNotice || "";

        document.getElementById("amount").value =
            s.amount || "";

        document.getElementById("buttonText").value =
            s.buttonText || "";

        document.getElementById("footer").value =
            s.footer || "";

        document.getElementById("flutterwavePublicKey").value =
            s.flutterwavePublicKey || "";



            document.getElementById("successTitle").value =
s.successTitle || "";

document.getElementById("successMessage").value =
s.successMessage || "";

document.getElementById("referenceLabel").value =
s.referenceLabel || "";

document.getElementById("statusLabel").value =
s.statusLabel || "";

document.getElementById("successStatus").value =
s.successStatus || "";

document.getElementById("successFooter").value =
s.successFooter || "";

document.getElementById("returnButtonText").value =
s.returnButtonText || "";

    }

    catch (error) {

        console.error(error);

    }

}

loadSettings();

// ------------------------------------
// IMAGE UPLOAD
// ------------------------------------

async function uploadImage(file) {

    const formData = new FormData();

    formData.append("image", file);

    const response = await fetch(uploadAPI, {

        method: "POST",

        headers: {

            Authorization: `Bearer ${token}`

        },

        body: formData

    });

    const result = await response.json();

    if (result.success) {

        return result.image;

    }

    alert(result.message);

    return null;

}

// ------------------------------------
// SAVE SETTINGS
// ------------------------------------

document
.getElementById("settingsForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    // Upload Logo

    const logoFile =
        document.getElementById("logoFile").files[0];

    if (logoFile) {

        const uploadedLogo =
            await uploadImage(logoFile);

        if (uploadedLogo) {

            logo = uploadedLogo;

        }

    }

    // Upload Banner

    const bannerFile =
        document.getElementById("bannerFile").files[0];

    if (bannerFile) {

        const uploadedBanner =
            await uploadImage(bannerFile);

        if (uploadedBanner) {

            banner = uploadedBanner;

        }

    }

    try {

        const response = await fetch(API, {

            method: "PATCH",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify({

                organizationName:
                    document.getElementById("organizationName").value,

                logo: logo,

                banner: banner,

                title:
                    document.getElementById("title").value,


                description:
                    document.getElementById("description").value,

                    paymentNotice:
               document.getElementById("paymentNotice").value,

                amount:
                    Number(document.getElementById("amount").value),

                buttonText:
                    document.getElementById("buttonText").value,

                footer:
                    document.getElementById("footer").value,

                flutterwavePublicKey:
                    document.getElementById("flutterwavePublicKey").value


                    ,

successTitle:
document.getElementById("successTitle").value,

successMessage:
document.getElementById("successMessage").value,

referenceLabel:
document.getElementById("referenceLabel").value,

statusLabel:
document.getElementById("statusLabel").value,

successStatus:
document.getElementById("successStatus").value,

successFooter:
document.getElementById("successFooter").value,

returnButtonText:
document.getElementById("returnButtonText").value

            })

        });

        const result = await response.json();

        if (result.success) {

            alert("Settings Saved.");

            loadSettings();

        }

        else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to save settings.");

    }

});