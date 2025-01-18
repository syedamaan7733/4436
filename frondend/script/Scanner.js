document.addEventListener("DOMContentLoaded", () => {
  const codeInput = document.getElementById("code-input");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const toast = document.getElementById("toast");

  // Code input formatting and validation
  codeInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
    if (e.target.value.length === 4) {
      showToast("Connecting with participant...");
    }
  });

  // Mock search functionality
  const mockParticipants = [
    { name: "Alice Chen", interests: "AI, Machine Learning" },
    { name: "Bob Smith", interests: "Blockchain, Web3" },
    { name: "Carol Davis", interests: "UX Design, Product Management" },
  ];

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    if (query.length < 2) {
      searchResults.classList.add("hidden");
      return;
    }

    const filtered = mockParticipants.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.interests.toLowerCase().includes(query)
    );

    searchResults.innerHTML = filtered
      .map(
        (p) => `
                    <div class="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0">
                        <div class="font-medium text-gray-800">${p.name}</div>
                        <div class="text-sm text-gray-600">${p.interests}</div>
                    </div>
                `
      )
      .join("");

    searchResults.classList.remove("hidden");
  });

  // Hide search results when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchResults.contains(e.target) && e.target !== searchInput) {
      searchResults.classList.add("hidden");
    }
  });

  // Toast message function
  function showToast(message) {
    toast.textContent = message;
    toast.classList.remove("hidden");
    toast.classList.add("animate-bounce");

    setTimeout(() => {
      toast.classList.remove("animate-bounce");
      toast.classList.add("hidden");
    }, 3000);
  }

  // QR Code button handler
  document.getElementById("qr-button").addEventListener("click", () => {
    showToast("QR Scanner activated! (Mock functionality)");
  });
});
