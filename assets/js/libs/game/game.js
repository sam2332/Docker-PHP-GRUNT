var game = function () {
	this.step = null;
	this.mousePos = {
		x: 100,
		y: 200
	};
	this.init = function (canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.step = 0;
	};
	this.draw = function (time) {
		this.ctx.fillStyle = "#FF0000";
		this.ctx.fillRect(0, 0, this.mousePos.x, this.mousePos.y);
	};
	this.update = function () {
		this.step++;
	};
	return this;
};
