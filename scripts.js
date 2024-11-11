// Initialize CodeMirror editors for HTML, CSS, and JS
const htmlEditor = CodeMirror.fromTextArea(document.getElementById("htmlEditor"), {
  mode: "xml",
  lineNumbers: true,
  tabSize: 2,
  indentWithTabs: true
});

const cssEditor = CodeMirror.fromTextArea(document.getElementById("cssEditor"), {
  mode: "css",
  lineNumbers: true,
  tabSize: 2,
  indentWithTabs: true
});

const jsEditor = CodeMirror.fromTextArea(document.getElementById("jsEditor"), {
  mode: "javascript",
  lineNumbers: true,
  tabSize: 2,
  indentWithTabs: true
});

// Preview function to update the iframe content
function updatePreview() {
  const html = htmlEditor.getValue();
  const css = `<style>${cssEditor.getValue()}</style>`;
  const js = `<script>${jsEditor.getValue()}<\/script>`;
  const previewFrame = document.getElementById("preview").contentDocument || document.getElementById("preview").contentWindow.document;
  previewFrame.open();
  previewFrame.write(html + css + js);
  previewFrame.close();
}

// Event listeners for CodeMirror editors to update preview on change
htmlEditor.on("change", updatePreview);
cssEditor.on("change", updatePreview);
jsEditor.on("change", updatePreview);

// Sidebar buttons to toggle between editors
document.getElementById("htmlBtn").addEventListener("click", () => toggleEditor("html"));
document.getElementById("cssBtn").addEventListener("click", () => toggleEditor("css"));
document.getElementById("jsBtn").addEventListener("click", () => toggleEditor("js"));

function toggleEditor(type) {
  document.querySelectorAll(".editor").forEach(editor => editor.classList.remove("visible"));
  document.getElementById(type + "Editor").parentElement.style.display = "block";
  document.getElementById(type + "Editor").classList.add("visible");
  document.querySelectorAll(".sidebar button").forEach(btn => btn.classList.remove("active"));
  document.getElementById(type + "Btn").classList.add("active");
}

// Open preview in a new window
document.getElementById("newWindowBtn").addEventListener("click", () => {
  const newWindow = window.open();
  newWindow.document.write(htmlEditor.getValue() + `<style>${cssEditor.getValue()}</style>` + `<script>${jsEditor.getValue()}<\/script>`);
});

// Adjust font size for CodeMirror editors
document.getElementById("font-size").addEventListener("input", (e) => {
  const fontSize = e.target.value + "px";
  document.querySelectorAll(".CodeMirror").forEach(editor => {
    editor.style.fontSize = fontSize;
    editor.CodeMirror.refresh();
  });
});

// Initial preview load
updatePreview();
