let products = [];
let originalProducts = [];

async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    products = data.products.slice(0, 30);
    originalProducts = [...products];
    displayProducts(products);
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
  }
}

function displayProducts(productsToDisplay) {
  const tableBody = document.querySelector("#productsTable tbody");
  tableBody.innerHTML = "";

  productsToDisplay.forEach((product) => {
    const row = document.createElement("tr");

    const imgCell = document.createElement("td");
    const img = document.createElement("img");
    img.src = product.thumbnail;
    img.alt = product.title;
    imgCell.appendChild(img);
    row.appendChild(imgCell);

    const titleCell = document.createElement("td");
    titleCell.textContent = product.title;
    row.appendChild(titleCell);

    const descCell = document.createElement("td");
    descCell.textContent = product.description;
    row.appendChild(descCell);

    tableBody.appendChild(row);
  });
}

function filterProducts() {
  const filterValue = document
    .getElementById("filterInput")
    .value.toLowerCase();
  let filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(filterValue) ||
      product.description.toLowerCase().includes(filterValue)
  );
  displayProducts(filteredProducts);
}

function sortProducts() {
  const sortValue = document.getElementById("sortSelect").value;
  if (sortValue === "asc") {
    products.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === "desc") {
    products.sort((a, b) => b.title.localeCompare(a.title));
  } else {
    products = [...originalProducts];
  }
  filterProducts();
}

document
  .getElementById("filterInput")
  .addEventListener("input", filterProducts);
document.getElementById("sortSelect").addEventListener("change", sortProducts);

fetchProducts();
