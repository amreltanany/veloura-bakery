/* ========== PRODUCTS DATA ========== */
const products = [
  {
    id: 1,
    name: "Velvet Chocolate Layer",
    category: "cakes",
    price: 48,
    desc: "Rich Belgian chocolate sponge with silky ganache and dark cocoa frosting.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80",
    badge: "Bestseller",
    featured: true
  },
  {
    id: 2,
    name: "Vanilla Bean Dream",
    category: "cakes",
    price: 42,
    desc: "Madagascar vanilla cake layered with buttercream and fresh vanilla bean.",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&q=80",
    featured: true
  },
  {
    id: 3,
    name: "Strawberry Shortcake",
    category: "cakes",
    price: 46,
    desc: "Light sponge, whipped cream, and macerated local strawberries.",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80",
    badge: "Seasonal",
    featured: true
  },
  {
    id: 4,
    name: "Lemon Raspberry Tart",
    category: "pastries",
    price: 28,
    desc: "Buttery shortcrust, tangy lemon curd, and fresh raspberries.",
    image: "https://images.unsplash.com/photo-1768236360495-8c32c6645590?w=500&q=80",
    featured: true
  },
  {
    id: 5,
    name: "Red Velvet Cupcakes",
    category: "cupcakes",
    price: 32,
    desc: "Box of 6 classic red velvet with cream cheese frosting.",
    image: "https://images.unsplash.com/photo-1759524322472-3f146a43cf9a?w=500&q=80",
    badge: "Popular"
  },
  {
    id: 6,
    name: "Salted Caramel Brownies",
    category: "cookies",
    price: 18,
    desc: "Fudgy brownies swirled with house-made salted caramel. Box of 4.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80"
  },
  {
    id: 7,
    name: "Almond Croissants",
    category: "pastries",
    price: 22,
    desc: "Flaky laminated dough filled with almond cream. Pack of 4.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80"
  },
  {
    id: 8,
    name: "Classic Chocolate Chip",
    category: "cookies",
    price: 14,
    desc: "Chewy edges, soft center, premium chocolate chunks. Dozen.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&q=80"
  },
  {
    id: 9,
    name: "Matcha White Chocolate",
    category: "cakes",
    price: 52,
    desc: "Japanese matcha sponge with white chocolate ganache.",
    image: "https://images.unsplash.com/photo-1759324351433-c5a1063f8ac6?w=500&q=80"
  },
  {
    id: 10,
    name: "Birthday Sprinkle Cupcakes",
    category: "cupcakes",
    price: 30,
    desc: "Vanilla cupcakes with rainbow sprinkles and buttercream. Box of 6.",
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=500&q=80"
  },
  {
    id: 11,
    name: "Pain au Chocolat",
    category: "pastries",
    price: 16,
    desc: "Classic French pastry with two bars of dark chocolate. Pack of 3.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80"
  },
  {
    id: 12,
    name: "Earl Grey Shortbread",
    category: "cookies",
    price: 15,
    desc: "Buttery shortbread infused with bergamot. Box of 8.",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80"
  }
];

/* ========== STATE ========== */
let cart = JSON.parse(localStorage.getItem("velouraCart") || "[]");
let currentFilter = "all";
let currentSort = "featured";

const customState = {
  size: { value: "6", price: 38, label: '6" (serves 8)' },
  flavor: { value: "vanilla", price: 0, label: "Vanilla Bean" },
  filling: { value: "buttercream", price: 0, label: "Vanilla Buttercream" },
  frosting: { value: "buttercream", price: 0, label: "Classic Buttercream", color: "#f5e6d3" },
  toppings: [],
  message: "",
  notes: ""
};

/* ========== HELPERS ========== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function formatPrice(n) {
  return "$" + n.toFixed(2);
}

// Cake messages are typed by the visitor, so escape them before they go into innerHTML.
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/* ========== SMOOTH SCROLL + REVEALS ========== */
let lenis = null;
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  document.documentElement.classList.add("gsap");
  gsap.registerPlugin(ScrollTrigger);
  if (typeof Lenis !== "undefined") {
    lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
}

