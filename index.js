
/**
 * Module dependencies.
 */

var classes = require('classes');
var events = require('events');
var Path = require('./path');
var raf = require('raf');

/**
 * Create a new `Sketch` for the given `canvas`.
 *
 * @param {Canvas} canvas
 * @return {Sketch}
 * @api public
 */

module.exports = function(canvas){
  return new Sketch(canvas);
};

/**
 * Initialize a new `Sketch` with the given `canvas`.
 *
 * @param {Canvas} canvas
 * @api public
 */

function Sketch(canvas) {
  this.canvas = canvas;
  this.bounds = null;
  this.ctx = canvas.getContext('2d');
  this.bind();
  this.objs = [];
  this.size(1.5);
  this.background('white');
  this.color('black');
  classes(canvas).add('sketch');
  this.draw();
}

/**
 * Add drawable `obj`, which must
 * provide a `.draw(ctx)` method.
 *
 * @param {Object} obj
 * @return {Sketch}
 * @api public
 */

Sketch.prototype.add = function(obj){
  this.objs.push(obj);
  return this;
};

/**
 * Reset the sketch defaults and clear the canvas.
 *
 * @api public
 */

Sketch.prototype.reset = function(){
  this.clear();
  this.size(1.5);
  this.color('black');
};

/**
 * Clear the objects and re-draw.
 *
 * @api public
 */

Sketch.prototype.clear = function(){
  this.objs = [];
  this.draw();
};

/**
 * Set pen `size`.
 *
 * @param {Number} size
 * @return {Sketch}
 * @api public
 */

Sketch.prototype.size = function(size){
  this._size = size;
  return this;
};

/**
 * Set pen `color`.
 *
 * @param {String} color
 * @return {Sketch}
 * @api public
 */

Sketch.prototype.color = function(color){
  this._color = color;
  return this;
};

/**
 * Set background `color`.
 *
 * @param {String} color
 * @return {Sketch}
 * @api public
 */

Sketch.prototype.background = function(color){
  this._background = color;
  return this;
};

/**
 * Set pen `opacity`.
 *
 * @param {String} opacity
 * @return {Sketch}
 * @api public
 */

Sketch.prototype.opacity = function(opacity){
  this._opacity = opacity;
  return this;
};

/**
 * Bind event handlers.
 *
 * @api public
 */

Sketch.prototype.bind = function(){
  this.events = events(this.canvas, this);
  this.events.bind('mousedown');
  this.events.bind('mousemove');
  this.events.bind('mouseup');
  this.events.bind('touchstart', 'onmousedown');
  this.events.bind('touchmove', 'onmousemove');
  this.events.bind('touchend', 'onmouseup');
};

/**
 * Unbind event handlers.
 *
 * @api public
 */

Sketch.prototype.unbind = function(){
  this.events.unbind();
};

/**
 * Animate via RAF.
 *
 * @api private
 */

Sketch.prototype.animate = function(){
  var self = this;
  if (!this.down) return;
  raf(function(){ self.animate() });
  this.draw();
};

/**
 * Handle mousedown:
 *
 *   - add a new path
 *   - add initial point
 *   - redraw
 *
 * @api private
 */

Sketch.prototype.onmousedown = function(e){
  this.bounds = this.bounds || this.canvas.getBoundingClientRect();
  e.preventDefault();
  if (e.targetTouches) e = e.targetTouches[0];
  this.down = e;
  var x = e.pageX - this.bounds.left;
  var y = e.pageY - this.bounds.top;
  var path = this.path = new Path;
  path.opacity = 0.8;
  path.color = this._color;
  path.size = this._size;
  path.addPoint(x, y);
  path.addPoint(x + .1, y + .1);
  this.objs.push(path);
  this.animate();
};

/**
 * Handle mousemove:
 *
 *   - add new point
 *   - redraw
 *
 * @api private
 */

Sketch.prototype.onmousemove = function(e){
  if (!this.down) return;
  e.preventDefault();
  if (e.targetTouches) e = e.targetTouches[0];
  var x = e.pageX - this.bounds.left;
  var y = e.pageY - this.bounds.top;
  this.path.addPoint(x, y);
};

/**
 * Handle mouseup:
 *
 *   - reset state
 *
 * @api private
 */

Sketch.prototype.onmouseup = function(e){
  this.down = null;
  this.draw();
};

/**
 * Re-draw the sketch.
 *
 * @api private
 */

Sketch.prototype.draw = function(){
  var ctx = this.ctx;
  ctx.fillStyle = this._background;
  ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  for (var i = 0; i < this.objs.length; ++i) {
    this.objs[i].draw(this.ctx);
  }
};
