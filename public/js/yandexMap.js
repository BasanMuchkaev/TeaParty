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

  // createPlacemark(61.79, 34.36, 'франнцузский улун', 'москва');

  myMap.geoObjects.events.add('click', async (e) => {
    const target = e.get('target');
    if (target) {
      const coordinates = target.geometry._coordinates;
      console.log(target.geometry._coordinates);

      window.location.replace(`http://localhost:3000/teapitie/${coordinates[0]}/${coordinates[1]}`);
    }
  });
}

ymaps.ready(init);

module.exports = { getCoordinates, init };
