'use client';

import { useEffect } from 'react';
import type * as THREE from 'three';

const ACCENT = '#C6F432';
const VIOLET = '#6D5CFF';

const VS = `
uniform float uTime; uniform float uPR; uniform float uAmp; uniform float uSize;
attribute float aRnd; varying float vMix; varying float vR;
void main(){
  vec3 p = position;
  float n = sin(p.x*2.6+uTime*.8)*sin(p.y*3.1+uTime*.6)*sin(p.z*2.9+uTime*.7);
  p += normalize(p+vec3(1e-4))*uAmp*(n+.25*sin(uTime*1.7+aRnd*6.283));
  vMix = clamp(n*.5+.5+(aRnd-.5)*.5,0.,1.); vR = aRnd;
  vec4 mv = modelViewMatrix*vec4(p,1.);
  gl_PointSize = uSize*(1.+aRnd*1.4)*uPR*(3.5/-mv.z);
  gl_Position = projectionMatrix*mv;
}`;

const FS = `
uniform vec3 uA; uniform vec3 uB; varying float vMix; varying float vR;
void main(){
  vec2 c = gl_PointCoord-.5; float d = length(c); if(d>.5) discard;
  float a = pow(1.-d*2.,1.6);
  gl_FragColor = vec4(mix(uB,uA,vMix), a*(.55+.45*vR));
}`;

type Mouse = { x: number; y: number };

type SceneState = {
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  group: THREE.Group;
  visible: boolean;
  w: number;
  h: number;
  layout?: (asp: number, W: number, H: number) => void;
  update?: (t: number, m: Mouse) => void;
};

