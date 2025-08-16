
    const flashcards = [
      { word: "será", meaning: "〜だろう (ラテン語 esse)" },
      { word: "encontrar", meaning: "見つける (ラテン語 incontrare)" },
      { word: "ir", meaning: "行く (ラテン語 ire)" },
      { word: "amar", meaning: "愛する (ラテン語 amare)" }
    ];

    const flashcardList = document.getElementById("flashcards-list");
    const modal = document.getElementById("word-modal");
    const wordForm = document.getElementById("word-form");

    function renderCards() {
      flashcardList.innerHTML = "";
      flashcards.forEach((card, index) => {
        const div = document.createElement("div");
        div.className = "flashcard";
        div.innerHTML = `
          <p class="flashcard-title">${card.word}</p>
          <div class="flashcard-icons">
            <button onclick="toggleMeaning(${index})">👁 意味</button>
          </div>
          <div class="flashcard-toggle" id="meaning-${index}">
            <p>${card.meaning}</p>
          </div>
        `;
        flashcardList.appendChild(div);
      });
    }

    function toggleMeaning(index) {
      const el = document.getElementById(`meaning-${index}`);
      el.style.display = el.style.display === "block" ? "none" : "block";
    }

    function openModal() {
      modal.classList.remove("hidden");
    }

    function closeModal() {
      modal.classList.add("hidden");
      wordForm.reset();
    }

    wordForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const word = document.getElementById("word-input").value.trim();
      const meaning = document.getElementById("meaning-input").value.trim();
      if (word && meaning) {
        flashcards.push({ word, meaning });
        renderCards();
        closeModal();
      }
    });

    window.addEventListener("DOMContentLoaded", renderCards);