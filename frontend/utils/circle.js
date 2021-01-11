export class Circle {
	constructor({ origin, speed, color, angle, context }) {
		this.origin = origin;
		this.position = { ...this.origin };
		this.color = color;
		this.speed = speed;
		this.angle = angle;
		this.context = context;
		this.renderCount = 0;
	}

	draw() {
		this.context.fillStyle = this.color;
		this.context.beginPath();
		this.context.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2);
		this.context.fill();
	}

	move() {
		this.position.x = Math.sin(this.angle) * this.speed + this.position.x;
		this.position.y = Math.cos(this.angle) * this.speed + this.position.y + this.renderCount * 0.3;
		this.renderCount++;
	}
}
