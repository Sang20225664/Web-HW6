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


    productList.appendChild(newItem);
    addProductForm.reset();
    addProductForm.classList.add("hidden");
});