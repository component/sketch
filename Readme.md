
# Sketch

  Turn a canvas into a sketch pad.

  ![js canvas sketch](http://f.cl.ly/items/3a1a0h2X472Y0S3f2A2u/Screen%20Shot%202012-08-31%20at%209.08.47%20AM.png)

## Installation

```
$ component install component/sketch
```
## API

### sketch(canvas)

  Turn the given `canvas` into a sketch pad.

```js
var sketch = require('sketch');
sketch(canvas);
```

### Sketch#add(object)

  Add drawable `object` that _must_ provide a `.draw(ctx)` method.

### Sketch#size(n)

  Set pen size.

### Sketch#color(string)

  Set pen color.

### Sketch#opacity(n)

  Set pen opacity.

### Sketch#clear()

  Clear the objects and re-draw.

### Sketch#reset()

  Reset the sketch defaults and clear the canvas.

## License

  MIT
