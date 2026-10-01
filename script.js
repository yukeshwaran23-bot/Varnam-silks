/* =====================================================
   VARNAM SILKS
   MAIN JAVASCRIPT
   ===================================================== */


/* =====================================================
   PRODUCT DATA
   ===================================================== */

const products = [

    {
        id: 1,
        name: "Elegant Silk Saree 01",
        type: "Silk Sarees",
        price: 2999,
        image: "images/saree-01.jpg",
        badge: "New"
    },

    {
        id: 2,
        name: "Classic Silk Saree 02",
        type: "Silk Sarees",
        price: 3299,
        image: "images/saree-02.jpg",
        badge: "New"
    },

    {
        id: 3,
        name: "Traditional Silk Saree 03",
        type: "Wedding Sarees",
        price: 3999,
        image: "images/saree-03.jpg",
        badge: "Featured"
    },

    {
        id: 4,
        name: "Royal Silk Saree 04",
        type: "Wedding Sarees",
        price: 4499,
        image: "images/saree-04.jpg",
        badge: "New"
    },

    {
        id: 5,
        name: "Designer Silk Saree 05",
        type: "Designer Sarees",
        price: 3699,
        image: "images/saree-05.jpg",
        badge: "New"
    },

    {
        id: 6,
        name: "Elegant Pink Saree 06",
        type: "Designer Sarees",
        price: 2899,
        image: "images/saree-06.jpg",
        badge: "Featured"
    },

    {
        id: 7,
        name: "Blue Zari Saree 07",
        type: "Silk Sarees",
        price: 3499,
        image: "images/saree-07.jpg",
        badge: "New"
    },

    {
        id: 8,
        name: "Classic Handloom Saree 08",
        type: "Silk Sarees",
        price: 3199,
        image: "images/saree-08.jpg",
        badge: "New"
    },

    {
        id: 9,
        name: "Green Designer Saree 09",
        type: "Designer Sarees",
        price: 3799,
        image: "images/saree-09.jpg",
        badge: "Featured"
    },

    {
        id: 10,
        name: "Pink Gold Saree 10",
        type: "Wedding Sarees",
        price: 4299,
        image: "images/saree-10.jpg",
        badge: "New"
    },

    {
        id: 11,
        name: "Pink Green Silk Saree 11",
        type: "Silk Sarees",
        price: 3599,
        image: "images/saree-11.jpg",
        badge: "New"
    },

    {
        id: 12,
        name: "Turquoise Pink Saree 12",
        type: "Designer Sarees",
        price: 3399,
        image: "images/saree-12.jpg",
        badge: "Featured"
    },

    {
        id: 13,
        name: "Mint Maroon Saree 13",
        type: "Designer Sarees",
        price: 3699,
        image: "images/saree-13.jpg",
        badge: "New"
    },

    {
        id: 14,
        name: "Purple Zari Saree 14",
        type: "Silk Sarees",
        price: 3899,
        image: "images/saree-14.jpg",
        badge: "New"
    },

    {
        id: 15,
        name: "Teal Maroon Saree 15",
        type: "Wedding Sarees",
        price: 4199,
        image: "images/saree-15.jpg",
        badge: "Featured"
    },

    {
        id: 16,
        name: "Pastel Purple Saree 16",
        type: "Silk Sarees",
        price: 3299,
        image: "images/saree-16.jpg",
        badge: "New"
    },

    {
        id: 17,
        name: "Cream Purple Saree 17",
        type: "Wedding Sarees",
        price: 4599,
        image: "images/saree-17.jpg",
        badge: "Featured"
    },

    {
        id: 18,
        name: "Pink Silver Saree 18",
        type: "Designer Sarees",
        price: 3499,
        image: "images/saree-18.jpg",
        badge: "New"
    },

    {
        id: 19,
        name: "Mustard Silver Saree 19",
        type: "Designer Sarees",
        price: 2999,
        image: "images/saree-19.jpg",
        badge: "New"
    },

    {
        id: 20,
        name: "Wine Silver Saree 20",
        type: "Silk Sarees",
        price: 3799,
        image: "images/saree-20.jpg",
        badge: "Featured"
    }

];


/* =====================================================
   LOAD ADMIN PRODUCTS
   ===================================================== */

