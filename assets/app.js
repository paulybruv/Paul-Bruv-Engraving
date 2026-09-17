document.addEventListener("DOMContentLoaded", () => {
  // 1. Street Sign Live Customizer
  const textInput = document.getElementById("custom-text-input");
  const textDisplay = document.getElementById("preview-text-display");
  const charCount = document.getElementById("char-count");
  const finishInput = document.getElementById("selected-finish");

  if (textInput && textDisplay && charCount) {
    const updatePreviewText = (text) => {
      const uppercaseText = text.toUpperCase();
      textDisplay.textContent = uppercaseText.trim() === "" ? "YOUR TEXT HERE" : uppercaseText;

      if (uppercaseText.length > 18) {
        textDisplay.style.fontSize = "1.05rem";
      } else if (uppercaseText.length > 12) {
        textDisplay.style.fontSize = "1.25rem";
      } else {
        textDisplay.style.fontSize = "1.45rem";
      }

      charCount.textContent = `${text.length} / 24 characters`;
      charCount.style.color = text.length >= 24 ? "#e11d48" : "#475569";
    };

    textInput.addEventListener("input", (e) => updatePreviewText(e.target.value));

    // Finish selector buttons
    const finishBtns = document.querySelectorAll(".finish-btn");
    const mockup = document.getElementById("mdf-sign-mockup");

    finishBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const finish = btn.getAttribute("data-finish");
        if (mockup) {
          mockup.className = "mdf-mockup " + finish;
        }
        if (finishInput) {
          finishInput.value = finish;
        }
        finishBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  }

  // 2. Query Parameter Pre-filling on contact.html
  const messageBox = document.getElementById("message");
  if (messageBox) {
    const params = new URLSearchParams(window.location.search);
    const product = params.get("product");
    const type = params.get("type");
    const signText = params.get("street_sign_text");
    const finish = params.get("finish");
    const bizName = params.get("business_name");
    const productType = params.get("product_type");
    const orderDetails = params.get("order_details");

    let prefillText = "";

    if (product) {
      prefillText += `Hello! I would like to order the ${product.replace(/-/g, " ")}.\n`;
    }
    if (type === "custom-street-sign") {
      prefillText += `Street Sign Order:\n- Sign Text: "${signText || "None specified"}"\n- Color Option: ${finish || "Black Sign / White Text"}\n`;
    }
    if (type === "business-quote") {
      prefillText += `Commercial Quote Request:\n- Business: ${bizName || "N/A"}\n- Service: ${productType || "N/A"}\n- Details: ${orderDetails || "N/A"}\n`;
    }
    if (type === "custom-goal-coaster") {
      const setSize = params.get("set_size") || "4";
      prefillText += `Custom Goal Coaster Order (Set of ${setSize}):\n`;
      for (let i = 1; i <= 6; i++) {
        const coaster = params.get(`coaster_${i}`);
        if (coaster) prefillText += `- Coaster ${i}: ${coaster}\n`;
      }
      const notes = params.get("notes");
      if (notes) prefillText += `- Notes: ${notes}\n`;
    }

    if (prefillText) {
      messageBox.value = prefillText.trim();
    }
  }
});