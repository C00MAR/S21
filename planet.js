/*********
 * made by Matthias Hurrle (@atzedent)
 */

/** @type {HTMLCanvasElement} */
const canvas = window.canvas
const gl = canvas.getContext('webgl')
const dpr = window.devicePixelRatio

const vertexSource = `
 #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif
 
  attribute vec2 position;
 
  void main(void)
  {
    gl_Position = vec4(position, 0., 1.);
  }
`
const fragmentSource = `
/*********
 * made by Matthias Hurrle (@atzedent)
 */

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

#define NUMP 10

uniform vec2 resolution;
uniform float time;
uniform vec2 pointers[NUMP];

const float PI = radians(180.);

#define T 3. * time
#define SPREADING 42. + T

mat2 rot(float a) {
    float c = cos(a),
    s = sin(a);

    return mat2(c, -s, s, c);
}

float hash(float n) {
    return fract(sin(n) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float n = i.x + i.y * 57.;

    return mix(
        mix(hash(n), hash(n + 1.), f.x),
        mix(hash(n + 57.), hash(n + 58.), f.x),
        f.y
    );
}

float fbm(vec2 p) {
    float f = .0;
    f += .5000 * noise(p); p *= 2.;
    f += .2500 * noise(p); p *= 2.;
    f += .1250 * noise(p); p *= 2.;
    f += .0625 * noise(p);

    return f / .9375;
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1., 2. / 3., 1. / 3., 3.);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6. - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, .0, 1.), c.y);
}

float Hexagon(vec2 p) {
    p = abs(p * 2. - 1.);

    return max(
        abs(p.y), p.x * .866025 + p.y * .5
    );
}

float Ellipse(in vec2 p, in vec2 r) {
    float k0 = length(p/r);
    float k1 = length(p/(r*r));
    return k0*(k0-1.0)/k1;
}

float Circle(float d, float r, float blur) {
    return smoothstep (
        r - blur,
        r + blur,
        d
    );
}

void main(void) {
    float mn = min(resolution.x, resolution.y);
    vec2 uv = (
        2. * gl_FragCoord.xy - resolution.xy
    ) / mn;

    vec3 color = vec3(.0);

    vec2 gv = uv * rot(PI);
    float sdfEllipse = Ellipse(gv, vec2(.75, .5)) + 1.;
    float sdf = Hexagon (gv + .5) + .5;

    float v = fbm(
        vec2(
            atan(gv.x, gv.y),
            length(gv)
        ) * SPREADING
    );

    v -= max(v, sdf);

    float dist = pointers[0].x > .0 ? 1.: v;

    for (int n = 0; n < NUMP; ++n) {
    if (pointers[n].x == .0) break;
        vec2 pointer = (2. * pointers[n].xy - resolution.xy) / mn;

        float u = fbm(
            vec2(
                atan(uv.x - pointer.x, uv.y - pointer.y),
                distance(uv, pointer.xy)
            ) * SPREADING
        );

        u *= sdf;

        dist = min(dist, u);
    }

    color = hsv2rgb(
        vec3(
            .00 + smoothstep(.1, .75, dot(dist, dist)),
            1.,
            .9
        )
    );

    color /= sdfEllipse;
    color = min(color, vec3(sdf));
    color *= Circle(length(gv), .1, .025);

    gl_FragColor = vec4(color, 1.);
}
`
const mouse = {
  /** @type {[number,number][]} */
  points: [],
  clear: function () {
    this.points = []
  },
  /** @param {[number,number]} point */
  add: function (point) {
    this.points.push(point)
  }
}

let time;
let buffer;
let program;
let resolution;
let pointers;
let vertices = []
let touches = [0,0]

function resize() {
  const {
    innerWidth: width,
    innerHeight: height
  } = window

  canvas.width = width * dpr
  canvas.height = height * dpr

  gl.viewport(0, 0, width * dpr, height * dpr)
}

function compile(shader, source) {
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
  }
}

function setup() {
  const vs = gl.createShader(gl.VERTEX_SHADER)
  const fs = gl.createShader(gl.FRAGMENT_SHADER)

  program = gl.createProgram()

  compile(vs, vertexSource)
  compile(fs, fragmentSource)

  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program))
  }

  vertices = [
    -1.0, -1.0,
    1.0, -1.0,
    -1.0, 1.0,
    -1.0, 1.0,
    1.0, -1.0,
    1.0, 1.0
  ]

  buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

  const position = gl.getAttribLocation(program, "position")

  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  time = gl.getUniformLocation(program, "time")
  resolution = gl.getUniformLocation(program, 'resolution')
  pointers = gl.getUniformLocation(program, 'pointers')
}

function draw(now) {
  gl.clearColor(0, 0, 0, 1.)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(program)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

  gl.uniform1f(time, (now / 1000))
  gl.uniform2f(
    resolution,
    canvas.width,
    canvas.height
  )
  gl.uniform2fv(pointers, touches);
  gl.drawArrays(gl.TRIANGLES, 0, vertices.length * .5)
}

function loop(now) {
  draw(now)

  requestAnimationFrame(loop)
}

function init() {
  setup()
  resize()
  loop(0)
}

function clearTouches() {
  for (let i = 0; i < touches.length; i++) {
    touches[i] = .0
  }
}

/** @param {TouchEvent} e */
function handleTouch(e) {
  const { height } = canvas

  clearTouches()

  let i = 0
  for (let touch of e.touches) {
    const { clientX: x, clientY: y } = touch

    touches[i++] = x * dpr
    touches[i++] = height - y * dpr
  }
}

/** @param {{ clientX: number, clientY: number }[]} other */
function mergeMouse(other) {
  return [
    ...mouse.points.map(([clientX, clientY]) => { return { clientX, clientY } }),
    ...other]
}

canvas.ontouchstart = handleTouch
canvas.ontouchmove = handleTouch
canvas.ontouchend = clearTouches

document.body.onload = init

window.onresize = resize

if (!window.matchMedia("(pointer: coarse)").matches) {
  canvas.onmouseout = () => {
    clearTouches()
    handleTouch({ touches: mergeMouse([]) })
  }
  canvas.onmousemove = e => {
    handleTouch({
      touches: mergeMouse([{ clientX: e.clientX, clientY: e.clientY }])
    })
  }
  canvas.onclick = e => {
    if (e.shiftKey) {
      mouse.clear()
    } else {
      mouse.add([e.clientX, e.clientY])
    }
  } 
}
