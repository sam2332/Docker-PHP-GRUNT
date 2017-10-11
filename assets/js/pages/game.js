// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

function resize_canvas() {
	canvas = document.getElementById("gameCanvas");
	if (canvas.width < window.innerWidth) {
		canvas.width = window.innerWidth;
	}

	if (canvas.height < window.innerHeight) {
		canvas.height = window.innerHeight;
	}
}
$(document).ready(function () {
	game.init();



	// usage:
	// instead of setInterval(render, 16) ....

	(function animloop() {
		requestAnimFrame(animloop);
		game.draw();
	})();
});
