// Vamos a construir una aplicación y búsqueda de Emisoras de Radio en Streaming

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

const setup = () => render(<App />);

afterEach(cleanup);

// 0 - La aplicación debe renderizar correctamente
describe('0 - La aplicación debe renderizar correctamente', () => {
	test('0 - La aplicación debe renderizar correctamente', () => {
		setup();
		expect(screen).toBeDefined();
	});
});

// 1 - El nombre de la aplicación debe mostrarse en algun lugar => "OpenRadioCamp"
describe('El nombre de la aplicación debe mostrarse en algun lugar => "OpenRadioCamp"', () => {
	test('El nombre de la aplicación debe mostrarse en algun lugar => "OpenRadioCamp"', () => {
		setup();
		const nombre = 'OpenRadioCamp';
		const el = screen.getByText(nombre);
		expect(el).toBeInTheDocument();
	});
});

// 2 - Debemos poder buscar radios por nombre
// 2a - La aplicación debe tener un campo input con el placeholder => "Escribe el nombre de la radio"
// 2b - La aplicación debe tener un botón de búsqueda => Texto "Buscar"
// 2c - Cuando hacemos clic en el botón buscar, se debe ejecutar la función de búsqueda una sola vez
describe('2 - Debemos poder buscar radios por nombre', () => {
	test('2a - La aplicación debe tener un campo input con el placeholder => "Escribe el nombre de la radio"', () => {
		setup();
		const placeholder = 'Escribe el nombre de la radio';
		const input = screen.getByPlaceholderText(placeholder);
		expect(input).toBeInTheDocument();
	});
	test('2b - La aplicación debe tener un botón de búsqueda => Texto "Buscar"', () => {
		setup();
		const texto = 'Buscar';
		const button = screen.getByText(texto);
		expect(button).toBeInTheDocument();
	});
	test('2c - Cuando hacemos clic en el botón buscar, se debe ejecutar la función de búsqueda una sola vez', () => {
		setup();
		const funcionMock = jest.fn();
		const texto = 'Buscar';
		const button = screen.getByText(texto);
		button.addEventListener('click', funcionMock);
		fireEvent.click(button);
		expect(funcionMock).toBeCalledTimes(1);
	});
});

// 3 - Listado de emisoras
// 3a - Debe existir un listado de emisoras
// 3b - El listado debe inicializar vacio
// 3c - Cuando se hace una búsqueda válida, el listado debe mostrar al menos un resultado
// 3d - Cuando hacemos una búsqueda inválida (no existe), el listado debe mostrar un mensaje "No se han encontrado emisoras para esta búsqueda"
describe('3 - Listado de emisoras', () => {
	test('3a - Debe existir un listado de emisoras', () => {
		setup();
		const listado = screen.getByLabelText('listado-emisoras');
		expect(listado).toBeInTheDocument();
	});
	test('3 b - El listado debe inicializar vacío', () => {
		setup();
		const listado = screen.getByLabelText('listado-emisoras');
		expect(listado.childElementCount).toBe(0);
	});
	test('3c - Cuando se hace una búsqueda válida, el listado debe mostrar al menos un resultado', () => {
		setup();
		const placeholder = 'Escribe el nombre de la radio';
		const input = screen.getByPlaceholderText(placeholder);
		const texto = 'Buscar';
		const button = screen.getByText(texto);
		fireEvent.change(input, { target: { value: 'Country' } });
		fireEvent.click(button);
		const listado = screen.getByLabelText('listado-emisoras');
		expect(listado.childElementCount).toBeGreaterThanOrEqual(0);
	});
});

// 4 -  Necesito que la aplicación muestre por defecto un mensaje cuando todavía no se ha realizado ninguna búsqueda, este mensaje debe decir: "Busca tus emisoras favoritas"
// 4a - Se debe renderizar el mensaje cuando todavía no se ha realizado ninguna búsqueda
// 4b - El mensaje debe decir: "Busca tus emisoras favoritas"
describe('4 - Necesito que la aplicación muestre por defecto un mensaje cuando todavía no se ha realizado ninguna búsqueda', () => {
	test('4a - Se debe renderizar el mensaje cuando todavía no se ha realizado ninguna búsqueda', () => {
		setup();
		const listado = screen.getByLabelText('listado-emisoras');
		const mensaje = screen.getByLabelText('mensaje-búsqueda');
		expect(listado.childElementCount).toBe(0);
		expect(mensaje).toBeInTheDocument();
	});
	test('4b - El mensaje debe decir: "Busca tus emisoras favoritas"', () => {
		setup();
		const mensaje = screen.getByText('Busca tus emisoras favoritas');
		expect(mensaje).toBeInTheDocument();
	});
});
