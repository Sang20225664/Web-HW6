// DOM element references
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const addProductBtn = document.getElementById("addProductBtn");
const addProductForm = document.getElementById("addProductForm");
const productList = document.getElementById("product-list");

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
    const errorMsg = document.getElementById("errorMsg");

    // Validate: name and price must not be empty, price must be positive
    if (name === "" || price === "" || Number(price) <= 0) {
        errorMsg.textContent = "Vui lòng nhập tên và giá hợp lệ!";
        return;
    }

    // Clear error message if validation passed
    errorMsg.textContent = "";

    // Create new product item element
    const newItem = document.createElement("article");
    newItem.classList.add("product-item");

    // Set HTML content for the new product
    newItem.innerHTML = `
        <h3 class="product-name">${name}</h3>
        <p class="product-desc">${desc}</p>
        <p class="price">Giá: ${price}đ</p>
    `;

    // Add new product to the top of the list
    productList.prepend(newItem);

    // Reset form and hide it
    addProductForm.reset();
    addProductForm.classList.add("hidden");
});
document.getElementById("cancelBtn").addEventListener("click", () => {
    addProductForm.reset();
    addProductForm.classList.add("hidden");
    document.getElementById("errorMsg").textContent = "";
});
