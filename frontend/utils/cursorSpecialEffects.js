import { Boom } from './Boom';
export class CursorSpecialEffects {
	constructor() {
		this.computerCanvas = document.createElement('canvas');
		this.renderCanvas = document.createElement('canvas');

		this.computerContext = this.computerCanvas.getContext('2d');
		this.renderContext = this.renderCanvas.getContext('2d');

		this.globalWidth = window.innerWidth;
		this.globalHeight = window.innerHeight;

		this.booms = [];
		this.running = false;
	}

	handleMouseDown(e) {
		const boom = new Boom({
			origin: { x: e.clientX, y: e.clientY },
			context: this.computerContext,
			area: {
				width: this.globalWidth,
				height: this.globalHeight,
			},
		});
		boom.init();
		this.booms.push(boom);
		this.running || this.run();
	}

	handlePageHide() {
		this.booms = [];
		this.running = false;
	}

	init() {
		const style = this.renderCanvas.style;
		style.position = 'fixed';
		style.top = style.left = 0;
		style.zIndex = '999999999999999999999999999999999999999999';
		style.pointerEvents = 'none';

		style.width = this.renderCanvas.width = this.computerCanvas.width = this.globalWidth;
		style.height = this.renderCanvas.height = this.computerCanvas.height = this.globalHeight;

		document.body.append(this.renderCanvas);

		window.addEventListener('mousedown', this.handleMouseDown.bind(this));
		window.addEventListener('pagehide', this.handlePageHide.bind(this));
	}

	run() {
		this.running = true;
		if (this.booms.length == 0) {
			return (this.running = false);
		}

		requestAnimationFrame(this.run.bind(this));

		this.computerContext.clearRect(0, 0, this.globalWidth, this.globalHeight);
		this.renderContext.clearRect(0, 0, this.globalWidth, this.globalHeight);

		this.booms.forEach((boom, index) => {
			if (boom.stop) {
				return this.booms.splice(index, 1);
			}
			boom.move();
			boom.draw();
		});
		this.renderContext.drawImage(this.computerCanvas, 0, 0, this.globalWidth, this.globalHeight);
	}
}
