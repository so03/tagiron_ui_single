fetch("http://localhost:3000/rooms/1/members")
    .then((res) => res.json())
    .then((data) => {
        const cards = document.querySelector("#members");
        cards.innerHTML = "";
        data.forEach((el) => {
            cards.appendChild(
                htmlToElement(`
                <div>
                    ${el.name}
                </div>
            `)
            );
        });
    });

fetch("http://localhost:3000/is-valid-token")
    .then((res) => res.json())
    .then((data) => {
        if (data.value === true) {
            const joinDiv = document.querySelector("#join-div");
            joinDiv.innerHTML = "";
            joinDiv.appendChild(
                htmlToElement(`
                    <div id="waiting-info">Waiting for other members...</div>
                `)
            )
        }
    })

// TODO: form submit
document.addEventListener()

/**
 * reference: https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    var template = document.createElement("template");
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
