const API_HOST = window.location.hostname || "localhost";
const MENU_API = `http://${API_HOST}:30000`;
const ORDER_API = `http://${API_HOST}:30001`;
function showSection(sectionId) {

    document.querySelectorAll("main > section").forEach(section => {
        section.hidden = section.id !== sectionId;
    });

    document.querySelectorAll(".nav-button").forEach(button => {
        button.classList.toggle("active", button.dataset.view === sectionId);
    });
}

function orderFood(foodName) {
    document.getElementById("itemName").value = foodName;
    document.getElementById("orderMessage").textContent = `${foodName} selected.`;
    document.querySelector(".order-form").scrollIntoView({ behavior: "smooth", block: "start" });
}

async function createOrder(event) {
    event.preventDefault();

    const orderMessage = document.getElementById("orderMessage");
    const order = {
        customerName: document.getElementById("customerName").value.trim(),
        itemName: document.getElementById("itemName").value,
        quantity: Number(document.getElementById("quantity").value)
    };

    if (!order.itemName) {
        orderMessage.textContent = "Choose an item from the menu first.";
        return;
    }

    try {
        const response = await fetch(`${ORDER_API}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
        });

        if (!response.ok) {
            throw new Error(`Order service returned HTTP ${response.status}.`);
        }

        orderMessage.textContent = "Order placed successfully.";
        document.getElementById("customerName").value = "";
        document.getElementById("itemName").value = "";
        document.getElementById("quantity").value = "1";
    } catch (error) {
        const detail = error instanceof Error ? error.message : "Unknown error.";
        orderMessage.textContent = `Could not place the order at ${ORDER_API}: ${detail}`;
    }
}

async function loadOrders() {
    const ordersMessage = document.getElementById("ordersMessage");
    const orderList = document.getElementById("orderList");
    orderList.replaceChildren();
    ordersMessage.textContent = "Loading orders...";

    try {
        const response = await fetch(`${ORDER_API}/orders`);
        if (!response.ok) {
            throw new Error(`Order service returned HTTP ${response.status}.`);
        }

        const orders = await response.json();
        ordersMessage.textContent = orders.length ? "" : "No orders yet.";

        orders.forEach(order => {
            const card = document.createElement("article");
            card.className = "order-card";

            const customer = document.createElement("h2");
            customer.textContent = order.customerName;
            const item = document.createElement("p");
            item.textContent = `Item: ${order.itemName}`;
            const quantity = document.createElement("p");
            quantity.textContent = `Quantity: ${order.quantity}`;
            const status = document.createElement("p");
            status.className = "status";
            status.textContent = `Status: ${order.status}`;

            card.append(customer, item, quantity, status);
            orderList.append(card);
        });
    } catch (error) {
        const detail = error instanceof Error ? error.message : "Unknown error.";
        ordersMessage.textContent = `Could not load orders from ${ORDER_API}: ${detail}`;
    }
}