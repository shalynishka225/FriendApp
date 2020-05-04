import './styles/style.css';
import './img/icon.svg';


async function fetchAsyncData() {
  try {
    const url = "https://randomuser.me/api/?results=48";
    const response = await fetch(url);
    const data = await response.json();
    let startData = data.results.slice();
    let isMan;

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

    function createCard(data) {
      return data.forEach((el) => {
        const container = document.getElementById('users');
        const col = document.createElement('div');
        const card = document.createElement('div');
        const cardBody = document.createElement('div');
        const img = document.createElement('img');
        const name = document.createElement('p');
        const age = document.createElement('p');
        //const gender = document.createElement('p');

        col.classList.toggle("col");
        col.id = "item";
        name.classList.toggle("text");
        img.classList.toggle("card-img-top");
        card.classList.toggle("card");
        card.classList.toggle("card-prop");
        //card.classList.toggle("m-2");

        card.classList.toggle("text-white");
        card.classList.toggle("bg-secondary");
        //card.classList.toggle("neon");
        cardBody.classList.toggle("card-main");
        img.src = el.picture.large;
        name.innerHTML = `${el.name.first} </br> ${el.name.last}`;
        age.innerHTML = `Age: ${el.dob.age}`;
        //gender.innerHTML = `Gender: ${el.gender}`;

        col.appendChild(card);
        card.appendChild(cardBody);
        cardBody.appendChild(img);
        cardBody.appendChild(name);
        cardBody.appendChild(age);
        //cardBody.appendChild(gender);
        container.appendChild(col);
      });
    }

    function sortUpAge(val) {
     
      deleteCard();
      let sorted = [...startData];
      sorted = sorted.filter(item => item.name.first.indexOf(val) != -1);
      if(isMan) {
        sorted = sorted.filter(item => item.gender == 'male');
      }
      else {
        sorted = sorted.filter(item => item.gender == 'female');
      }
      sorted.sort((a, b) => a.dob.age - b.dob.age);
      createCard(sorted);
      
    }

    function sortDownAge(val) {
      deleteCard();
      let sorted = [...startData];
      sorted = sorted.filter(item => item.name.first.indexOf(val) != -1);
      if(isMan) {
        sorted = sorted.filter(item => item.gender == 'male');
      }
      else {
        sorted = sorted.filter(item => item.gender == 'female');
      }
      sorted.sort((a, b) => b.dob.age - a.dob.age);
      createCard(sorted);
    }

    function sortUpName(val) {
      deleteCard();
      let sorted = [...startData];
      sorted = sorted.filter(item => item.name.first.indexOf(val) != -1);
      if(isMan) {
        sorted = sorted.filter(item => item.gender == 'male');
      }
      else {
        sorted = sorted.filter(item => item.gender == 'female');
      }
      sorted.sort((a, b) => {
        const nameA = a.name.first.toLowerCase(),
          nameB = b.name.first.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      createCard(sorted);
    }

    function sortDownName(val) {
      deleteCard();
      let sorted = [...startData];
      sorted = sorted.filter(item => item.name.first.indexOf(val) != -1);
      if(isMan) {
        sorted = sorted.filter(item => item.gender == 'male');
      }
      else {
        sorted = sorted.filter(item => item.gender == 'female');
      }
      sorted.sort((a, b) => {
        const nameA = a.name.first.toLowerCase(),
          nameB = b.name.first.toLowerCase();
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      });
      createCard(sorted);
    }

    function filterName(val) {
      deleteCard();
      let sorted = [...startData];
      sorted = sorted.filter(item => item.name.first.indexOf(val) != -1);
      createCard(sorted);
    }

    function deleteCard() {
      const elem = document.querySelectorAll("#item");
      elem.remove();
    }

    function resetButton() {
      deleteCard();
      startData = data.results;
      document.getElementById('nameFilter').value = '';
      createCard(startData);
    }

    function sortUpGender(val) {
      deleteCard();
      let sorted = [...startData];
      sorted = sorted.filter(item => item.name.first.indexOf(val) != -1);
      sorted = sorted.filter(item => item.gender == 'male');
      createCard(sorted);
      isMan = true;
    }

    function sortDownGender(val) {
      deleteCard();
      let sorted = [...startData];
      sorted = sorted.filter(item => item.name.first.indexOf(val) != -1);
      sorted = sorted.filter(item => item.gender == 'female');
      createCard(sorted);
      isMan = false;
    }

    createCard(startData);

    document.addEventListener('click', (e) => {
      let value = document.getElementById('nameFilter').value;

      switch(e.target.id) {
        case 'sortUpAge':
          sortUpAge(value);
        break;

        case 'sortDownAge':
          sortDownAge(value);
        break;

        case 'sortDownName':
          sortDownName(value);
        break;

        case 'sortUpName':
          sortUpName(value);
        break;

        case 'resetBtn': 
          resetButton();
        break;

        case 'nameFilter':
          document.getElementById('nameFilter').oninput = (e) => {
            filterName(e.target.value);
          }
        break;

        case 'sortUpGender':
          sortUpGender(value);
        break;

        case 'sortDownGender':
          sortDownGender(value);
        break;
      }
    })

  } catch (e) {
    console.error(e);
  }
}

fetchAsyncData();