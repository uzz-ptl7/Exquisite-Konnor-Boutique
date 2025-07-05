let currentProductName = "",
  currentProductImage = "";

const contact = {
  whatsapp: "250738019704",
  email: "your@email.com",
};

function openModal(name, image) {
  currentProductName = name;
  currentProductImage = image;
  document.getElementById("modalProductName").innerText = name;
  document.getElementById("modalProductImage").src = image;
  document.getElementById("modalMessage").value = "";
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

function sendViaWhatsApp() {
  const message = document.getElementById("modalMessage").value;
  const url = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    "I'm interested in: " + currentProductName + "\n\n" + message
  )}`;
  window.open(url, "_blank");
}

function sendViaEmail() {
  const message = document.getElementById("modalMessage").value;
  const subject = encodeURIComponent("Product Inquiry: " + currentProductName);
  const body = encodeURIComponent(message);
  window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
}

function scrollToSection(id) {
  if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
  else document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("hidden");

  // Update aria-expanded attribute
  const navToggle = document.getElementById("navToggle");
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", !expanded);
}

document.getElementById("navToggle").addEventListener("click", toggleMenu);

// Lazy load the map iframe for browsers that do not support 'loading' attribute
document.addEventListener("DOMContentLoaded", function () {
  var iframe = document.querySelector(".map-iframe");
  if (iframe) {
    if ("loading" in HTMLIFrameElement.prototype) {
      // Browser supports lazy loading
      iframe.setAttribute("loading", "lazy");
      iframe.src = iframe.getAttribute("data-src");
    } else {
      // Fallback lazy load using scroll event
      function loadMap() {
        if (iframe.getAttribute("src")) return;
        iframe.src = iframe.getAttribute("data-src");
        window.removeEventListener("scroll", onScroll);
      }
      function onScroll() {
        var rect = iframe.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          loadMap();
        }
      }
      window.addEventListener("scroll", onScroll);
      onScroll();
    }
  }
});

// Outfit Recommender
const button = document.getElementById("get-recommendation");
const skeleton = document.getElementById("skeleton");
const outfit = document.getElementById("outfit");

button.addEventListener("click", () => {
  const weather = document.getElementById("weather").value;
  const eventType = document.getElementById("event-type").value;
  const style = document.getElementById("style").value;
  const timeOfDay = document.getElementById("time-of-day").value;

  if (!weather || !eventType || !style || !timeOfDay) {
    alert("Please answer all the questions.");
    return;
  }

  outfit.classList.add("hidden");
  skeleton.classList.remove("hidden");

  setTimeout(() => {
    skeleton.classList.add("hidden");
    outfit.classList.remove("hidden");

    // Simple outfit logic example:
    let recommendation = "We recommend a ";

    if (eventType === "formal") {
      recommendation += "sharp suit with a tie";
    } else if (eventType === "casual") {
      recommendation += "comfortable jeans and a stylish shirt";
    } else {
      recommendation += "trendy party wear with bold accessories";
    }

    if (weather === "hot") {
      recommendation += ", suitable for warm weather.";
    } else if (weather === "cold") {
      recommendation += " with a cozy jacket to keep warm.";
    } else {
      recommendation += " and a waterproof coat.";
    }

    if (style === "sporty") {
      recommendation += " Pair it with sneakers for a sporty vibe.";
    } else if (style === "classic") {
      recommendation += " Classic leather shoes will complete the look.";
    }

    if (timeOfDay === "night") {
      recommendation += " Perfect for evening occasions.";
    }

    outfit.textContent = recommendation;
  }, 2000);
});
