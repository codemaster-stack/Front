const API = "https://back-kafm.onrender.com/api/admin/login";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    try {

        const response = await fetch(API, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email,

                password

            })

        });

        const result = await response.json();

        if (!response.ok) {

            document.getElementById("message").textContent =
                result.message;

            return;

        }

        localStorage.setItem(

            "token",

            result.token

        );

        localStorage.setItem(

            "admin",

            JSON.stringify(result.admin)

        );

        window.location.href =
            "dashboard.html";

    }

    catch (error) {

        console.error(error);

        document.getElementById("message").textContent =
            "Unable to connect to server.";

    }

});