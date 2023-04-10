import { useState } from "react";
import { YMaps, Map, Clusterer, Placemark } from "@pbe/react-yandex-maps";
import "./index.scss"

const mapState = { center: [54.2, 48.47], zoom: 9, controls: [] };

const addresses = [
  {
    id: 1,
    data: { content: "Пункт № 1" },
    options: { selectOnClick: false },
    coords: [54.3, 48.67]
  },
  {
    id: 2,
    data: { content: "Пункт № 2" },
    options: { selectOnClick: false },
    coords: [54.0, 48.57]
  },
  {
    id: 3,
    data: { content: "Пункт № 3" },
    options: { selectOnClick: false },
    coords: [54.3, 48.1]
  },
  {
    id: 4,
    data: { content: "Пункт № 4" },
    options: { selectOnClick: false },
    coords: [54.2, 48.67]
  },
  {
    id: 5,
    data: { content: "Пункт № 5" },
    options: { selectOnClick: false },
    coords: [54.13, 48.17]
  },
  {
    id: 6,
    data: { content: "Пункт № 6" },
    options: { selectOnClick: false },
    coords: [54, 48.1]
  }
];

const getPointData = (index) => {
  return {
    balloonContentBody: "placemark <strong>balloon " + index + "</strong>",
    clusterCaption: "placemark <strong>" + index + "</strong>"
  };
};

const getPointOptions = () => {
  return {
    preset: "islands#violetIcon"
  };
};

const App = () => {
  const [state, setState] = useState();

  const onItemClick = (coords) => {
    setState({ center: coords });
  };
  return (
    <YMaps>
      <div className="d-flex">
        <Map width={600} height={400} state={state} defaultState={mapState}>
          <Clusterer
            options={{

            }}
          >
            {addresses.map((items) => (
              <Placemark
                key={items.id}
                geometry={items.coords}
                properties={getPointData(items.id)}
                options={getPointOptions()}
              />
            ))}
          </Clusterer>
        </Map>
        <div >
          <b>Выберите пункт выдачи:</b>
          <ul>
            {addresses.map((address) => (
              <li key={address.id}>
                <button onClick={() => onItemClick(address.coords)}>
                  {address.data.content}
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </YMaps>
  );
};

export default App;

