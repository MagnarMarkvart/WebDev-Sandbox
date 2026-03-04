/**
 * Live Editor – ühine loogika kõigile alamlehtedele.
 * Laeb defaults.js lehe kaustast (nt grid/defaults.js).
 *
 * Kasuta: <script type="module" src="../editor/editor.js"></script>
 * Nõuab: samas kaustas defaults.js, mis eksportib defaultHTML ja defaultCSS.
 */
const { defaultHTML, defaultCSS } = await import(
  new URL('./defaults.js', document.baseURI).href
);

const htmlEditor = CodeMirror.fromTextArea(
  document.getElementById('html-editor'),
  { mode: 'text/html', lineNumbers: true },
);
htmlEditor.setValue(defaultHTML);

const cssEditor = CodeMirror.fromTextArea(
  document.getElementById('css-editor'),
  { mode: 'css', lineNumbers: true },
);
cssEditor.setValue(defaultCSS);

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(tab.dataset.tab + '-panel');
    panel.classList.add('active');
    requestAnimationFrame(() => {
      (tab.dataset.tab === 'html' ? htmlEditor : cssEditor).refresh();
    });
  });
});

const editorPanel = document.getElementById('editor-panel');
const resizer = document.getElementById('resizer');

resizer.addEventListener('pointerdown', (e) => {
  if (e.button !== 0) return;
  e.preventDefault();
  resizer.setPointerCapture(e.pointerId);
  const startX = e.clientX;
  const startWidth = editorPanel.offsetWidth;

  function onMove(e) {
    const dx = e.clientX - startX;
    const newWidth = Math.max(
      200,
      Math.min(window.innerWidth - 220, startWidth + dx),
    );
    editorPanel.style.flex = `0 0 ${newWidth}px`;
  }

  function onUp() {
    resizer.removeEventListener('pointermove', onMove);
    resizer.removeEventListener('pointerup', onUp);
    resizer.removeEventListener('pointercancel', onUp);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }

  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';
  resizer.addEventListener('pointermove', onMove);
  resizer.addEventListener('pointerup', onUp);
  resizer.addEventListener('pointercancel', onUp);
});

editorPanel.style.flex = '0 0 50%';

const iframe = document.getElementById('preview');
const doc = iframe.contentDocument || iframe.contentWindow.document;

function updatePreview() {
  doc.open();
  doc.write(
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><style>' +
      cssEditor.getValue() +
      '</style></head><body style="margin:0;padding:20px;background:#f0f0f0">' +
      htmlEditor.getValue() +
      '</body></html>',
  );
  doc.close();
}

htmlEditor.on('change', updatePreview);
cssEditor.on('change', updatePreview);

iframe.onload = updatePreview;
updatePreview();

setTimeout(() => htmlEditor.refresh(), 50);
window.addEventListener('resize', () => {
  htmlEditor.refresh();
  cssEditor.refresh();
});