function loadAdminProducts() {

    try {

        const saved =
            localStorage.getItem(
                "varnamAdminProducts"
            );


        if (!saved) {

            return;

        }


        const adminProducts =
            JSON.parse(saved);


        if (
            !Array.isArray(
                adminProducts
            )
        ) {

            return;

        }


        adminProducts
            .slice()
            .reverse()
            .forEach(
                function(adminProduct) {


                    const existingIndex =
                        products.findIndex(
                            function(product) {

                                return String(
                                    product.id
                                ) === String(
                                    adminProduct.id
                                );

                            }
                        );


                    const customerProduct = {

                        id:
                            adminProduct.id,

                        name:
                            adminProduct.name,

                        type:
                            adminProduct.category ||
                            "Sarees",

                        price:
                            Number(
                                adminProduct.price
                            ),

                        image:
                            adminProduct.image,

                        description:
                            adminProduct.description ||
                            "",

                        badge:
                            adminProduct.isNewArrival
                                ? "New"
                                : adminProduct.isBestSelling
                                    ? "Best Selling"
                                    : "",

                        createdAt:
                            adminProduct.createdAt ||
                            ""

                    };


                    if (
                        existingIndex !== -1
                    ) {

                        products[
                            existingIndex
                        ] =
                            customerProduct;

                    } else {

                        products.unshift(
                            customerProduct
                        );

                    }

                }
            );


    } catch (error) {

        console.log(
            "Could not load admin products.",
            error
        );

    }

}


loadAdminProducts();


/* =====================================================
   VARIABLES
   ===================================================== */

let visibleProducts = 10;

let currentCategory = "All";

let searchText = "";

let cart = [];


/* =====================================================
   CART STORAGE
   ===================================================== */

function saveCartToStorage() {

    localStorage.setItem(
        "varnamCart",
        JSON.stringify(cart)
    );

}


function loadCartFromStorage() {

    try {

        const savedCart =
            localStorage.getItem(
                "varnamCart"
            );


        if (!savedCart) {

            cart = [];

            return;

        }


        const parsedCart =
            JSON.parse(
                savedCart
            );


        cart =
            Array.isArray(parsedCart)
                ? parsedCart
                : [];


    } catch (error) {

        cart = [];

    }

}


/* =====================================================
   DOM ELEMENTS
   ===================================================== */

const productGrid =
    document.getElementById(
        "productGrid"
    );


const loadMoreBtn =
    document.getElementById(
        "loadMoreBtn"
    );


const searchBtn =
    document.getElementById(
        "searchBtn"
    );


const searchBox =
    document.getElementById(
        "searchBox"
    );


const searchInput =
    document.getElementById(
        "searchInput"
    );


const menuBtn =
    document.getElementById(
        "menuBtn"
    );


const menuPanel =
    document.getElementById(
        "menuPanel"
    );


const closeMenu =
    document.getElementById(
        "closeMenu"
    );


const overlay =
    document.getElementById(
        "overlay"
    );


const cartBtn =
    document.getElementById(
        "cartBtn"
    );


const cartDrawer =
    document.getElementById(
        "cartDrawer"
    );


const closeCart =
    document.getElementById(
        "closeCart"
    );


const cartItems =
    document.getElementById(
        "cartItems"
    );


const cartCount =
    document.getElementById(
        "cartCount"
    );


const cartTotal =
    document.getElementById(
        "cartTotal"
    );


/* =====================================================
   FORMAT PRICE
   ===================================================== */

function formatPrice(price) {

    return (
        "₹" +
        Number(price)
            .toLocaleString("en-IN")
    );

}


/* =====================================================
   GET FILTERED PRODUCTS
   ===================================================== */

function getFilteredProducts() {

    return products.filter(
        function(product) {


            const categoryMatch =
                currentCategory === "All" ||
                product.type === currentCategory;


            const searchMatch =
                product.name
                    .toLowerCase()
                    .includes(
                        searchText.toLowerCase()
                    );


            return (
                categoryMatch &&
                searchMatch
            );

        }
    );

}


/* =====================================================
   DISPLAY PRODUCTS
   ===================================================== */

