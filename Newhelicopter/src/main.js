import "./style.css";
//import * as dat from 'dat.gui';
import {
    AmbientLight,
    BoxGeometry,
    DirectionalLight,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    OrbitControls,
    THREE,
    GLTFLoader,
} from "../library.js";


 // Debug
//   const gui = new dat.GUI({ width: 400});        
//   gui.hide();

/* DOM access */
const canvas = document.getElementById("scene");

/* Global Constants */
const scene = new Scene();
const camera = new PerspectiveCamera(
    60,
    canvas.width / canvas.height,
    0.1,
    1000000,
);

const renderer = new WebGLRenderer({
    canvas,
});

const controls = new OrbitControls(camera, canvas);

/* Lighting */
const ambientLight = new AmbientLight(0xffffff, 0.7);
const directionalLight = new DirectionalLight(0xffffff, 0.4);
directionalLight.position.set(100, 100, 10);
scene.add(ambientLight, directionalLight);



const textureLoader = new THREE.TextureLoader();
const textureUrls = [
   '../skybox/skybox3/posx.jpg',
   '../skybox/skybox3/negx.jpg',
   '../skybox/skybox3/posy.jpg',
   '../skybox/skybox3/negy.jpg',
   '../skybox/skybox3/posz.jpg',
   '../skybox/skybox3/negz.jpg',
   
];
const texturePromises = textureUrls.map((url) => textureLoader.loadAsync(url));

const skyboxWidth = 2000;
const skyboxHeight = 2000;
const skyboxDepth = 2000;

const skyboxGeometry = new THREE.BoxGeometry(skyboxWidth, skyboxHeight, skyboxDepth);

Promise.all(texturePromises).then((textures) => {
  const skyboxMaterial = textures.map((texture) => {

    // Calculate the scale factors for width and height
    const scaleX = skyboxWidth / texture.image.width;
    const scaleY = skyboxHeight / texture.image.height;
  
    // Set the texture's repeat property to scale it
    texture.repeat.set(scaleX, scaleY);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  
    return new THREE.MeshBasicMaterial({ map: texture });
  });
  
  skyboxMaterial.forEach((material) => {
    material.side = THREE.BackSide;
  });
  
  const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
  scene.add(skybox);
});












//new model
  // model
//   const heli = new THREE.Object3D();
//   const loade = new OBJLoader();
//   loade.load("static/models/Helicopter/Heli.obj", (parent) => {
//       console.log("Airplane model loaded successfully:", parent);
//       heli.add(parent)
//       //heli.position.set(0,0,0)
//       group.add(heli);
//   }
//   )
//   const mainrotor = new THREE.Object3D();
//   loade.load("static/models/Helicopter/mainrotor.obj", (parent) => {
//   mainrotor.add(parent)
//   group.add(mainrotor);
//   }
//   )

//   const tailrotor = new THREE.Object3D();
//   loade.load("static/models/Helicopter/tailrotor.obj", (parent) => {
//       console.log("Airplane model loaded successfully:", parent);
//       tailrotor.add(parent)
//       //tailrotor.position.set(0,0,0)
//       group.add(tailrotor);
//   }
//   )






//   //Debug
//   gui.add(group.position, 'y', -3, 3, 0.01);
//   // gui.add(cube1.position, 'y', -3, 3, 0.01);
//    gui.add(group.position, 'x').min(-3).max(3).step(0.01);
//    gui.add(group.position, 'z', -3, 3, 0.01);
//    gui.add(group, 'visible');
//    //gui.add(group.mainrotor.rotation,) ;
//    gui.add(parameters, 'spin');












//Helicopter Model


const loader = new GLTFLoader()
loader.load(
    'static/models/Helicopter/1strotor.glb',
    
    (gltf) => {
        scene.add(gltf.scene)
    }
)
loader.load(
    'static/models/Helicopter/2ndrotor.glb',
    
    (gltf) => {
        scene.add(gltf.scene)
    }
)
loader.load(
    'static/models/Helicopter/helbody.glb',
    
    (gltf) => {
        scene.add(gltf.scene)
    }
)



/* Functions */
const handleWindowResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    renderer.setSize(canvas.width, canvas.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();

    controls.update();
};

const init = () => {
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2;

    camera.position.set(0, 1, 5);
    controls.update();

    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("load", handleWindowResize);
};



const render = () => {
    // Calculate the time value between 0 and 1 for the transition
    const time = (Date.now() % 2000) / 2000;

    // Set the clear color based on the time value
    renderer.setClearColor(0xffffffff);
    controls.update();
    renderer.render(scene, camera);
};

export const main = () => {
    //let lastTime = new Date().getTime();

    const loop = () => {
        window.requestAnimationFrame(loop);
        /*const currentTime = new Date().getTime();
        const delta = currentTime - lastTime;
        lastTime = currentTime;

        update(delta);*/
        render();
    };

    init();
    loop();
};

/* Main program (function calls) */
main();
