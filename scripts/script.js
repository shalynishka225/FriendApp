let url = 'https://randomuser.me/api/?results=36';

function createUser(element) {
    return document.createElement(element);
}

function append(parent, element) {
    return parent.appendChild(element);
}

function createCard(data) {
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
            card.classList.toggle('text-white');
            card.classList.toggle('bg-secondary');
            cardBody.classList.toggle('card-body');
            img.src = user.picture.large;
            p.innerHTML = `${user.name.first} ${user.name.last}`;

            append(col, card);
            append(card, cardBody);
            append(cardBody, img);
            append(cardBody, p);
            append(document.getElementById('users'), col);
        });
}

fetch(url)
    .then((res) => res.json())
    .then(function(data) {
        createCard(data);
        console.log(data);
    })

    .catch(function (error) {
        console.log(error)
    });

    let a = new Promise((resolve, reject) => {
        fetch(url)
        .then(data => {
            resolve(data.json())
        })
    })

    let b = new Promise((resolve, reject) => {
        fetch(url)
        .then(data => {
            resolve(data.json())
        })
    })

    function sortUp () {
        a.then(data => {
            data.results.sort((a,b) => {
                debugger;
                return a.dob.age - b.dob.age
            });
            console.log(data.results);
        })
    }

    function sortDown () {
        b.then(data => {
            let age = [];
            data.results.map((user) => {
                age.push(user.dob.age);
            });
            console.log(age.sort().reverse());
        });
    }
    