/** Pointer spotlight, card tilt and the three WebGL scenes from the design. */
export default function Effects() {
  useEffect(() => {
    const root = document.getElementById('pf-root');
    if (!root) return;
    const cleanup: Array<() => void> = [];
    let alive = true;
    let raf = 0;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
      const z = parseFloat(getComputedStyle(root).zoom) || 1;
      root.style.setProperty('--cx', (e.clientX / z).toFixed(0) + 'px');
      root.style.setProperty('--cy', (e.clientY / z).toFixed(0) + 'px');
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    cleanup.push(() => window.removeEventListener('pointermove', onMove));

    // card tilt
    const cards = Array.from(root.querySelectorAll<HTMLElement>('.card, .ai-card'));
    cards.forEach((el) => {
      const tilt = (e: MouseEvent) => {
        if (reduce) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--ry', ((x - 0.5) * 9).toFixed(2) + 'deg');
        el.style.setProperty('--rx', ((0.5 - y) * 9).toFixed(2) + 'deg');
        el.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
        el.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
      };
      const untilt = () => {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      };
      el.addEventListener('mousemove', tilt);
      el.addEventListener('mouseleave', untilt);
      cleanup.push(() => {
        el.removeEventListener('mousemove', tilt);
        el.removeEventListener('mouseleave', untilt);
      });
    });

    import('three').then((T) => {
      if (!alive) return;
      const small = window.innerWidth < 640;
      const PR = Math.min(window.devicePixelRatio || 1, 2);

      const mkMat = (size: number, amp: number, mono: boolean) =>
        new T.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uPR: { value: PR },
            uAmp: { value: amp },
            uSize: { value: size },
            uA: { value: new T.Color(ACCENT) },
            uB: { value: new T.Color(mono ? ACCENT : VIOLET) }
          },
          vertexShader: VS,
          fragmentShader: FS,
          transparent: true,
          depthWrite: false,
          blending: T.AdditiveBlending
        });

      const withRnd = (g: THREE.BufferGeometry) => {
        const n = g.attributes.position.count;
        const r = new Float32Array(n);
        for (let i = 0; i < n; i++) r[i] = Math.random();
        g.setAttribute('aRnd', new T.BufferAttribute(r, 1));
        return g;
      };

      const scenes: SceneState[] = [];
      const makeScene = (id: string, build: (s: SceneState) => void) => {
        const canvas = document.getElementById(id) as HTMLCanvasElement | null;
        if (!canvas) return;
        let renderer: THREE.WebGLRenderer;
        try {
          renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
        } catch {
          return;
        }
        renderer.setPixelRatio(PR);
        renderer.setClearColor(0x000000, 0);
        const scene = new T.Scene();
        const camera = new T.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.z = 5;
        const group = new T.Group();
        scene.add(group);
        const s: SceneState = { canvas, renderer, scene, camera, group, visible: true, w: 0, h: 0 };
        build(s);
        const io = new IntersectionObserver((es) => es.forEach((en) => (s.visible = en.isIntersecting)), {
          rootMargin: '100px'
        });
        io.observe(canvas);
        cleanup.push(() => {
          io.disconnect();
          renderer.dispose();
        });
        scenes.push(s);
      };

      const resize = (s: SceneState) => {
        const w = s.canvas.clientWidth;
        const h = s.canvas.clientHeight;
        if (!w || !h) return false;
        if (w !== s.w || h !== s.h) {
          s.w = w;
          s.h = h;
          s.renderer.setSize(w, h, false);
          s.camera.aspect = w / h;
          s.camera.updateProjectionMatrix();
          const wh = 2 * Math.tan((s.camera.fov * Math.PI) / 180 / 2) * s.camera.position.z;
          s.layout?.(w / h, wh * (w / h), wh);
        }
        return true;
      };

      // HERO: breathing particle sphere + orbit rings
      makeScene('gl-hero', (s) => {
        const N = small ? 2600 : 5200;
        const pos = new Float32Array(N * 3);
        for (let i = 0; i < N; i++) {
          const y = 1 - (i / (N - 1)) * 2;
          const r = Math.sqrt(1 - y * y);
          const th = i * 2.399963;
          pos[i * 3] = Math.cos(th) * r;
          pos[i * 3 + 1] = y;
          pos[i * 3 + 2] = Math.sin(th) * r;
        }
        const g = withRnd(new T.BufferGeometry().setAttribute('position', new T.BufferAttribute(pos, 3)));
        const mat = mkMat(2.6, 0.16, false);
        const pts = new T.Points(g, mat);
        s.group.add(pts);
        const ring = new T.Mesh(
          new T.TorusGeometry(1.55, 0.005, 6, 260),
          new T.MeshBasicMaterial({ color: new T.Color(ACCENT), transparent: true, opacity: 0.6 })
        );
        ring.rotation.set(1.2, 0.3, 0);
        const ring2 = new T.Mesh(
          new T.TorusGeometry(1.9, 0.004, 6, 260),
          new T.MeshBasicMaterial({ color: new T.Color(VIOLET), transparent: true, opacity: 0.45 })
        );
        ring2.rotation.set(1.9, -0.5, 0.4);
        const moon = new T.Mesh(new T.SphereGeometry(0.045, 16, 16), new T.MeshBasicMaterial({ color: new T.Color(ACCENT) }));
        ring.add(moon);
        s.group.add(ring, ring2);
        s.layout = (asp, W, H) => {
          if (asp > 1.15) {
            s.group.position.set(W * 0.23, 0.15, 0);
            s.group.scale.setScalar(1.3);
          } else {
            s.group.position.set(0, -H * 0.2, 0);
            s.group.scale.setScalar(Math.min(1.1, W * 0.42));
          }
        };
        s.update = (t, m) => {
          mat.uniforms.uTime.value = t;
          pts.rotation.y = t * 0.12 + m.x * 0.5;
          pts.rotation.x = m.y * 0.35;
          ring.rotation.z = t * 0.25;
          ring2.rotation.z = -t * 0.18;
          moon.position.set(Math.cos(t * 1.1) * 1.55, Math.sin(t * 1.1) * 1.55, 0);
        };
      });

      // AI: 3D agent network with travelling packets
      makeScene('gl-ai', (s) => {
        const agents: THREE.Vector3[] = [];
        for (let k = 0; k < 3; k++) {
          const a = (k / 3) * Math.PI * 2;
          agents.push(new T.Vector3(Math.cos(a) * 1.25, Math.sin(a * 2) * 0.25, Math.sin(a) * 1.25));
        }
        const sats: THREE.Vector3[] = [];
        const SN = small ? 26 : 44;
        for (let i = 0; i < SN; i++) {
          const u = Math.random() * 2 - 1;
          const th = Math.random() * Math.PI * 2;
          const r = 2 + Math.random() * 0.6;
          const q = Math.sqrt(1 - u * u);
          sats.push(new T.Vector3(Math.cos(th) * q * r, u * r * 0.7, Math.sin(th) * q * r));
        }
        const center = new T.Vector3(0, 0, 0);
        const bigPos = [0, 0, 0];
        agents.forEach((v) => bigPos.push(v.x, v.y, v.z));
        const bigMat = mkMat(15, 0, true);
        s.group.add(new T.Points(withRnd(new T.BufferGeometry().setAttribute('position', new T.Float32BufferAttribute(bigPos, 3))), bigMat));
        const satPos: number[] = [];
        sats.forEach((v) => satPos.push(v.x, v.y, v.z));
        const satMat = mkMat(5, 0.04, false);
        s.group.add(new T.Points(withRnd(new T.BufferGeometry().setAttribute('position', new T.Float32BufferAttribute(satPos, 3))), satMat));

        const near = (v: THREE.Vector3) => {
          let bi = 0;
          let bd = 1e9;
          agents.forEach((a, i) => {
            const d = a.distanceTo(v);
            if (d < bd) {
              bd = d;
              bi = i;
            }
          });
          return bi;
        };
        const links: Array<[number, number]> = [];
        const hub: number[] = [];
        agents.forEach((a) => hub.push(0, 0, 0, a.x, a.y, a.z));
        const lp: number[] = [];
        sats.forEach((v, i) => {
          const ai = near(v);
          const a = agents[ai];
          lp.push(a.x, a.y, a.z, v.x, v.y, v.z);
          links.push([ai, i]);
          for (let j = i + 1; j < sats.length; j++) {
            if (v.distanceTo(sats[j]) < 0.95) lp.push(v.x, v.y, v.z, sats[j].x, sats[j].y, sats[j].z);
          }
        });
        s.group.add(
          new T.LineSegments(
            new T.BufferGeometry().setAttribute('position', new T.Float32BufferAttribute(hub, 3)),
            new T.LineBasicMaterial({ color: new T.Color(ACCENT), transparent: true, opacity: 0.7 })
          ),
          new T.LineSegments(
            new T.BufferGeometry().setAttribute('position', new T.Float32BufferAttribute(lp, 3)),
            new T.LineBasicMaterial({ color: new T.Color('#8F86FF'), transparent: true, opacity: 0.22 })
          )
        );

        const PK = small ? 14 : 24;
        const packets = Array.from({ length: PK }, (_, i) => {
          const l = links[i % links.length];
          const toHub = i % 3 === 0;
          return {
            a: toHub ? center : agents[l[0]],
            b: toHub ? agents[l[0]] : sats[l[1]],
            t: Math.random(),
            sp: 0.25 + Math.random() * 0.35,
            back: Math.random() < 0.5
          };
        });
        const pkPos = new Float32Array(PK * 3);
        const pkG = withRnd(new T.BufferGeometry().setAttribute('position', new T.BufferAttribute(pkPos, 3)));
        const pkMat = mkMat(8, 0, true);
        s.group.add(new T.Points(pkG, pkMat));

        const tmp = new T.Vector3();
        let last = 0;
        s.layout = (asp, W, H) => {
          if (asp > 1.15) {
            s.group.position.set(W * 0.27, H * 0.18, -0.5);
            s.group.scale.setScalar(0.95);
          } else {
            s.group.position.set(0, H * 0.3, -1);
            s.group.scale.setScalar(0.7);
          }
        };
        s.update = (t, m) => {
          const dt = Math.min(0.05, t - last);
          last = t;
          [bigMat, satMat, pkMat].forEach((mm) => (mm.uniforms.uTime.value = t));
          s.group.rotation.y = t * 0.15 + m.x * 0.4;
          s.group.rotation.x = 0.25 + m.y * 0.2;
          packets.forEach((p, i) => {
            p.t += dt * p.sp;
            if (p.t > 1) {
              p.t = 0;
              p.back = !p.back;
            }
            tmp.copy(p.back ? p.b : p.a).lerp(p.back ? p.a : p.b, p.t);
            pkPos[i * 3] = tmp.x;
            pkPos[i * 3 + 1] = tmp.y;
            pkPos[i * 3 + 2] = tmp.z;
          });
          pkG.attributes.position.needsUpdate = true;
        };
      });

      // CONTACT: particle torus knot
      makeScene('gl-contact', (s) => {
        const src = new T.TorusKnotGeometry(1, 0.34, small ? 160 : 280, small ? 18 : 28);
        const g = withRnd(new T.BufferGeometry().setAttribute('position', src.attributes.position.clone()));
        src.dispose();
        const mat = mkMat(2.4, 0.1, false);
        const pts = new T.Points(g, mat);
        s.group.add(pts);
        s.layout = (asp, W, H) => {
          if (asp > 1.15) {
            s.group.position.set(W * 0.2, -H * 0.04, -0.5);
            s.group.scale.setScalar(Math.min(1.1, H * 0.3));
          } else {
            s.group.position.set(W * 0.12, -H * 0.02, -1);
            s.group.scale.setScalar(Math.min(0.85, W * 0.3));
          }
        };
        s.update = (t, m) => {
          mat.uniforms.uTime.value = t;
          pts.rotation.x = t * 0.15 + m.y * 0.4;
          pts.rotation.y = t * 0.22 + m.x * 0.5;
        };
      });

      const clock = new T.Clock();
      const frozenT = 2.0;
      let frame = 0;
      const loop = () => {
        if (!alive) return;
        raf = requestAnimationFrame(loop);
        frame++;
        const moving = !reduce;
        if (!moving && frame % 20 !== 0) return;
        const t = moving ? clock.getElapsedTime() + 2 : frozenT;
        mouse.x += (mouse.tx - mouse.x) * 0.06;
        mouse.y += (mouse.ty - mouse.y) * 0.06;
        if (moving) {
          root.style.setProperty('--mx', mouse.x.toFixed(3));
          root.style.setProperty('--my', mouse.y.toFixed(3));
        }
        const m = moving ? mouse : { x: 0, y: 0 };
        scenes.forEach((s) => {
          if (!s.visible || !resize(s)) return;
          s.update?.(t, m);
          s.renderer.render(s.scene, s.camera);
        });
      };
      loop();
    });

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      cleanup.forEach((f) => {
        try {
          f();
        } catch {}
      });
    };
  }, []);

  return null;
}
