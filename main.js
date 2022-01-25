fetch("http://localhost:3000/cards")
    .then((res) => res.json())
    .then((data) => {
        const cards = document.querySelector("#cards");
        cards.innerHTML = "";
        data.forEach((el) => {
            cards.appendChild(
                htmlToElement(`
                <div class="p-4 text-${el.color}-400 cursor-pointer">
                    ${el.number}
                </div>
            `)
            );
        });
    });

fetch("http://localhost:3000/questions")
    .then((res) => res.json())
    .then((data) => {
        const questions = document.querySelector("#questions");
        questions.innerHTML = "";
        data.forEach((el) => {
            questions.appendChild(
                htmlToElement(`
                <div class="${el.selected ? "text-blue-400" : "text-black"} cursor-pointer">
                    ${el.text}
                </div>
            `)
            );
        });
    });

Promise.all([
    fetch("http://localhost:3000/players").then((res) => res.json()),
    fetch("http://localhost:3000/current-player").then((res) => res.json()),
]).then(([data1, data2]) => {
    const players = document.querySelector("#players");
    players.innerHTML = "";
    data1.forEach((el) => {
        players.appendChild(
            htmlToElement(`
                <div class="${el.retired && "text-gray-300"} ${el.name === data2.name && "text-blue-400"}">
                    ${el.name}
                </div>
            `)
        );
    });
});

Promise.all([
    fetch("http://localhost:3000/current-player").then((res) => res.json()),
    fetch("http://localhost:3000/me").then((res) => res.json()),
]).then(([data1, data2]) => {
    const currentPlayer = document.querySelector("#current-player");
    if (data1.name == data2.name) {
        currentPlayer.appendChild(
            htmlToElement(`
                <span>Your turn</span>
            `)
        );
    } else {
        currentPlayer.appendChild(
            htmlToElement(`
            <span>Current Player is: ${data1.name}</span>
        `)
        );
    }
});

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
