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