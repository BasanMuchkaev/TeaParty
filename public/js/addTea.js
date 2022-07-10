const formTea = document.forms.addTea;

// Форма добавление чая на карту

async function getCoordinates(locationName) {
  try {
    const location = await ymaps.geocode(locationName);
    return location.geoObjects.get(0).geometry.getCoordinates();
  } catch (error) {
    return null;
  }
}

async function init() {
  const myMap = new ymaps.Map('map', {
    center: [55.753215, 37.622504],
    zoom: 4,
  });

  async function createPlacemark(latitude, longitude, teaName, locationName) {
    if (latitude === null) {
      const coordinates = await getCoordinates(locationName);
      if (coordinates) {
        const placemark = new ymaps.Placemark([coordinates[0], coordinates[1]], {
          iconContent: `${teaName}`,
          hintContent: `${locationName}`,
          draggable: true,
        }, {
          preset: 'islands#oliveStretchyIcon',
        });
        myMap.geoObjects.add(placemark);
      }
    } else {
      const placemark = new ymaps.Placemark([latitude, longitude], {
        iconContent: `${teaName}`,
        hintContent: `${locationName}`,
        draggable: true,
      }, {
        preset: 'islands#oliveStretchyIcon',
      });
      myMap.geoObjects.add(placemark);
    }
  }

  const res = await fetch('/teapitie');
  if (res.ok) {
    const allTeas = await res.json();

    allTeas.forEach((el) => {
      createPlacemark(el.latitude, el.longitude, el.title, el.location);
    });
  }

  myMap.geoObjects.events.add('click', async (e) => {
    const target = e.get('target');
    if (target) {
      const coordinates = target.geometry._coordinates;
      console.log(target.geometry._coordinates);

      window.location.replace(`http://localhost:3000/teapitie/${coordinates[0]}/${coordinates[1]}`);
    }
  });
}

// Cоздание html карточки нового чая для добавления чая в базу
function createPartHTML(titleTea, descTea, imgTea) {
  return `<li data-teaId="" class="card">
      <h2 class="card-title">${titleTea}</h2>
      <img src="${imgTea}" alt="${titleTea}">
      <div class="card-desc">
        <div class="card-icon">
          <img id="btnSettingTea" src="/img/settings_3_line.svg" alt="edit tea">
          <img id="btnDeleteTea" src="/img/delete_2_line.svg" alt="delete tea">
      </div>
        <p class="p-card">${descTea}</p>
      </div>
    </li>`;
}

formTea?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const allform = Object.fromEntries(new FormData(formTea));
  const inputs = Object.values(allform);
  const coords = await getCoordinates(allform.location);

  if (!inputs.includes('')) {
    if (coords === null) {
      alert('локация не найдена');
    } else {
      const response = await fetch('http://localhost:3000/lk', {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ allform, coords }),
      });
      if (response.ok) {
        // const titleTea = document.querySelector('#sortoftea');
        // const descTea = document.querySelector('#describe');
        // // const locationTea = document.querySelector('#locationTea');
        // const imgTea = document.querySelector('#img');
        // const container = document.querySelector('[data-container]');
        // container.insertAdjacentHTML('afterbegin', createPartHTML(titleTea, descTea, imgTea));
        window.location.reload();
      } else {
        console.log('ERROR');
      }
    }
  } else {
    alert('пустой ввод');
  }
});

const teaList = document.querySelector('.tea-list');
teaList.addEventListener('click', async (e) => {
  if (e.target.id === 'btnDeleteTea') {
    const closestLi = e.target.closest('li');
    const id = closestLi.dataset.teaid;
    const response = await fetch(`/lk/tea/${id}`, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (response.ok) {
      window.location.replace('/lk');
    } else {
      alert('что-то пошло не так');
    }
  }
});
// Удаление комментариев

const comentList = document.querySelector('.lk-commentList');

comentList.addEventListener('click', async (e) => {
  if (e.target.id === 'btnDeleteComment') {
    const closestLi = e.target.closest('li');
    const commentId = closestLi.dataset.commentid;

    const response = await fetch(`/lk/comment/${commentId}`, {
      method: 'delete',
      headers: { 'Content-type': 'application/json' },
    });

    if (response.ok) {
      closestLi.remove();
    } else {
      console.log('Response delete error');
    }
  }
});
