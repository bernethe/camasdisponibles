'use strict';

var _d,_c;

const main = () => {
	document.querySelector('#page_02 a').addEventListener('click',resetAll,!1);
	fetch('data.json')
		.then( resp => resp.json() )
		.then( respObj => {
			_d = respObj.datos;
			document.getElementById('dispon_txt').innerHTML = `Quedan disponibles sólo el <strong>${respObj.disponible}%</strong> de camas de cuidados intensivos disponibles en el país. Si aumentan los casos, disminuye la capacidad de atención.`;
			document.getElementById('date_txt').innerHTML = `Última actualización: ${respObj.fecha}`;
			//console.log(_d, _d.length);
			let _btn = document.getElementById('botonera');
			for(let i = 0; i < _d.length; i++) {
				let _e = createCustomElement('li', {'data-prov':i},[_d[i].label]);
				_e.addEventListener('click',doProv,!1);
				_btn.appendChild(_e);
			}
		} )
		.catch( e => console.log(e) );
};
const doProv = (ele) => {
	_c = ele.target.dataset['prov'];
	document.getElementById('page_01').classList.add('d-none');
	document.getElementById('page_02').classList.remove('d-none');
	let _cc = _d[_c].hospitals;
	let _t = document.querySelector('#tabResult tbody');
	for(let i = 0; i < _cc.length; i++) {
		//console.log(_cc[i]);
		_t.appendChild(
			createCustomElement('tr', {},[
				createCustomElement('td', {},[_cc[i].label]),
				createCustomElement('td', {},[_cc[i].total])
			])
		);
	}
}
const resetAll = (ev) => {
	ev.preventDefault();
	let _t = document.querySelector('#tabResult tbody');
	while( _t.firstChild ){
		_t.removeChild( _t.firstChild );
	}
	document.getElementById('page_01').classList.remove('d-none');
	document.getElementById('page_02').classList.add('d-none');
}

// https://github.com/escueladigital/EDui
// Crear elementos con atributos e hijo
const createCustomElement = (element,attributes,children) => {
	var customElement = document.createElement(element);
	if (children !== undefined) children.forEach(el => {
		if (el.nodeType) {
			if (el.nodeType === 1 || el.nodeType === 11) customElement.appendChild(el);
		} else {
			customElement.innerHTML += el;
		}
	});
	addAttributes(customElement,attributes);
	return customElement;
}

// Añadir un objeto de atributos a un elemento
const addAttributes = (element, attrObj) => {
	for (var attr in attrObj) {
		if (attrObj.hasOwnProperty(attr)) {
			element.setAttribute(attr,attrObj[attr]);
		}
	}
}

document.addEventListener('DOMContentLoaded', main, !1);