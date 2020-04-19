var metas = document.getElementsByTagName('meta');
var i;
if (navigator.userAgent.match(/iPhone/i)) {
  for (i=0; i<metas.length; i++) {
    if (metas[i].name == "viewport") {
      metas[i].content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
    }
  }
  document.addEventListener("gesturestart", gestureStart, false);
}
function gestureStart() {
  for (i=0; i<metas.length; i++) {
    if (metas[i].name == "viewport") {
      metas[i].content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
    }
  }
}
Countdown = function() {
	_(this).bindAll('update', 'executeAnimation', 'finishAnimation');
	this.setVars.apply(this, arguments);
	this.update();
};

Countdown.prototype = {
	duration: 1000,

	setVars: function(time, el, template) {
		this.max = time;
		this.time = time;
		this.el = el;
		this.template = _(template.innerHTML).template();
		this.delta = -1;
	},

	update: function() {
		this.checkTime();
		this.setSizes();

		this.setupAnimation();
		_(this.executeAnimation).delay(20);
		_(this.finishAnimation).delay(this.duration * 0.9);

		_(this.update).delay(this.duration);
	},

	checkTime: function() {
		this.time += this.delta;

		if (this.time === 0) this.delta = 1;
		if (this.time === this.max) this.delta = -1;

		this.delta === 1 ? this.toggleDirection('up', 'down') : this.toggleDirection('down', 'up');

		this.nextTime = this.time + this.delta;
	},

	toggleDirection: function(add, remove) {
		this.el.classList.add(add);
		this.el.classList.remove(remove);
	},

	setSizes: function() {
		this.currentSize = this.getSize(this.time);
		this.nextSize = this.getSize(this.nextTime);
	},

	getSize: function(time) {
		return time > 9 ? 'small' : '';
	},

	setupAnimation: function() {
		this.el.innerHTML = this.template(this);
		this.el.classList.remove('changed');
	},

	executeAnimation: function() {
		this.el.classList.add('changing');
	},

	finishAnimation: function() {
		this.el.classList.add('changed');
		this.el.classList.remove('changing');
	}
};

new Countdown(
	12,
	document.querySelector('.count'),
	document.querySelector('#count-template')
);

