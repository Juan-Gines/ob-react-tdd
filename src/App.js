import { useState } from 'react';
import './App.css';

import {FaPlay} from 'react-icons/fa';
function App() {
	const [busqueda, setBusqueda] = useState('');
	const [listado, setListado] = useState([]);
  const [radio, setRadio] = useState(null);
	const hazBusqueda = () => {
		const url = `http://de1.api.radio-browser.info/json/stations/byname/${busqueda}`;
		fetch(url)
			.then((r) => r.json())
			.then((data) => setListado(data))
			.catch((e) => console.log(e));
	};

	const playRadio = (emisora) => {
    if(radio!==null) radio.pause();    
		setRadio(new Audio(emisora.url));
		radio.play();
	};
	return (
		<div className='App'>
			<h1>
				Bienvenid@ a la aplicación <span>OpenRadioCamp</span>
			</h1>
			<input
				type='text'
				placeholder='Escribe el nombre de la radio'
				value={busqueda}
				onChange={(e) => setBusqueda(e.target.value)}
			/>
			<button onClick={hazBusqueda}>Buscar</button>
			{listado.length === 0 ? (
				<div aria-label='mensaje-búsqueda'>Busca tus emisoras favoritas</div>
			) : null}
			<section aria-label='listado-emisoras'>
				{listado.map((emisora, i) => (
					<div key={i}>
						{emisora.name}
						<FaPlay
							style={{ cursor: 'pointer' }}
							onClick={() => playRadio(emisora)}
						/>
					</div>
				))}
			</section>
		</div>
	);
}

export default App;
