(function(){
	xtag.register('x-timer', {
		content: '<canvas></canvas>',
		onCreate: function(){
            // fired once at the time a component 
            // is initially created or parsed
	    },
	    onInsert: function(){
            //based on http://irae.pro.br/lab/canvas_pie_countdown/
            var self = this;
	        // fired each time a component 
	        // is inserted into the DOM
            var canvas = xtag.query(this, 'canvas')[0];
            canvas.addEventListener('touchend', function(event){
                event.preventDefault();
                var singleTapTimeout = setTimeout(singleTap, 300);
                canvas.addEventListener('touchend', doubleTap, false);
                if(!self.dataset['paused']){
                    self.pause();
                } else {
                    self.start();
                }
                function doubleTap(e){
                    e.preventDefault();
                    self.stop();
                    canvas.removeEventListener('touchend', doubleTap, false);
                }
                function singleTap(){
                    canvas.removeEventListener('touchend', doubleTap, false);
                }
            }, false);

            canvas.addEventListener('click', function(event){
                event.preventDefault();
                if(!self.dataset['paused']){
                    self.pause();
                } else {
                    self.start();
                }
            }, false);
            
            self.dataset['start'] = self.dataset['start']?self.dataset['start']:1;
            self.dataset['fps'] = self.dataset['fps']?self.dataset['fps']:40;
            self.stop();
	    },
	    events: {
            'dblclick:delegate(canvas)': function(event, timer){
                timer.stop();
            }
	    },
	    getters: {
            remaining: function(){
                return parseFloat(this.dataset.remaining);
            },
            total: function(){
                return parseFloat(this.dataset.time);
            }
	    },
	    setters: {
            remaining: function(left){
                this.dataset.remaining = left;
            },
            total: function(total){
                this.dataset.time = total;
            }
	    },
	    methods: {
            _draw_next: function(step) { // step between 0 and 1
                var canvas = xtag.query(this, 'canvas')[0];
                var ctx = canvas.getContext('2d');
                var canvas_size = [canvas.width, canvas.height];
                var radius = Math.min(canvas_size[0], canvas_size[1]) / 2;
                var center = [canvas_size[0]/2, canvas_size[1]/2];
                ctx.clearRect(0,0,canvas_size[0], canvas_size[1]);
                if(step < 1) {
                    ctx.beginPath();
                    ctx.moveTo(center[0], center[1]); // ponto central
                    ctx.arc(  // draw next arc
                        center[0],
                        center[1],
                        radius,
                        Math.PI * (-0.5 + 0), // -0.5 pra começar do topo
                        Math.PI * (-0.5 + step*2),
                        true // anti horário
                    );
                    ctx.lineTo(center[0], center[1]); // line back to the center
                    ctx.closePath();
                    ctx.fillStyle = this.style.color;    // color
                    ctx.fill();
                }
            },
            start: function(){
                var self = this;
                delete this.dataset['paused'];
                var total = self.dataset['fps']*parseFloat(this.getAttribute("data-time"));
                var remaining = total;
                if(this.dataset['remaining']){
                    remaining = self.dataset['fps']*this.dataset['remaining'];
                }
                var done = new CustomEvent("done");
                var previous = self.dataset['start'];
                var delayed = function(frame){
                    var step = 1-frame/total;
                    var left = Math.ceil(frame/self.dataset['fps']);
                    //return function() {
                    if(previous != left){
                        var tick = new CustomEvent("tick", {"detail":{'remaining': left}});
                        self.dataset['remaining'] = left;
                        self.dispatchEvent(tick);
                        previous = left;
                    }
                    self._draw_next(step);
                    //pauses on window change.. no good
                    //put webworkers in?
                    if(frame > 0 && !self.dataset['paused']){
                        self.dataset['timeout'] = setTimeout(delayed,1000/self.dataset['fps'], --frame);
                    } else if(frame < 1){
                        self.dispatchEvent(done);
                    }
                };
                delayed(remaining);
            },
            pause: function(){
                this.dataset['paused'] = true;
            },
            stop: function(){
                var self = this;
                clearInterval(self.dataset['timeout']);
                self._reset();
                self.start();
                self.pause();
            },
            _reset: function(){
                delete this.dataset['remaining'];
            }
	    }
	});
})();