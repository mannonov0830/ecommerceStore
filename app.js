const BASE_URl = "https://fakestoreapi.com";

let inputBorder = document.getElementById("inputBorder");
let searchInput = document.getElementById("searchInput");
let cartFlex = document.getElementById("cartFlex");

const loginBtn = document.getElementById("loginBtn");
const modal = document.getElementById("loginModal");
const closeBtn = document.querySelector(".close");


let allProducts = [];


searchInput.addEventListener("focus", () => {
    inputBorder.classList.add("active");
});

searchInput.addEventListener("blur", () => {
    inputBorder.classList.remove("active");
});

function renderProducts(products) {

    cartFlex.innerHTML = "";

    products.forEach((product) => {

        const { title, price, image, description } = product;

        cartFlex.innerHTML += `
        
        <div class="cart">

            <img src="${image}" alt="">

            <div class="like">
                <i class="ri-heart-line"></i>
            </div>

            <div class="iconBnt">

                <button class="eyeBtn" data-id="${product.id}">
                    <i class="ri-eye-line"></i>
                </button>

                <button>
                    <i class="ri-shopping-cart-line"></i>
                </button>

            </div>

            <div class="texts">

                <h1 class="title">
                    ${title.length > 25 ? title.slice(0, 25) + "..." : title}
                </h1>

                <p class="descrip">
                    ${description.length > 45 ? description.slice(0, 45) + "..." : description}
                </p>

                <p class="price">$${price}</p>

                <button class="btns">Add to Cart</button>

            </div>

        </div>
        `;
    });
}

fetch(BASE_URl + "/products")
    .then((res) => res.json())
    .then((data) => {

        allProducts = data;

        renderProducts(allProducts);

    });


searchInput.addEventListener("input", () => {

    let value = searchInput.value.toLowerCase();

    let filtered = allProducts.filter((product) => {
        return product.title.toLowerCase().includes(value);
    });

    renderProducts(filtered);

});

document.addEventListener("click", (e) => {

    const btn = e.target.closest(".eyeBtn");

    if (btn) {
        const id = btn.dataset.id;
        window.location.href = `singel.html?id=${id}`;
    }

});




loginBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

