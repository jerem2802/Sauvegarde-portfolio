import * as THREE from "three";

export const GlowShader = {
  uniforms: {
    u_time: { value: 0 },
    u_color: { value: new THREE.Color("#00ffff") },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float u_time;
    uniform vec3 u_color;
    varying vec2 vUv;

    float random (in vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    float noise (in vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) +
              (c - a) * u.y * (1.0 - u.x) +
              (d - b) * u.x * u.y;
    }

    void main() {
      vec2 st = vUv * 2.5;
      float n = noise(st + u_time * 0.2);
      float glow = smoothstep(0.3, 0.9, n);
      gl_FragColor = vec4(u_color, glow * 0.4);
    }
  `
};