function setupReveals() {
  if (typeof gsap === "undefined") return;
  gsap.from(".hero-content > *", { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.1 });
  gsap.from(".hero-card", { y: 60, opacity: 0, duration: 1.4, ease: "expo.out", delay: 0.2 });
  gsap.to(".hero-img", { backgroundPositionY: "80%", ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.utils.toArray(".fade").forEach(el => {
    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "expo.out", clearProps: "transform",
      scrollTrigger: { trigger: el, start: "top 90%" } });
  });
}

// Lock page scroll while the cart or a popup is open.
function lockScroll(on) {
  document.body.style.overflow = on ? "hidden" : "";
  if (lenis) on ? lenis.stop() : lenis.start();
}

function saveCart() {
  localStorage.setItem("velouraCart", JSON.stringify(cart));
  updateCartUI();
}

function getCartCount() {
  return cart.reduce((sum, i) => sum + i.qty, 0);
}

function getCartTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

/* ========== NAVIGATION ========== */
function showSection(id) {
  $$(".section").forEach(s => s.classList.remove("active"));
  $$(".nav-link").forEach(l => l.classList.remove("active"));
  const section = document.getElementById(id);
  if (section) section.classList.add("active");
  $$(`[data-section="${id}"]`).forEach(l => l.classList.add("active"));
  closeMobileNav();
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
  // Sections switch with display:none, so reveal positions must be re-measured.
  if (typeof ScrollTrigger !== "undefined") requestAnimationFrame(() => ScrollTrigger.refresh());
}

function filterAndShow(cat) {
  currentFilter = cat;
  $$(".pill").forEach(p => p.classList.toggle("active", p.dataset.filter === cat));
  renderShop();
  showSection("shop");
}

function closeMobileNav() {
  $("#mobileNav").classList.remove("open");
}

/* ========== RENDER PRODUCTS ========== */
function productCardHTML(p) {
  return `
    <article class="product-card" data-id="${p.id}">
      <div class="product-img" style="background-image:url('${p.image}')">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
      </div>
      <div class="product-body">
        <span class="product-cat">${p.category}</span>
        <h3>${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="product-price">${formatPrice(p.price)}</span>
          <button class="btn btn-primary btn-sm add-to-cart" data-id="${p.id}">Add to Cart</button>
        </div>
      </div>
    </article>
  `;
}

function renderFeatured() {
  const featured = products.filter(p => p.featured);
  $("#featuredGrid").innerHTML = featured.map(productCardHTML).join("");
}

function renderShop() {
  let list = currentFilter === "all"
    ? [...products]
    : products.filter(p => p.category === currentFilter);

  if (currentSort === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (currentSort === "price-desc") list.sort((a, b) => b.price - a.price);
  else if (currentSort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
  else list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  $("#shopGrid").innerHTML = list.length
    ? list.map(productCardHTML).join("")
    : `<p style="grid-column:1/-1;text-align:center;color:var(--text-muted)">No products in this category yet.</p>`;
}

/* ========== CART ========== */
function addToCart(item) {
  const existing = cart.find(c => c.id === item.id && c.customKey === item.customKey);
  if (existing) {
    existing.qty += item.qty || 1;
  } else {
    cart.push({ ...item, qty: item.qty || 1 });
  }
  saveCart();
  openCart();
  // subtle feedback
  const btn = $("#cartBtn");
  btn.style.transform = "scale(1.15)";
  setTimeout(() => (btn.style.transform = ""), 200);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
}

function updateQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty < 1) cart.splice(index, 1);
  saveCart();
}

