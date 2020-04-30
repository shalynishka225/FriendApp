import './styles/style.css';

async function fetchAsyncData() {
  try {
    const url = "https://randomuser.me/api/?results=36";
    const response = await fetch(url);
    const data = await response.json();
    let startData = data.results.slice();
    //console.log(startData);

    Element.prototype.remove = function () {
      this.parentElement.removeChild(this);
    };
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
      for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
          this[i].parentElement.removeChild(this[i]);
        }
      }
    };

    function createUser(element) {
      return document.createElement(element);
    }

    function append(parent, element) {
      return parent.appendChild(element);
    }

    function createCard(data) {
      return data.forEach((el) => {
        const col = createUser("div");
        const card = createUser("div");
        const cardBody = createUser("div");
        const img = createUser("img");
        const name = createUser("p");
        const age = createUser("p");
        const gender = createUser("p");
        const email = createUser("p");

        col.classList.toggle("col");
        col.id = "item";
        name.classList.toggle("card-text");
        img.classList.toggle("card-img-top");
        card.classList.toggle("card");
        card.classList.toggle("mb-3");
        card.classList.toggle("text-white");
        card.classList.toggle("bg-secondary");
        cardBody.classList.toggle("card-body");
        img.src = el.picture.large;
        name.innerHTML = `${el.name.first} ${el.name.last}`;
        age.innerHTML = `Age: ${el.dob.age}`;
        gender.innerHTML = `Gender: ${el.gender}`;
        email.innerHTML = `Email: ${el.email}`;

        append(col, card);
        append(card, cardBody);
        append(cardBody, img);
        append(cardBody, name);
        append(cardBody, age);
        append(cardBody, gender);
        //append(cardBody, email);
        append(document.getElementById("users"), col);
      });
    }

    function sortUpAge(data) {
      deleteCard();
      const sorted = [...data];
      sorted.sort((a, b) => a.dob.age - b.dob.age);
      createCard(sorted);
    }

    function sortDownAge(data) {
      deleteCard();
      const sorted = data;
      sorted.sort((a, b) => a.dob.age - b.dob.age).reverse();
      createCard(sorted);
    }

    function sortUpName(data) {
      deleteCard();
      const sorted = data;
      sorted.sort((a, b) => {
        const nameA = a.name.first.toLowerCase(),
          nameB = b.name.first.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      createCard(sorted);
    }

    function sortDownName(data) {
      deleteCard();
      const sorted = data;
      sorted.sort((a, b) => {
        const nameA = a.name.first.toLowerCase(),
          nameB = b.name.first.toLowerCase();
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      });
      createCard(sorted);
    }

    function filterName(val, data) {
      deleteCard();
      let result = [];
      // const sorted = data.slice();
      data.forEach((element) => {
        if (element.name.first.indexOf(val) != -1) result.push(element);
      });
      createCard(result);
    }

    function filterAge(val, data) {
      deleteCard();
      let result = [];
      //const sorted = data.slice();
      data.forEach((element) => {
        if (element.dob.age == val) result.push(element);
      });
      createCard(result);
    }

    function deleteCard() {
      const elem = document.querySelectorAll("#item");
      elem.remove();
    }

    createCard(startData);

    document.getElementById("resetBtn").addEventListener("click", () => {
      deleteCard();
      startData = data.results;
      createCard(startData);
    });

    document.getElementById("ageFilter").addEventListener("input", (e) => {
      filterAge(e.target.value, startData);
    });

    document.getElementById("nameFilter").addEventListener("input", (e) => {
      filterName(e.target.value, startData);
    });

    document.getElementById("sortUpAge").addEventListener("click", () => {
      sortUpAge(startData);
    });

    document.getElementById("sortDownAge").addEventListener("click", () => {
      sortDownAge(startData);
    });

    document.getElementById("sortUpName").addEventListener("click", () => {
      sortUpName(startData);
    });

    document.getElementById("sortDownName").addEventListener("click", () => {
      sortDownName(startData);
    });
  } catch (e) {
    console.error(e);
  }
}

fetchAsyncData();
