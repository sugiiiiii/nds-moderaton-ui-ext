function main() {
    const dark_load = document.createElement('style');
    dark_load.innerHTML = ".js-page-wrapper {\n" +
        "    display: block !important;\n" +
        "}\n" +
        "\n" +
        "body.brn-header-subnav-expanded {\n" +
        "    display: \"none\";\n" +
        "}";
    document.head.appendChild(dark_load);
    const dark_css_url = chrome.runtime.getURL("css/dark.css");
    addCss(dark_css_url);
    if (!localStorage.getItem('theme')) {
        console.log("create local storage");
        localStorage.setItem('theme', 'light');
    } else if (localStorage.getItem('theme') === "dark") {
        document.getElementById("darkmode").disabled = false;
    }

    const theme_button = document.createElement("button");
    theme_button.id = "theme-button-panel";
    theme_button.onclick = show_panel;

    const theme_button_text = document.createElement("span");
    theme_button_text.id = "theme-button-span";
    theme_button_text.textContent = "D";
    theme_button_text.onclick = show_panel;
    theme_button.appendChild(theme_button_text);

    const content_div = document.createElement("div");
    content_div.id = "content-div";

    const theme_panel = document.createElement("div");
    theme_panel.id = "theme-panel";
    theme_panel.style.display = "none";

    const theme_button_div = document.createElement("div");
    theme_button_div.id = "theme-button-div";
    theme_button_div.onclick = show_panel;

    const span_button_theme = document.createElement("span");
    span_button_theme.id = "theme-button-span";
    span_button_theme.textContent = "arkmode: ";
    span_button_theme.style.paddingTop = "0.58rem";
    span_button_theme.style.fontSize = ".875rem";
    span_button_theme.style.transition = "200ms";
    span_button_theme.style.display = "inline-flex";
    span_button_theme.style.marginRight = "1em";
    content_div.appendChild(span_button_theme);

    const button_theme = document.createElement("input");
    button_theme.type = "checkbox";
    button_theme.hidden = true;
    button_theme.id = "theme-button";
    button_theme.onclick = change_theme;
    content_div.appendChild(button_theme);

    const label_button_theme = document.createElement("label");
    label_button_theme.className = "switch";
    label_button_theme.htmlFor = "theme-button";
    content_div.appendChild(label_button_theme);

    if (localStorage.getItem('theme') === "dark") {
        button_theme.checked = true;
    }

    theme_panel.appendChild(content_div);

    theme_button_div.appendChild(theme_button);
    theme_button_div.appendChild(theme_panel);
    document.body.appendChild(theme_button_div);
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
        localStorage.setItem("theme", "dark");
    } else if (!document.getElementById("darkmode").disabled) {
        document.getElementById("darkmode").disabled = true;
        localStorage.setItem("theme", "light");
    }

}

function show_panel() {
    const theme_panel = document.getElementById("theme-panel");
    if (theme_panel.style.display === "none") {
        theme_panel.style.display = "block";
    } else {
        theme_panel.style.display = "none";
    }

    $(function(){
        $('#body_holder').hide();
    });
    $(window).load(function() {
        $("#body_holder").show();
    });
}

window.addEventListener('load', main);