function displayProducts() {

    const filteredProducts =
        getFilteredProducts();


    const productsToShow =
        filteredProducts.slice(
            0,
            visibleProducts
        );


    productGrid.innerHTML = "";


    if (
        productsToShow.length === 0
    ) {

        productGrid.innerHTML = `

            <div class="empty-cart">

                No sarees found.

            </div>

        `;


        loadMoreBtn.style.display =
            "none";


        return;

    }


    /* CREATE PRODUCT CARDS */

    productsToShow.forEach(
        function(product) {


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "product-card";


            card.innerHTML = `

                <div
                    class="product-image-wrap"
                >

                    <img
                        class="product-image"
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >


                    ${
                        product.badge
                        ?
                        `
                        <span
                            class="product-badge"
                        >
                            ${product.badge}
                        </span>
                        `
                        :
                        ""
                    }

                </div>


                <div
                    class="product-info"
                >


                    <h3
                        class="product-name"
                    >
                        ${product.name}
                    </h3>


                    <p
                        class="product-type"
                    >
                        ${product.type}
                    </p>


                    <div
                        class="product-price-row"
                    >


                        <span
                            class="product-price"
                        >
                            ${formatPrice(
                                product.price
                            )}
                        </span>


                        <button
                            class="add-cart-btn"
                            data-product-id="${String(product.id)}"
                            aria-label="Add to cart"
                            type="button"
                        >
                            +
                        </button>


                    </div>


                </div>

            `;


            productGrid.appendChild(
                card
            );


            /* ==========================================
               DIRECT ADD TO CART
               ========================================== */

            const addCartButton =
                card.querySelector(
                    ".add-cart-btn"
                );


            if (addCartButton) {

                addCartButton.addEventListener(
                    "click",
                    function(event) {

                        event.preventDefault();

                        event.stopPropagation();


                        addToCart(
                            product.id
                        );

                    }
                );

            }


            /* ==========================================
               OPEN PRODUCT DETAILS
               ========================================== */

            card.addEventListener(
                "click",
                function(event) {


                    if (
                        event.target.closest(
                            ".add-cart-btn"
                        )
                    ) {

                        return;

                    }


                    window.location.href =
                        `product.html?id=${product.id}`;

                }
            );


        }
    );


    /* LOAD MORE */

    if (
        visibleProducts <
        filteredProducts.length
    ) {

        loadMoreBtn.style.display =
            "block";

    } else {

        loadMoreBtn.style.display =
            "none";

    }

}


/* =====================================================
   ADD TO CART
   ===================================================== */

function addToCart(productId) {

    const product =
        products.find(
            function(item) {

                return String(
                    item.id
                ) === String(
                    productId
                );

            }
        );


    if (!product) {

        console.log(
            "Product not found:",
            productId
        );

        return;

    }


    const existing =
        cart.find(
            function(item) {

                return String(
                    item.id
                ) === String(
                    product.id
                );

            }
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id:
                product.id,

            name:
                product.name,

            price:
                Number(
                    product.price
                ) || 0,

            image:
                product.image || "",

            quantity:
                1

        });

    }


    saveCartToStorage();

    updateCart();

    openCart();

}


/* =====================================================
   UPDATE CART
   ===================================================== */

function updateCart() {

    cartItems.innerHTML = "";


    if (
        cart.length === 0
    ) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                Your cart is empty.

            </div>

        `;


        cartCount.textContent =
            "0";


        cartTotal.textContent =
            "₹0";


        return;

    }


    let totalItems = 0;

    let totalPrice = 0;


    cart.forEach(
        function(item) {


            totalItems +=
                Number(
                    item.quantity
                ) || 0;


            totalPrice +=
                (
                    Number(
                        item.price
                    ) || 0
                ) *
                (
                    Number(
                        item.quantity
                    ) || 0
                );


            const cartItem =
                document.createElement(
                    "div"
                );


            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <img
                    class="cart-item-image"
                    src="${item.image}"
                    alt="${item.name}"
                >


                <div
                    class="cart-item-details"
                >

                    <h4>
                        ${item.name}
                    </h4>


                    <p>

                        ${formatPrice(
                            item.price
                        )}

                        ×

                        ${item.quantity}

                    </p>

                </div>


                <button
                    class="remove-cart-item"
                    data-id="${item.id}"
                    type="button"
                >

                    Remove

                </button>

            `;


            cartItems.appendChild(
                cartItem
            );

        }
    );


    cartCount.textContent =
        totalItems;


    cartTotal.textContent =
        formatPrice(
            totalPrice
        );

}


/* =====================================================
   REMOVE FROM CART
   ===================================================== */

function removeFromCart(productId) {

    cart =
        cart.filter(
            function(item) {

                return String(
                    item.id
                ) !== String(
                    productId
                );

            }
        );


    saveCartToStorage();

    updateCart();

}


