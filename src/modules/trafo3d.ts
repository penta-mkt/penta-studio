import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { t3dState } from "./t3dState";
import {
  AmbientLight,
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  Box3,
  CanvasTexture,
  CircleGeometry,
  Color,
  DirectionalLight,
  DoubleSide,
  Group,
  HemisphereLight,
  Material,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Plane,
  Scene,
  SRGBColorSpace,
  MeshBasicMaterial,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

gsap.registerPlugin(ScrollTrigger);

/**
 * Interactive 3D equipment: it materialises, assembles piece by piece as
 * you scroll (the model ships with its own "armado" animation), and once
 * built it can be spun with the mouse / finger.
 */

interface Loaded {
  root: Group;
  mixer: AnimationMixer;
  action: AnimationAction;
  duration: number;
  height: number;
  radius: number;
  materials: Material[];
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (v: number) => v * v * (3 - 2 * v);

export function mountTrafo3D(reduce: boolean): void {
  const section = document.querySelector<HTMLElement>("[data-t3d]");
  const host = document.querySelector<HTMLElement>("[data-t3d-canvas]");
  if (!section || !host) return;

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    section.classList.add("is-nogl");
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  renderer.localClippingEnabled = true;
  host.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(28, 1, 0.1, 100);
  scene.add(new HemisphereLight(0xffffff, 0xcfc8d8, 1.25));
  scene.add(new AmbientLight(0xffffff, 0.35));
  const key = new DirectionalLight(0xffffff, 2.1);
  key.position.set(-3, 6, 4);
  scene.add(key);
  const rim = new DirectionalLight(0xbfd8ff, 0.9);
  rim.position.set(4, 3, -4);
  scene.add(rim);

  // pivot we rotate; model sits inside it
  const pivot = new Group();
  scene.add(pivot);

  // soft contact shadow
  const sc = document.createElement("canvas");
  sc.width = sc.height = 128;
  const sctx = sc.getContext("2d")!;
  const grd = sctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, "rgba(18,26,33,0.34)");
  grd.addColorStop(1, "rgba(18,26,33,0)");
  sctx.fillStyle = grd;
  sctx.fillRect(0, 0, 128, 128);
  const shadow = new Mesh(
    new CircleGeometry(1, 48),
    new MeshBasicMaterial({ map: new CanvasTexture(sc), transparent: true, depthWrite: false })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.002;
  scene.add(shadow);

  const clip = new Plane(new Vector3(0, -1, 0), 0);

  const loader = new GLTFLoader();

  const urls: Record<string, string> = {
    t40: "./media/3d/t40.glb",
    t208: "./media/3d/t208.glb",
    t230: "./media/3d/t230.glb",
  };
  const cache = new Map<string, Promise<Loaded>>();

  const load = (id: string): Promise<Loaded> => {
    if (cache.has(id)) return cache.get(id)!;
    const p = new Promise<Loaded>((resolve, reject) => {
      const embedded = (window as unknown as { __T3D?: Record<string, string> }).__T3D?.[id];
      const onLoad = (gltf: GLTF) => {
          const root = gltf.scene;
          const materials: Material[] = [];
          root.traverse((o) => {
            const m = o as Mesh;
            if (!m.isMesh) return;
            const old = m.material as MeshStandardMaterial;
            const mat = new MeshStandardMaterial({
              color: old.color ? old.color.clone() : new Color(0xcccccc),
              roughness: 0.55,
              metalness: 0.08,
              flatShading: true,
              side: DoubleSide,
              clippingPlanes: [clip],
            });
            m.material = mat;
            materials.push(mat);
          });
          const clipData: AnimationClip = gltf.animations[0];
          const mixer = new AnimationMixer(root);
          const action = mixer.clipAction(clipData);
          action.play();
          const duration = clipData.duration;

          // measure the assembled pose and the exploded pose
          mixer.setTime(duration);
          root.updateMatrixWorld(true);
          const full = new Box3().setFromObject(root);
          mixer.setTime(0);
          root.updateMatrixWorld(true);
          const open = new Box3().setFromObject(root);
          const size = full.getSize(new Vector3());
          const scale = 3.2 / Math.max(size.x, size.z * 1.4, size.y * 0.9);
          root.scale.setScalar(scale);
          const c = full.getCenter(new Vector3());
          root.position.set(-c.x * scale, -full.min.y * scale, -c.z * scale);
          resolve({
            root,
            mixer,
            action,
            duration,
            height: Math.max(full.max.y, open.max.y) * scale,
            radius: Math.max(size.x, size.z) * 0.5 * scale,
            materials,
          });
      };
      if (embedded) {
        // preview file: the model travels inside the page, no network request needed
        try {
          const bin = atob(embedded.slice(embedded.indexOf(",") + 1));
          const buf = new Uint8Array(bin.length);
          for (let k = 0; k < bin.length; k++) buf[k] = bin.charCodeAt(k);
          loader.parse(buf.buffer, "", onLoad, reject);
        } catch (err) {
          reject(err);
        }
      } else {
        loader.load(urls[id], onLoad, undefined, reject);
      }
    });
    cache.set(id, p);
    return p;
  };

  // ---------------------------------------------------------------- state
  let current: Loaded | null = null;
  let currentId = "t208";
  let manual: { v: number } | null = null; // replay when switching model
  let yaw = -0.7;
  let pitch = 0.16;
  let targetYaw = yaw;
  let targetPitch = pitch;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let idleAt = 0;
  let visible = false;
  let ready = false;

  const setModel = (m: Loaded) => {
    if (current) pivot.remove(current.root);
    current = m;
    pivot.add(m.root);
    shadow.scale.setScalar(m.radius * 1.05);
    fit();
  };

  const fit = () => {
    const w = host.clientWidth || 1;
    const h = host.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const hgt = current ? current.height : 3;
    const rad = current ? current.radius : 1.6;
    const fov = (camera.fov * Math.PI) / 180;
    const needH = (hgt * 1.16) / (2 * Math.tan(fov / 2));
    const needW = (rad * (w > 1000 ? 3.3 : 1.9)) / (2 * Math.tan(fov / 2) * camera.aspect);
    const dist = Math.max(needH, needW) + rad;
    camera.position.set(0, hgt * 0.55 + dist * 0.16, dist);
    camera.lookAt(0, hgt * 0.4, 0);
    if (w > 1000) camera.setViewOffset(w, h, -w * 0.16, 0, w, h);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(fit).observe(host);

  // ---------------------------------------------------------------- input
  const el = renderer.domElement;
  el.addEventListener("pointerdown", (e) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    el.setPointerCapture(e.pointerId);
    section.classList.add("is-grabbing", "is-touched");
  });
  el.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    targetYaw += (e.clientX - lastX) * 0.009;
    targetPitch = clamp(targetPitch + (e.clientY - lastY) * 0.004, -0.15, 0.55);
    lastX = e.clientX;
    lastY = e.clientY;
    idleAt = performance.now();
  });
  const stop = () => {
    dragging = false;
    section.classList.remove("is-grabbing");
    idleAt = performance.now();
  };
  el.addEventListener("pointerup", stop);
  el.addEventListener("pointercancel", stop);

  // ---------------------------------------------------------------- frame
  const render = (now: number) => {
    requestAnimationFrame(render);
    if (!visible || !current) return;
    const scrollP = reduce ? 1 : t3dState.p;

    // assembly amount 0..1
    const sweep = reduce ? 1 : smooth(clamp(scrollP / 0.2));
    const asm = manual ? manual.v : smooth(clamp((scrollP - 0.18) / 0.64));
    current.mixer.setTime(Math.min(asm * current.duration, current.duration - 0.001));

    // clip sweep: the object is revealed bottom-to-top
    clip.constant = (current.height * 1.1) * (manual ? 1 : sweep);

    // slow orbit tied to scroll, then free spin + gentle idle drift
    if (!dragging && now - idleAt > 1600 && scrollP > 0.9) targetYaw += 0.0032;
    const scrollYaw = reduce ? 0 : -0.7 + scrollP * 1.15;
    const wantYaw = scrollP < 0.9 && !section.classList.contains("is-touched") ? scrollYaw : targetYaw;
    if (scrollP < 0.9 && !section.classList.contains("is-touched")) targetYaw = scrollYaw;
    yaw += (wantYaw - yaw) * 0.09;
    pitch += (targetPitch - pitch) * 0.09;
    pivot.rotation.y = yaw;
    pivot.rotation.x = 0;
    camera.position.y = (current.height * 0.55) + Math.sin(pitch) * current.height * 0.9;
    camera.lookAt(0, current.height * 0.4, 0);
    shadow.material.opacity = 0.35 + 0.65 * (manual ? 1 : sweep);
    renderer.render(scene, camera);
  };
  requestAnimationFrame(render);

  new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => (visible = e.isIntersecting));
    },
    { rootMargin: "300px 0px" }
  ).observe(section);

  const boot = () => {
    if (ready) return;
    ready = true;
    section.classList.add("is-loading");
    // if nothing arrives (blocked viewer, slow connection) show the still image instead of a spinner
    const giveUp = window.setTimeout(() => {
      if (!section.classList.contains("is-ready")) {
        section.classList.remove("is-loading");
        section.classList.add("is-nogl");
      }
    }, 25000);
    load(currentId)
      .then((m) => {
        setModel(m);
        window.clearTimeout(giveUp);
        section.classList.remove("is-loading");
        section.classList.remove("is-nogl");
        section.classList.add("is-ready");
        ScrollTrigger.refresh();
      })
      .catch(() => {
        section.classList.remove("is-loading");
        section.classList.add("is-nogl");
      });
  };

  // ---------------------------------------------------------------- model picker
  const pills = Array.from(section.querySelectorAll<HTMLButtonElement>("[data-t3d-pick]"));
  pills.forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = btn.dataset.t3dPick!;
      if (id === currentId) return;
      currentId = id;
      pills.forEach((b) => b.classList.toggle("is-on", b === btn));
      section.classList.add("is-loading");
      load(id)
        .then((m) => {
          setModel(m);
          section.classList.remove("is-loading");
          manual = { v: 0 };
          gsap.to(manual, { v: 1, duration: 3.4, ease: "power2.inOut", onComplete: () => (manual = null) });
        })
        .catch(() => {
          cache.delete(id);
          section.classList.remove("is-loading");
        });
    })
  );

  boot();
}
