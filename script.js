const BASE_URL = "https://fakestoreapi.com";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const body = document.body;

fetch(`${BASE_URL}/products/${id}`)
  .then(res => res.json())
  .then(product => {
    const { title, price, image, description, category, rating } = product;

    const rate = rating ? rating.rate : 0;
    const count = rating ? rating.count : 0;


    body.innerHTML = `
      <nav class="back-nav">
          <a href="index.html"><i class="fa-solid fa-arrow-left"></i> Back to products</a>
      </nav>

      <main class="product-container">
          
          <section class="product-image-section">
              <img src="${image}" alt="${title}" class="product-img" />
          </section>

          <article class="product-details-section">
              <span class="category-tag">${category}</span>
              <h1 class="product-title">${title}</h1>

              <div class="rating-container">
                  <div class="stars">
                      <i class="fa-solid fa-star text-amber"></i>
                      <span style="font-weight: 600; margin-left: 4px;">${rate}</span>
                  </div>
                  <span class="reviews-count">(${count} reviews)</span>
              </div>

              <div class="product-price">$${price}</div>

              <div class="tabs-container">
                  <button class="tab-btn active" type="button">Description</button>
                  <button class="tab-btn" type="button">Details</button>
                  <button class="tab-btn" type="button">Shipping</button>
              </div>

              <p class="product-description">${description}</p>

              <div class="quantity-container">
                  <span class="quantity-label">Quantity</span>
                  <div class="quantity-selector">
                      <button type="button" class="qty-btn" id="minus-btn">-</button>
                      <input type="number" value="1" min="1" class="qty-input" id="qty-input" readonly />
                      <button type="button" class="qty-btn" id="plus-btn">+</button>
                  </div>
              </div>

              <div class="actions-container">
                  <button class="add-to-cart-btn" type="button">
                      <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                  </button>
                  <button class="wishlist-btn" type="button">
                      <i class="fa-solid fa-heart"></i>
                  </button>
              </div>

          </article>
      </main>
    `;

    setupQuantityControls();
  })
  .catch(err => console.error("Xatolik yuz berdi:", err));
