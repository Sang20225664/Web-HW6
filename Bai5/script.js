// DOM element references
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const addProductBtn = document.getElementById("addProductBtn");
const addProductForm = document.getElementById("addProductForm");
const productList = document.getElementById("product-list");
const errorMsg = document.getElementById("errorMsg");

// Default products to show on first visit
const defaultProducts = [
    {
        name: "Harry Potter và Hòn đá Phù thủy",
        desc: "Cuốn sách mở đầu cho hành trình phiêu lưu của Harry Potter.",
        price: "120.000"
    },
    {
        name: "Doraemon - Tuyển tập đặc biệt",
        desc: "Những câu chuyện thú vị và ý nghĩa cùng Doraemon và Nobita.",
        price: "35.000"
    },
    {
        name: "Đắc Nhân Tâm",
        desc: "Cuốn sách kỹ năng sống kinh điển giúp thay đổi cuộc đời bạn.",
        price: "90.000"
    }
];

// Load products from localStorage or initialize with default products
let products = JSON.parse(localStorage.getItem("products"));

// If no products in localStorage, use default products and save them
if (!products || products.length === 0) {
    products = defaultProducts;
    localStorage.setItem("products", JSON.stringify(products));
}

// Render all products to the DOM
function renderProducts() {
    productList.innerHTML = ""; // Clear existing content before rendering

    // Loop through products array and create HTML elements
    products.forEach((item) => {
        const newItem = document.createElement("article");
        newItem.classList.add("product-item");

        newItem.innerHTML = `
            <h3 class="product-name">${item.name}</h3>
            <p class="product-desc">${item.desc}</p>
            <p class="product-price">Giá: ${item.price}đ</p>
        `;

        productList.appendChild(newItem);
    });
}

// Initial render when page loads to display saved products
renderProducts();

// Attach search event listeners (button click and keyboard input)
searchBtn.addEventListener("click", () => filterProducts());
searchInput.addEventListener("keyup", () => filterProducts());

// Filter products based on search keyword
function filterProducts() {
    const keyword = searchInput.value.toLowerCase();
    const items = document.querySelectorAll(".product-item");

    // Show/hide items matching the keyword in product name
    items.forEach(item => {
        const name = item.querySelector(".product-name").textContent.toLowerCase();
        item.style.display = name.includes(keyword) ? "" : "none";
    });
}

// Show/hide the add product form when button clicked
addProductBtn.addEventListener("click", () => {
    addProductForm.classList.toggle("hidden");
});

// Handle form submission to add new product
addProductForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload

    // Get and trim form input values
    const name = document.getElementById("productName").value.trim();
    const desc = document.getElementById("productDesc").value.trim();
    const price = document.getElementById("productPrice").value.trim();

    // Validate: name and price must not be empty, price must be positive
    if (name === "" || price === "" || Number(price) <= 0) {
        errorMsg.textContent = "Vui lòng nhập tên và giá hợp lệ!";
        return;
    }

    // Clear error message if validation passed
    errorMsg.textContent = "";

    // Add new product to beginning of array
    products.unshift({ name, desc, price });

    // Save updated products array to localStorage for persistence
    localStorage.setItem("products", JSON.stringify(products));

    // Re-render products to display the new item
    renderProducts();

    // Reset form and hide it
    addProductForm.reset();
    addProductForm.classList.add("hidden");
});

// Cancel button: reset form and hide without saving
document.getElementById("cancelBtn").addEventListener("click", () => {
    addProductForm.reset();
    addProductForm.classList.add("hidden");
    errorMsg.textContent = ""; // Clear any error messages
});
