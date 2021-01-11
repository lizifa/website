import { Circle } from './circle';
export class Boom {
	constructor({ origin, context, circleCount = 10, area }) {
		this.origin = origin;
		this.context = context;
		this.circleCount = circleCount;
		this.area = area;
		this.stop = false;
		this.circles = [];
	}

	randomArray(range) {
		const length = range.length;
		const randomIndex = Math.floor(length * Math.random());
		return range[randomIndex];
	}

	randomColor() {
		const range = ['8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
		return '#' + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range);
	}

	randomRange(start, end) {
		return (end - start) * Math.random() + start;
	}

	init() {
		for (let i = 0; i < this.circleCount; i++) {
			const circle = new Circle({
				context: this.context,
				origin: this.origin,
				color: this.randomColor(),
				angle: this.randomRange(Math.PI - 1, Math.PI + 1),
				speed: this.randomRange(1, 6),
			});
			this.circles.push(circle);
		}
	}

	move() {
		this.circles.forEach((circle, index) => {
			if (circle.position.x > this.area.width || circle.position.y > this.area.height) {
				return this.circles.splice(index, 1);
			}
			circle.move();
		});
		if (this.circles.length == 0) {
			this.stop = true;
		}
	}

	draw() {
		this.circles.forEach((circle) => circle.draw());
	}
}