function updateCartUI() {
  const count = getCartCount();
  const countEl = $("#cartCount");
  countEl.textContent = count;
  countEl.classList.toggle("visible", count > 0);

  const itemsEl = $("#cartItems");
  const emptyEl = $("#cartEmpty");
  const footerEl = $("#cartFooter");

  if (cart.length === 0) {
    emptyEl.style.display = "block";
    footerEl.hidden = true;
    // keep empty message, remove items
    itemsEl.querySelectorAll(".cart-item").forEach(el => el.remove());
    return;
  }

  emptyEl.style.display = "none";
  footerEl.hidden = false;

  // rebuild items
  itemsEl.querySelectorAll(".cart-item").forEach(el => el.remove());
  cart.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    const imgStyle = item.image
      ? `background-image:url('${item.image}')`
      : `background:linear-gradient(135deg,${item.color || "#f5e6d3"},#e8d5c4)`;
    div.innerHTML = `
      <div class="cart-item-img" style="${imgStyle}"></div>
      <div class="cart-item-info">
        <h4>${esc(item.name)}</h4>
        <div class="cart-item-meta">${esc(item.meta)}</div>
        <div class="cart-item-actions">
          <button class="qty-btn" data-action="dec" data-i="${i}">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-i="${i}">+</button>
          <span class="cart-item-price">${formatPrice(item.price * item.qty)}</span>
          <button class="remove-item" data-i="${i}">Remove</button>
        </div>
      </div>
    `;
    itemsEl.appendChild(div);
  });

  $("#cartSubtotal").textContent = formatPrice(getCartTotal());
}

function openCart() {
  $("#cartDrawer").classList.add("open");
  $("#overlay").classList.add("open");
  lockScroll(true);
}

function closeCart() {
  $("#cartDrawer").classList.remove("open");
  $("#overlay").classList.remove("open");
  lockScroll(false);
}

/* ========== CUSTOMIZER ========== */
function updateCustomPreview() {
  const total =
    customState.size.price +
    customState.flavor.price +
    customState.filling.price +
    customState.frosting.price +
    customState.toppings.reduce((s, t) => s + t.price, 0);

  $("#customPrice").textContent = formatPrice(total);
  $("#addCustomPrice").textContent = formatPrice(total);

  // update cake colors
  const color = customState.frosting.color || "#f5e6d3";
  $("#previewBase").style.background = color;
  $("#previewMid").style.background = color;
  $("#previewTop").style.background = color;

  // size visual
  const sizeMap = { "6": [140, 110, 85], "8": [160, 130, 100], "10": [180, 150, 115] };
  const [b, m, t] = sizeMap[customState.size.value] || sizeMap["6"];
  $("#previewBase").style.width = b + "px";
  $("#previewMid").style.width = m + "px";
  $("#previewTop").style.width = t + "px";

  // toppings emoji
  const toppingIcons = {
    freshfruit: "🍓",
    gold: "✨",
    flowers: "🌸",
    chocolatecurls: "🍫",
    macarons: "🍪"
  };
  const topEl = $("#previewTopping");
  if (customState.toppings.length) {
    topEl.textContent = customState.toppings.map(t => toppingIcons[t.value] || "✨").join(" ");
    topEl.classList.add("visible");
  } else {
    topEl.classList.remove("visible");
  }

  // details list
  const details = [
    `Size: ${customState.size.label}`,
    `Flavor: ${customState.flavor.label}`,
    `Filling: ${customState.filling.label}`,
    `Frosting: ${customState.frosting.label}`
  ];
  if (customState.toppings.length) {
    details.push("Toppings: " + customState.toppings.map(t => t.label).join(", "));
  }
  if (customState.message) details.push(`Message: "${customState.message}"`);

  $("#customDetails").innerHTML = details.map(d => `<li>${esc(d)}</li>`).join("");
  $("#customName").textContent = customState.message
    ? `Custom Cake — "${customState.message}"`
    : "Your Custom Cake";
}

