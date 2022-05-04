function main() {

    const nav = document.querySelector("body > div.js-page-wrapper > div > nav > div.brn-moderation-panel__content.sg-box.sg-box--padding-m.sg-box--shadow.js-moderation-panel-content > div > div.sg-content-box__content > div")

    const span_button_theme = document.createElement("span");
    span_button_theme.innerText = "Thème sombre:  "
    span_button_theme.style.color = "#000000"
    span_button_theme.style.fontSize = ".875rem"
    nav.appendChild(span_button_theme)

    const button_theme = document.createElement("input");
    button_theme.type = "checkbox";
    button_theme.hidden = true;
    button_theme.id = "theme-button";
    button_theme.onclick = change_theme
    span_button_theme.appendChild(button_theme);

    const label_button_theme = document.createElement("label");
    label_button_theme.className = "switch";
    label_button_theme.htmlFor = "theme-button";
    span_button_theme.appendChild(label_button_theme);
    const dark_css_url = chrome.runtime.getURL("css/dark.css");
    addCss(dark_css_url);

}

function addCss(fileName) {
    var head = document.head;
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName;
    link.id = "darkmode";
    link.disabled = true;
    head.appendChild(link);
}


function change_theme() {
    if (document.getElementById("darkmode").disabled) {
        document.getElementById("darkmode").disabled = false;
    } else if (!document.getElementById("darkmode").disabled) {
        document.getElementById("darkmode").disabled = true;
    }

}

main();
