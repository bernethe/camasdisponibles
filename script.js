'use strict';

var _d;

const main = () => {
	fetch('data.json')
		.then( resp => resp.json() )
		.then( respObj => {
			_d = respObj;
			console.log(_d);
		} )
		.catch( e => console.log(e) );
};

document.addEventListener('DOMContentLoaded', main, !1);