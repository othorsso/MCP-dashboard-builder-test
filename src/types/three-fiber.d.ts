import type * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      boxGeometry: any;
      planeGeometry: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      ambientLight: any;
      pointLight: any;
      directionalLight: any;
      hemisphereLight: any;
      spotLight: any;
      lineSegments: any;
      lineBasicMaterial: any;
      bufferGeometry: any;
      bufferAttribute: any;
      primitive: any;
      color: any;
      fog: any;
      perspectiveCamera: any;
      gridHelper: any;
    }
  }
}

export {};
