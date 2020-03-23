function createUser(element) {
    return document.createElement(element);
}

function append(parent, element) {
    return parent.appendChild(element);
}

fetch('https://randomuser.me/api/?results=36')
    .then((res) => res.json())
    .then(function(data) {
        let users = data.results;
        return users.map((user) => {
            let col = createUser('div');
            let card = createUser('div');
            let cardBody = createUser('div');
            let img = createUser('img');
            let p = createUser('p');

            col.classList.toggle('col-sm-4');
            p.classList.toggle('card-text');
            img.classList.toggle('card-img-top');
            card.classList.toggle('card');
            card.classList.toggle('mb-3');
            card.classList.toggle('w-50');
            card.classList.toggle('text-white');
            card.classList.toggle('bg-secondary');
            img.src = user.picture.large;
            p.innerHTML = `${user.name.first} ${user.name.last}`;

            append(col, card);
            append(card, cardBody);
            append(cardBody, img);
            append(cardBody, p);
            append(document.getElementById('users'), col);
        });
    })

    .catch(function (error) {
        console.log(error)
    });
