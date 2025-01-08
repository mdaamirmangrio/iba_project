
let cart = JSON.parse(localStorage.getItem("cart")) || [];
showCart();

function showCart() {
    let display = document.getElementById("container");
    display.innerHTML = "";
    
    cart.forEach((item, index) => {
        let box = document.createElement("div");
        box.className = "container1";
        box.innerHTML = `
            <img class="primg" src="${item.imagePath}">
            <h3 class="title" >${item.title}</h3>
            <p class="author" >${item.author}</p>
            <h3 clss="price">$${item.price}</h3>
            <button class="remove" onclick="deleteItem(${index})">Remove</button>
        `;
        display.appendChild(box);
    });
}

// Removing item from cart
function deleteItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
    alert("Item removed!");
}