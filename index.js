
/**
 * Module dependencies.
 */

var Path = require('./path')
  , classes = require('classes');

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
  this.ctx = canvas.getContext('2d');
  this.bind();
  this.paths = [];
  this.size(1.5);
  this.color('black');
  classes(canvas).add('sketch');
  this.draw();
}

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
 * @api private
 */

Sketch.prototype.bind = function(){
  this.canvas.addEventListener('mousedown', this.onmousedown.bind(this), false);
  this.canvas.addEventListener('mousemove', this.onmousemove.bind(this), false);
  this.canvas.addEventListener('mouseup', this.onmouseup.bind(this), false);
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
  this.down = e;
  var x = e.offsetX;
  var y = e.offsetY;
  var path = this.path = new Path;
  path.opacity = 0.8;
  path.color = this._color;
  path.size = this._size;
  path.addPoint(x, y);
  path.addPoint(x + .1, y + .1);
  this.paths.push(path);
  this.draw();
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
  this.path.addPoint(e.offsetX, e.offsetY);
  this.draw();
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
};

/**
 * Re-draw the sketch.
 *
 * @api private
 */

Sketch.prototype.draw = function(){
  var ctx = this.ctx;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  for (var i = 0; i < this.paths.length; ++i) {
    this.paths[i].draw(this.ctx);
  }
};

