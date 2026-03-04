# Live Editor – ühine komponent

See kaust sisaldab ühiseid `editor.js` ja `editor.css` faile, mida saab kasutada mitmes alamlehel.

## Uue alamlehe lisamine

1. Loo uus kaust (nt `mingi-teema/`)
2. Lisa `index.html` – kopeeri `grid/index.html` või `flexbox/index.html` sisu
3. Lisa `defaults.js` – ekspordi `defaultHTML` ja `defaultCSS`
4. Muuda viiteid vastavalt sügavusele: kui oled `grid/` tasemel, kasuta `../editor/`; kui oled `grid/alam/` tasemel, kasuta `../../editor/`

## Nõuded

- `defaults.js` peab olema **samas kaustas** kui `index.html`
- `defaults.js` peab eksportima: `export const defaultHTML = \`...\`;` ja `export const defaultCSS = \`...\`;`
