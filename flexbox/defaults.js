/**
 * Flexbox – vaikimisi HTML ja CSS.
 * Muuda siin baaskoodi.
 */
export const defaultHTML = `
<div class="flex-container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
</div>
`;

export const defaultCSS = `.flex-container {
  display: flex;
  gap: 16px;
  padding: 20px;
  min-height: 200px;
  background: #eee;
}

.item {
  padding: 16px 24px;
  background: #4a90d9;
  color: white;
  border-radius: 8px;
}`;
