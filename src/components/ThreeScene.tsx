import React, {useEffect, useRef} from "react";
import * as THREE                 from "three";

import {AsciiEffect} from "three/addons/effects/AsciiEffect.js";
import {OBJLoader}   from "three/addons/loaders/OBJLoader.js";


const ThreeScene: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {


            let camera: THREE.PerspectiveCamera,
                scene: THREE.Scene<THREE.Object3DEventMap>, renderer: THREE.WebGLRenderer, effect: AsciiEffect;

            let sphere: THREE.Object3D<THREE.Object3DEventMap>;

            const start = Date.now();

            init().then();


            async function init() {
                camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
                camera.position.z = 300;

                scene = new THREE.Scene();
                scene.background = new THREE.Color(0, 0, 0);

                const pointLight1 = new THREE.PointLight(0xffffff, 3, 0, 0);
                pointLight1.position.set(500, 500, 500);
                scene.add(pointLight1);

                const pointLight2 = new THREE.PointLight(0xffffff, 1, 0, 0);
                pointLight2.position.set(-500, -500, -500);
                scene.add(pointLight2);

                const loader = new OBJLoader();
                sphere = await loader.loadAsync("/sr2planet.obj");
                sphere.scale.set(20, 20, 20);
                sphere.rotation.x = 0.5;
                sphere.rotation.z = 0.2;

                // sphere = new THREE.Mesh(new THREE.SphereGeometry(200, 20, 10), new
                // THREE.MeshPhongMaterial({flatShading: true}));
                scene.add(sphere);


                renderer = new THREE.WebGLRenderer();
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setAnimationLoop(animate);

                effect = new AsciiEffect(renderer, ' .:-+*=%@#', {invert: true});
                effect.setSize(window.innerWidth, window.innerHeight);
                effect.domElement.style.color = 'white';
                effect.domElement.style.backgroundColor = 'black';

                // Special case: append effect.domElement, instead of renderer.domElement.
                // AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.

                document.body.appendChild(effect.domElement);

                window.addEventListener('resize', onWindowResize);

            }

            function onWindowResize() {

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize(window.innerWidth, window.innerHeight);
                effect.setSize(window.innerWidth, window.innerHeight);

            }

            //

            function animate() {

                const timer = Date.now() - start;

                sphere.rotation.y = timer * -0.0002;

                sphere.rotation.z = Math.sin(timer * 0.0007) * 0.1;

                effect.render(scene, camera);

            }
        }
    }, []);

    return <div ref={containerRef}/>;
}

export default ThreeScene;