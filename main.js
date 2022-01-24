fetch('http://localhost:3000/cards')
    .then(res => res.json())
    .then(data => {
        const cards = document.querySelector('#cards');
        cards.innerHTML = '';
        data.forEach(el => {
            const card = document.createElement('div');
            const card_content = document.createTextNode(el.number);
            card.appendChild(card_content);

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
            const question_content = document.createTextNode(el.text);
            question.appendChild(question_content);
            question.className = el.selected ? 'text-blue-500' : 'text-black';

            questions.appendChild(question);
        })
    })