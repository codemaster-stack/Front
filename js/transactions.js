const API =
"https://back-kafm.onrender.com/api/transactions";

const token =
localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

async function loadTransactions() {

    try {

        const response =
        await fetch(API, {

            headers: {

                Authorization:
                `Bearer ${token}`

            }

        });

        const result =
        await response.json();

        const body =
        document.getElementById("transactionBody");

        body.innerHTML = "";

        if (
            !result.success ||
            result.transactions.length === 0
        ) {

            body.innerHTML = `

            <tr>

                <td colspan="6">

                    No transactions found.

                </td>

            </tr>

            `;

            return;

        }

        result.transactions.forEach(transaction => {

            body.innerHTML += `

            <tr>

                <td>${new Date(transaction.paidAt).toLocaleString()}</td>

                <td>${transaction.txRef}</td>

                <td>${transaction.transactionId}</td>

                <td>${transaction.amount}</td>

                <td>${transaction.currency}</td>

                <td>${transaction.status}</td>

            </tr>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}

loadTransactions();