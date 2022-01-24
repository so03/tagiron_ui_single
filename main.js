fetch('http://localhost:3000/cards')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const cards = document.querySelector('#cards');
        cards.innerHTML = '';
        data.forEach(el => {
            const card = document.createElement('div');
            const card_content = document.createTextNode(el.number);
            card.appendChild(card_content);

            cards.appendChild(card);
        });
    });