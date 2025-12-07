import React, {useEffect, useRef} from "react";
import * as THREE                 from "three";

import {AsciiEffect} from "three/addons/effects/AsciiEffect.js";
import {OBJLoader}   from "three/addons/loaders/OBJLoader.js";

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let camera: THREE.PerspectiveCamera,
        scene: THREE.Scene<THREE.Object3DEventMap>,
        renderer: THREE.WebGLRenderer,
        effect: AsciiEffect;

      let sphere: THREE.Object3D<THREE.Object3DEventMap>;

      const stars: THREE.Object3D<THREE.Object3DEventMap>[] = [];

      const start = Date.now();

      init().then();

      async function init() {
        camera = new THREE.PerspectiveCamera(
          70,
          window.innerWidth / window.innerHeight,
          1,
          1000,
        );
        camera.position.z = 300;

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0, 0, 0);

        const pointLight1 = new THREE.PointLight(0xffffff, 3, 0, 0);
        pointLight1.position.set(300, 300, 300);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 1, 0, 0);
        pointLight2.position.set(-500, -500, -500);
        scene.add(pointLight2);

        const loader = new OBJLoader();
        sphere = await loader.loadAsync("./sr2planet.obj");
        sphere.scale.set(20, 20, 20);
        sphere.rotation.x = 0.5;
        sphere.rotation.z = 0.2;

        for (let i = 0; i < 100; i++) {
          stars.push(
            new THREE.Mesh(
              new THREE.SphereGeometry(6, 3, 2),
              new THREE.MeshBasicMaterial({ color: 0xffffff }),
            ),
          );
        }

        // stars.fill(new THREE.Mesh(new THREE.SphereGeometry(6, 3, 2), new THREE.MeshBasicMaterial({color:
        // 0xffffff})), 0, 300);

        stars.forEach((star) => {
          star.position.x = Math.random() * 2000 - 1000;
          star.position.y = Math.random() * 2000 - 1000;
          star.position.z = Math.random() * 2000 - 1000;
          scene.add(star);
        });

        // sphere = new THREE.Mesh(new THREE.SphereGeometry(200, 20, 10), new
        // THREE.MeshPhongMaterial({flatShading: true}));
        scene.add(sphere);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setAnimationLoop(animate);

        effect = new AsciiEffect(renderer, " .,spencerraymond,", {
          invert: true,
        });
        effect.setSize(window.innerWidth, window.innerHeight);
        effect.domElement.style.color = "white";
        effect.domElement.style.position = "absolute";
        //renderer.domElement.style.position = "absolute";
        effect.domElement.className = "asciiEffect font-mono bg-gray-950";
        //renderer.domElement.className = "asciiEffect font-mono";

        // Special case: append effect.domElement, instead of renderer.domElement.
        // AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.

        document.body.appendChild(effect.domElement);
        //document.body.appendChild(renderer.domElement);

        window.addEventListener("resize", onWindowResize);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        //renderer.setSize(window.innerWidth, window.innerHeight);
        effect.setSize(window.innerWidth, window.innerHeight);
      }

      //

      function animate() {
        const timer = Date.now() - start;

        sphere.rotation.y = timer * -0.0002;

        sphere.rotation.z = Math.sin(timer * 0.0007) * 0.1;

        stars.forEach((star) => {
          star.scale.x =
            star.scale.y =
            star.scale.z =
              Math.sin(timer * 0.0007) * 0.1 + 0.9;
          star.position.x += Math.sin(timer * Math.random() * 0.00005) * 0.1;
          star.position.y += Math.sin(timer * Math.random() * 0.00005) * 0.1;
          star.position.z += Math.sin(timer * Math.random() * 0.00005) * 0.1;
          if (star.position.x > 500) {
            star.position.x = -900;
          }
          if (star.position.y > 300) {
            star.position.y = -900;
          }
          if (star.position.z > 300) {
            star.position.z = -900;
          }
        });

        effect.render(scene, camera);

        //renderer.render(scene, camera);
      }
    }
  }, []);

  return <div ref={containerRef} />;
};

export default ThreeScene;
