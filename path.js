
/**
 * Expose `Path`.
 */

module.exports = Path;

/**
 * Initialize a new `Path`.
 *
 * @api private
 */

function Path() {
  this.points = [];
  this.size = 5;
}

/**
 * Path opacity.
 */

Path.prototype.opacity = 1;

/**
 * Add the given point.
 *
 * @param {Number} x
 * @param {Number} y
 * @api private
 */

Path.prototype.addPoint = function(x, y){
  this.points.push({ x: x, y: y });
};

/**
 * Draw the object.
 *
 * @param {CanvasRenderingContext2d} ctx
 * @api private
 */

Path.prototype.draw = function(ctx){
  var points = this.points
    , len = points.length
    , a, b
    , call;

  ctx.save();

  ctx.beginPath();
  ctx.globalAlpha = this.opacity;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = this.size;
  ctx.strokeStyle = this.color;

  a = points[0];
  ctx.moveTo(a.x, a.y);

  for (var i = 0; i < len - 1; ++i) {
    a = points[i];
    b = points[i + 1];
    ctx.quadraticCurveTo(
        a.x
      , a.y
      , a.x + (b.x - a.x) / 2
      , a.y + (b.y - a.y) / 2)
  }

  ctx.lineTo(b.x, b.y);
  ctx.stroke();

  ctx.restore();
};