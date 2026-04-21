/**
 * WarehouseViewer - vanilla Three.js (no @react-three/fiber).
 * R3F 8.x does not mount under React 19, so we drive the renderer
 * directly from useEffect / useRef, exactly like plain DOM code.
 */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { WarehouseLocation } from '../types/warehouse';

const COLS  = 8;
const BOX_W = 1.8;
const BOX_H = 1.4;
const BOX_D = 1.8;
const STEP  = 2.2;

function colorForFill(f: number): number {
  if (f <= 0)   return 0x3b82f6;
  if (f < 0.25) return 0x22c55e;
  if (f < 0.60) return 0xeab308;
  if (f < 0.85) return 0xf97316;
  return          0xef4444;
}

export function WarehouseViewer({
  locations,
  isLoading,
}: {
  locations: WarehouseLocation[];
  isLoading: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || locations.length === 0) return;

    const rows = Math.ceil(locations.length / COLS);
    const cx   = ((COLS - 1) * STEP) / 2;
    const cz   = ((rows  - 1) * STEP) / 2;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1628);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      500,
    );
    camera.position.set(cx, rows * STEP * 0.9, cz + rows * STEP * 0.9);
    camera.lookAt(cx, 0, cz);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const sun = new THREE.DirectionalLight(0xffffff, 1.6);
    sun.position.set(cx + 10, 40, cz + 15);
    scene.add(sun);
    const fill2 = new THREE.DirectionalLight(0x8ab4f8, 0.5);
    fill2.position.set(cx - 10, 20, cz - 10);
    scene.add(fill2);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(COLS * STEP + 10, rows * STEP + 10),
      new THREE.MeshStandardMaterial({ color: 0x0c1a2e }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(cx, -0.02, cz);
    scene.add(floor);

    const gridSize = Math.max(COLS, rows) * STEP + 8;
    const gridHelper = new THREE.GridHelper(gridSize, Math.round(gridSize), 0x1e3a5f, 0x1e293b);
    (gridHelper.material as THREE.LineBasicMaterial).opacity = 0.4;
    (gridHelper.material as THREE.LineBasicMaterial).transparent = true;
    gridHelper.position.set(cx, 0, cz);
    scene.add(gridHelper);

    const clickable: THREE.Mesh[] = [];

    locations.forEach((loc, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const fillLevel = loc.capacity > 0
        ? Math.min(1, loc.currentQuantity / loc.capacity)
        : 0;
      const hexColor = colorForFill(fillLevel);

      const group = new THREE.Group();
      group.position.set(col * STEP, 0, row * STEP);

      const box = new THREE.Mesh(
        new THREE.BoxGeometry(BOX_W, BOX_H, BOX_D),
        new THREE.MeshStandardMaterial({
          color: hexColor,
          emissive: new THREE.Color(hexColor),
          emissiveIntensity: 0.18,
          roughness: 0.4,
          metalness: 0.1,
        }),
      );
      box.position.y = BOX_H / 2;
      box.userData.locationId = loc.locationId;
      group.add(box);
      clickable.push(box);

      if (fillLevel > 0) {
        const bar = new THREE.Mesh(
          new THREE.BoxGeometry(BOX_W * fillLevel, 0.12, BOX_D),
          new THREE.MeshStandardMaterial({
            color: hexColor,
            emissive: new THREE.Color(hexColor),
            emissiveIntensity: 0.9,
          }),
        );
        bar.position.y = BOX_H + 0.07;
        group.add(bar);
      }

      scene.add(group);
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(cx, 0, cz);
    controls.minDistance   = 3;
    controls.maxDistance   = 300;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.update();

    const raycaster = new THREE.Raycaster();
    const pointer   = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      pointer.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(clickable, false);
      if (hits.length > 0) {
        const id = hits[0].object.userData.locationId as string;
        window.dispatchEvent(
          new CustomEvent('warehouse-location-selected', { detail: { locationId: id } }),
        );
      }
    };
    container.addEventListener('click', onClick);

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      pointer.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(clickable, false);
      renderer.domElement.style.cursor = hits.length > 0 ? 'pointer' : 'default';
    };
    container.addEventListener('mousemove', onMove);

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener('click', onClick);
      container.removeEventListener('mousemove', onMove);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [locations]);

  if (isLoading) {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a1628', color: '#94a3b8', fontSize: 18 }}>
        Loading Warehouse 24
      </div>
    );
  }

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0a1628' }}>
      <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />

      <div style={{ position: 'absolute', bottom: 16, right: 16, background: 'rgba(10,22,40,0.92)', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', fontSize: 12, display: 'flex', flexDirection: 'column', gap: 5, pointerEvents: 'none' }}>
        <div style={{ fontWeight: 600, color: '#94a3b8', marginBottom: 2 }}>Fill level</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 12, height: 12, borderRadius: 2, background: '#3b82f6', display: 'inline-block' }} /><span style={{ color: '#cbd5e1' }}>Empty</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 12, height: 12, borderRadius: 2, background: '#22c55e', display: 'inline-block' }} /><span style={{ color: '#cbd5e1' }}>Low &lt;25%</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 12, height: 12, borderRadius: 2, background: '#eab308', display: 'inline-block' }} /><span style={{ color: '#cbd5e1' }}>Medium</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 12, height: 12, borderRadius: 2, background: '#f97316', display: 'inline-block' }} /><span style={{ color: '#cbd5e1' }}>High &gt;60%</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 12, height: 12, borderRadius: 2, background: '#ef4444', display: 'inline-block' }} /><span style={{ color: '#cbd5e1' }}>Full</span></div>
      </div>

      <div style={{ position: 'absolute', bottom: 16, left: 16, background: 'rgba(10,22,40,0.92)', border: '1px solid #1e3a5f', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: '#64748b', pointerEvents: 'none' }}>
        Left-drag: rotate | Scroll: zoom | Right-drag: pan
      </div>
    </div>
  );
}
