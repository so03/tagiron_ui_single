fetch('http://localhost:3000/cards')
    .then(res => res.json())
    .then(data => {
        const cards = document.querySelector('#cards');
        cards.innerHTML = '';
        data.forEach(el => {
            const card = document.createElement('div');
            const card_content = document.createTextNode(el.number);
            card.appendChild(card_content);
            card.className = 'cursor-pointer'

            cards.appendChild(card);
        });
    });

fetch('http://localhost:3000/questions')
    .then(res => res.json())
    .then(data => {
        const questions = document.querySelector('#questions');
        questions.innerHTML = '';
        data.forEach(el => {
            const question = document.createElement('div');
            question.innerHTML = ''
            const question_content = document.createTextNode(el.text);
            question.appendChild(question_content);
            question.className = el.selected ? 'text-blue-400' : 'text-black';

            questions.appendChild(htmlToElement(`
                <div class="${el.selected ? 'text-blue-400' : 'text-black'}">
                    ${el.text}
                </div>
            `));
        })
    })

fetch('http://localhost:3000/current-player')
    .then(res => res.json())
    .then(data => {
        const currentPlayer = document.querySelector('#current-player');
        currentPlayer.innerHTML = data.name;
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