/* =====================================================
   OPEN CART
   ===================================================== */

function openCart() {

    cartDrawer.classList.add(
        "active"
    );


    overlay.classList.add(
        "active"
    );

}


/* =====================================================
   CLOSE CART
   ===================================================== */

function closeCartDrawer() {

    cartDrawer.classList.remove(
        "active"
    );


    overlay.classList.remove(
        "active"
    );

}


/* =====================================================
   OPEN MENU
   ===================================================== */

function openMenu() {

    menuPanel.classList.add(
        "active"
    );


    overlay.classList.add(
        "active"
    );

}


/* =====================================================
   CLOSE MENU
   ===================================================== */

function closeMenuPanel() {

    menuPanel.classList.remove(
        "active"
    );


    overlay.classList.remove(
        "active"
    );

}

/* =====================================================
   SEARCH BUTTON
   ===================================================== */

searchBtn.addEventListener(
    "click",
    function() {

        searchBox.classList.toggle(
            "active"
        );


        if (
            searchBox.classList.contains(
                "active"
            )
        ) {

            searchInput.focus();

        }

    }
);


/* =====================================================
   SEARCH INPUT
   ===================================================== */

searchInput.addEventListener(
    "input",
    function(event) {

        searchText =
            event.target.value.trim();


        visibleProducts =
            10;


        displayProducts();

    }
);


/* =====================================================
   MENU BUTTON
   ===================================================== */

menuBtn.addEventListener(
    "click",
    openMenu
);


/* =====================================================
   CLOSE MENU
   ===================================================== */

closeMenu.addEventListener(
    "click",
    closeMenuPanel
);


/* =====================================================
   CART BUTTON
   ===================================================== */

cartBtn.addEventListener(
    "click",
    openCart
);


/* =====================================================
   CLOSE CART
   ===================================================== */

closeCart.addEventListener(
    "click",
    closeCartDrawer
);


/* =====================================================
   OVERLAY
   ===================================================== */

overlay.addEventListener(
    "click",
    function() {

        closeCartDrawer();

        closeMenuPanel();

    }
);


/* =====================================================
   CATEGORY BUTTONS
   ===================================================== */

const categoryButtons =
    document.querySelectorAll(
        ".category-btn"
    );


categoryButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {


                categoryButtons.forEach(
                    function(btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                currentCategory =
                    button.dataset.category;


                visibleProducts =
                    10;


                displayProducts();

            }
        );

    }
);


/* =====================================================
   LOAD MORE
   ===================================================== */

loadMoreBtn.addEventListener(
    "click",
    function() {

        visibleProducts +=
            10;


        displayProducts();

    }
);


/* =====================================================
   IMPORTANT:
   NO PRODUCT-GRID CART LISTENER HERE
   =====================================================

   The + button is already connected
   directly inside displayProducts().

   Do NOT add another:

   productGrid.addEventListener(...)

   for add-to-cart.
*/


/* =====================================================
   CART ITEMS
   ===================================================== */

cartItems.addEventListener(
    "click",
    function(event) {


        const button =
            event.target.closest(
                ".remove-cart-item"
            );


        if (!button) {

            return;

        }


        const productId =
            button.getAttribute(
                "data-id"
            );


        removeFromCart(
            productId
        );

    }
);


/* =====================================================
   MENU LINKS
   ===================================================== */

const menuLinks =
    menuPanel.querySelectorAll(
        "a"
    );


menuLinks.forEach(
    function(link) {

        link.addEventListener(
            "click",
            function() {

                closeMenuPanel();

            }
        );

    }
);


/* =====================================================
   CHECKOUT BUTTON
   ===================================================== */

const checkoutButton =
    document.querySelector(
        ".checkout-btn"
    );


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function() {


            if (
                cart.length === 0
            ) {

                alert(
                    "Your cart is empty."
                );


                return;

            }


            window.location.href =
                "checkout.html";

        }
    );

}


/* =====================================================
   INITIAL LOAD
   ===================================================== */

loadCartFromStorage();

displayProducts();

updateCart();


/* =====================================================
   ACCOUNT BUTTON
   ===================================================== */

const accountBtn =
    document.getElementById(
        "accountBtn"
    );


if (accountBtn) {

    accountBtn.addEventListener(
        "click",
        function() {

            window.location.href =
                "my-orders.html";

        }
    );

}