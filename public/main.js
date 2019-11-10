import Game from './game.js';

window.addEventListener('DOMContentLoaded', () => {
	let game = new Game();
	window.game = game;

	let last = Date.now();
	const fn = function() {
		let now = Date.now();

		let delta = (now - last) / 1000;
		// console.log(delta);

		game.update(delta);
		game.render(delta);

		last = Date.now();
		window.requestAnimationFrame(fn);
	}

	window.requestAnimationFrame(fn);
});