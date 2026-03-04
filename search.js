const searchInput = document.getElementById("searchInput");
const gridItems = document.querySelectorAll(".grid-item");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  gridItems.forEach((item) => {
    const h3 = item.querySelector(".grid-item-content h3");
    const text = h3 ? h3.textContent.toLowerCase() : "";

    const matches = !query || text.includes(query);
    item.style.display = matches ? "" : "none";
  });
});