function setupCustomizer() {
  // single-select groups
  ["size", "flavor", "filling", "frosting"].forEach(group => {
    const container = $(`#${group}Options`);
    if (!container) return;
    container.addEventListener("click", e => {
      const btn = e.target.closest(".option-btn");
      if (!btn) return;
      $$(".option-btn", container).forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      customState[group] = {
        value: btn.dataset.value,
        price: parseFloat(btn.dataset.price) || 0,
        label: btn.textContent.trim(),
        color: btn.dataset.color
      };
      updateCustomPreview();
    });
  });

  // multi-select toppings
  $("#toppingOptions").addEventListener("click", e => {
    const btn = e.target.closest(".option-btn");
    if (!btn) return;
    btn.classList.toggle("active");
    const value = btn.dataset.value;
    const price = parseFloat(btn.dataset.price) || 0;
    const label = btn.textContent.trim();
    if (btn.classList.contains("active")) {
      customState.toppings.push({ value, price, label });
    } else {
      customState.toppings = customState.toppings.filter(t => t.value !== value);
    }
    updateCustomPreview();
  });

  $("#cakeMessage").addEventListener("input", e => {
    customState.message = e.target.value.trim();
    updateCustomPreview();
  });

  $("#cakeNotes").addEventListener("input", e => {
    customState.notes = e.target.value.trim();
  });

  $("#addCustomToCart").addEventListener("click", () => {
    const total =
      customState.size.price +
      customState.flavor.price +
      customState.filling.price +
      customState.frosting.price +
      customState.toppings.reduce((s, t) => s + t.price, 0);

    const metaParts = [
      customState.size.label,
      customState.flavor.label,
      customState.filling.label
    ];
    if (customState.toppings.length) {
      metaParts.push(customState.toppings.map(t => t.label).join(", "));
    }

    const customKey = JSON.stringify({
      size: customState.size.value,
      flavor: customState.flavor.value,
      filling: customState.filling.value,
      frosting: customState.frosting.value,
      toppings: customState.toppings.map(t => t.value).sort(),
      message: customState.message
    });

    addToCart({
      id: "custom-" + Date.now(),
      customKey,
      name: customState.message
        ? `Custom Cake — "${customState.message}"`
        : "Custom Celebration Cake",
      price: total,
      qty: 1,
      meta: metaParts.join(" · "),
      color: customState.frosting.color,
      notes: customState.notes,
      isCustom: true
    });
  });

  updateCustomPreview();
}

/* ========== CHECKOUT ========== */
let checkoutStep = 1;

function openCheckout() {
  if (cart.length === 0) return;
  closeCart();
  checkoutStep = 1;
  updateCheckoutSteps();
  $("#checkoutModal").classList.add("open");
  lockScroll(true);
  // set min date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  $("#deliveryDate").min = tomorrow.toISOString().split("T")[0];
  $("#deliveryDate").value = tomorrow.toISOString().split("T")[0];
}

function closeCheckout() {
  $("#checkoutModal").classList.remove("open");
  lockScroll(false);
}

function updateCheckoutSteps() {
  $$(".step").forEach(s => {
    const n = parseInt(s.dataset.step);
    s.classList.toggle("active", n === checkoutStep);
    s.classList.toggle("done", n < checkoutStep);
  });
  $$(".checkout-panel").forEach(p => {
    p.classList.toggle("active", parseInt(p.dataset.panel) === checkoutStep);
  });

  if (checkoutStep === 3) {
    const subtotal = getCartTotal();
    const fulfillment = document.querySelector('input[name="fulfillment"]:checked')?.value;
    const shipping = fulfillment === "delivery" ? 8 : 0;
    const total = subtotal + shipping;
    $("#orderSummary").innerHTML = `
      <div class="line"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
      <div class="line"><span>${fulfillment === "delivery" ? "Delivery" : "Pickup"}</span><span>${shipping ? formatPrice(shipping) : "Free"}</span></div>
      <div class="line total"><span>Total</span><span>${formatPrice(total)}</span></div>
    `;
  }
}

