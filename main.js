fetch('http://localhost:3000/cards')
    .then(res => res.json())
    .then(data => {
        const cards = document.querySelector('#cards');
        cards.innerHTML = '';
        data.forEach(el => {
            cards.appendChild(htmlToElement(`
                <div class="p-4 text-${el.color}-400 cursor-pointer">
                    ${el.number}
                </div>
            `));
        });
    });

fetch('http://localhost:3000/questions')
    .then(res => res.json())
    .then(data => {
        const questions = document.querySelector('#questions');
        questions.innerHTML = '';
        data.forEach(el => {
            questions.appendChild(htmlToElement(`
                <div class="${el.selected ? 'text-blue-400' : 'text-black'} cursor-pointer">
                    ${el.text}
                </div>
            `));
        })
    })

fetch('http://localhost:3000/players')
    .then(res => res.json())
    .then(data => {
        const players = document.querySelector('#players');
        players.innerHTML = '';
        data.forEach(el => {
            players.appendChild(htmlToElement(`
                <div class="${el.retired ? 'text-gray-300' : 'text-black'}">
                    ${el.name}
                </div>
            `))
        })
    })

fetch('http://localhost:3000/current-player')
    .then(res => res.json())
    .then(data => {
        const currentPlayer = document.querySelector('#current-player');
        currentPlayer.appendChild(htmlToElement(`
            <span>Current Player is: ${data.name}</span>
        `));
    })

/**
 * reference: https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}