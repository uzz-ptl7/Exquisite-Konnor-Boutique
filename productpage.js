let categories = {};
let products = [];

const contact = {
  whatsapp: "250738019704",
  email: "your@email.com",
};

// Calculate quantity dynamically based on products loaded
function calculateQuantities() {
  for (const cat in categories) {
    categories[cat].quantity = products.filter(
      (p) => p.category === cat
    ).length;
  }
}

async function loadData() {
  try {
    const catResp = await fetch("assets/categories.json");
    categories = await catResp.json();

    const prodResp = await fetch("assets/products.json");
    products = await prodResp.json();

    calculateQuantities(); // <-- Calculate quantities dynamically here

    renderCategories();
    loadProducts();
  } catch (error) {
    console.error("Error loading JSON data:", error);
    document.getElementById("productGrid").innerHTML =
      "<p class='text-red-500'>Failed to load data.</p>";
  }
}

function renderCategories() {
  const list = document.getElementById("categoryList");
  list.innerHTML = "";
  for (const cat in categories) {
    const li = document.createElement("li");
    li.className =
      "p-3 bg-gray-800 rounded cursor-pointer hover:bg-purple-500 transition";
    li.innerHTML = `<strong>${cat}</strong><br><span class="text-sm text-gray-400">${categories[cat].quantity} items</span>`;
    li.onclick = () => loadProducts(cat);
    list.appendChild(li);
  }
}

function renderSubcategories(category) {
  const subBtns = document.getElementById("subcategoryButtons");
  subBtns.innerHTML = "";
  categories[category].subcategories.forEach((sub) => {
    const btn = document.createElement("button");
    btn.className =
      "bg-darkgray text-white px-4 py-2 rounded hover:bg-purple-500 transition";
    btn.textContent = sub;
    btn.dataset.subcategory = sub;
    btn.onclick = () => loadProducts(category, sub);
    subBtns.appendChild(btn);
  });
}

function loadProducts(category = null, subcategory = null) {
  document
    .querySelectorAll(".active")
    .forEach((e) => e.classList.remove("active"));
  if (subcategory)
    document
      .querySelector(`[data-subcategory='${subcategory}']`)
      ?.classList.add("active");

  const grid = document.getElementById("productGrid");
  grid.innerHTML = "<div class='skeleton w-full h-32 rounded-md'></div>".repeat(
    6
  );

  setTimeout(() => {
    grid.innerHTML = "";
    let filtered = category
      ? products.filter(
          (p) =>
            p.category === category &&
            (!subcategory || p.subcategory === subcategory)
        )
      : products;
    if (category && !subcategory) renderSubcategories(category);
    if (filtered.length === 0) {
      grid.innerHTML = "<p class='text-gray-400'>No products available.</p>";
      return;
    }
    filtered.forEach((p) => {
      const card = document.createElement("div");
      card.className =
        "bg-darkgray p-4 rounded-lg shadow-md border border-purple-500 transition hover:shadow-lg hover:border-purple-400";
      card.innerHTML = `
                        <img src="${p.image}" alt="${p.name}" class="w-full h-48 object-cover mb-2 rounded" />
                        <h3 class="text-xl font-semibold">${p.name}</h3>
                        <p class="text-purple-400 mb-2">${p.price}</p>
                        <button onclick="openModal('${p.name}', '${p.image}')" class="bg-purple-500 w-full p-2 rounded hover:bg-purple-600 transition">Inquire</button>
                    `;
      grid.appendChild(card);
    });
  }, 600);
}

function openModal(name, image) {
  document.getElementById("modalProductName").textContent = name;
  document.getElementById("modalProductImage").src = image;
  document.getElementById("modalMessage").value = "";
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

function sendViaWhatsApp() {
  const message = document.getElementById("modalMessage").value;
  const product = document.getElementById("modalProductName").textContent;
  const url = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    "Product: " + product + "\n\n" + message
  )}`;
  window.open(url, "_blank");
}

function sendViaEmail() {
  const message = document.getElementById("modalMessage").value;
  const product = document.getElementById("modalProductName").textContent;
  const url = `mailto:${contact.email}?subject=${encodeURIComponent(
    "Inquiry: " + product
  )}&body=${encodeURIComponent(message)}`;
  window.location.href = url;
}

loadData();