function setupCheckout() {
  // delivery toggle
  $$('input[name="fulfillment"]').forEach(r => {
    r.addEventListener("change", () => {
      $("#addressFields").style.display = r.value === "delivery" ? "block" : "none";
    });
  });

  // next / prev
  $$(".next-step").forEach(btn => {
    btn.addEventListener("click", () => {
      if (checkoutStep === 1) {
        if (!$("#firstName").value || !$("#lastName").value || !$("#email").value || !$("#phone").value) {
          alert("Please fill in all contact details.");
          return;
        }
      }
      if (checkoutStep === 2) {
        const fulfillment = document.querySelector('input[name="fulfillment"]:checked').value;
        if (fulfillment === "delivery") {
          if (!$("#address").value || !$("#city").value || !$("#zip").value) {
            alert("Please enter your delivery address.");
            return;
          }
        }
      }
      if (checkoutStep < 3) {
        checkoutStep++;
        updateCheckoutSteps();
      }
    });
  });

  $$(".prev-step").forEach(btn => {
    btn.addEventListener("click", () => {
      if (checkoutStep > 1) {
        checkoutStep--;
        updateCheckoutSteps();
      }
    });
  });

  // card formatting
  $("#cardNumber")?.addEventListener("input", e => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 16);
    e.target.value = v.replace(/(.{4})/g, "$1 ").trim();
  });
  $("#expiry")?.addEventListener("input", e => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2);
    e.target.value = v;
  });

  $("#checkoutForm").addEventListener("submit", e => {
    e.preventDefault();
    // simple validation
    if (!$("#cardName").value || !$("#cardNumber").value || !$("#expiry").value || !$("#cvc").value) {
      alert("Please complete payment details.");
      return;
    }

    const orderId = "VL-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const name = $("#firstName").value;
    $("#successMessage").textContent = `Thank you, ${name}! Your order is confirmed and we’ll start baking shortly.`;
    $("#orderId").textContent = `Order #${orderId}`;

    cart = [];
    saveCart();
    closeCheckout();
    $("#successModal").classList.add("open");
  });

  $("#closeSuccess").addEventListener("click", () => {
    $("#successModal").classList.remove("open");
    lockScroll(false);
    showSection("shop");
  });
}

/* ========== EVENTS ========== */
function setupEvents() {
  // nav
  $$("[data-section]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      showSection(link.dataset.section);
    });
  });

  $("#menuToggle").addEventListener("click", () => {
    $("#mobileNav").classList.toggle("open");
  });

  // cart
  $("#cartBtn").addEventListener("click", openCart);
  $("#closeCart").addEventListener("click", closeCart);
  $("#overlay").addEventListener("click", () => {
    closeCart();
    closeCheckout();
    $("#productModal").classList.remove("open");
  });

  $("#cartItems").addEventListener("click", e => {
    const btn = e.target.closest("[data-action], .remove-item");
    if (!btn) return;
    const i = parseInt(btn.dataset.i);
    if (btn.classList.contains("remove-item")) removeFromCart(i);
    else if (btn.dataset.action === "inc") updateQty(i, 1);
    else if (btn.dataset.action === "dec") updateQty(i, -1);
  });

  $("#checkoutBtn").addEventListener("click", openCheckout);
  $("#closeCheckout").addEventListener("click", closeCheckout);

  // filters
  $("#filterPills").addEventListener("click", e => {
    const pill = e.target.closest(".pill");
    if (!pill) return;
    currentFilter = pill.dataset.filter;
    $$(".pill").forEach(p => p.classList.toggle("active", p === pill));
    renderShop();
  });

  $("#sortSelect").addEventListener("change", e => {
    currentSort = e.target.value;
    renderShop();
  });

  // add to cart (delegated)
  document.addEventListener("click", e => {
    const btn = e.target.closest(".add-to-cart");
    if (!btn) return;
    const id = parseInt(btn.dataset.id);
    const product = products.find(p => p.id === id);
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      meta: product.category,
      customKey: "std-" + product.id
    });
  });

  // header scroll
  window.addEventListener("scroll", () => {
    $("#header").classList.toggle("scrolled", window.scrollY > 20);
  });
}

/* ========== INIT ========== */
document.addEventListener("DOMContentLoaded", () => {
  renderFeatured();
  renderShop();
  setupCustomizer();
  setupCheckout();
  setupEvents();
  updateCartUI();
  setupReveals();
});
