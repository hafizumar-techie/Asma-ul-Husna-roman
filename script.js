document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("names-grid");
  let currentOpenCard = null;

  // Fetch names data from names.json
  fetch("names.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load names.json");
      }
      return response.json();
    })
    .then((data) => {
      renderCards(data);
    })
    .catch((error) => {
      console.error("Error loading names:", error);
      gridContainer.innerHTML = `<p style="color: #ffc107; text-align: center;">Unable to load names. Please view using Live Server.</p>`;
    });

  // Render cards inside grid
  function renderCards(names) {
    gridContainer.innerHTML = "";

    names.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front">
            <span class="number-badge">${item.id}</span>
            <h3 class="arabic-text">${item.arabic}</h3>
          </div>
          <div class="card-back">
            <h4 class="transliteration">${item.transliteration}</h4>
            <p class="meaning">${item.translation}</p>
          </div>
        </div>
      `;

      // Flip card on click
      card.addEventListener("click", () => {
        if (currentOpenCard && currentOpenCard !== card) {
          currentOpenCard.classList.remove("flipped");
        }

        card.classList.toggle("flipped");
        currentOpenCard = card.classList.contains("flipped") ? card : null;
      });

      gridContainer.appendChild(card);
    });
  }
});