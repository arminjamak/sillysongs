import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ===== 3D Model Setup =====
const canvas = document.getElementById('canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // White background to blend with page

// Camera
const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
);
camera.position.set(0, 2, 5);

// Renderer
const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas,
    antialias: true 
});
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

// Lights - Brighter lighting for better visibility
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 1.0);
fillLight.position.set(-5, 0, -5);
scene.add(fillLight);

const backLight = new THREE.DirectionalLight(0xffffff, 0.8);
backLight.position.set(0, 5, -5);
scene.add(backLight);

const topLight = new THREE.DirectionalLight(0xffffff, 0.6);
topLight.position.set(0, 10, 0);
scene.add(topLight);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = false; // Disable zoom
controls.autoRotate = true;
controls.autoRotateSpeed = 2;

// Load 3D Model with Draco compression support
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
dracoLoader.setDecoderConfig({ type: 'js' });

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
let model;

loader.load(
    'dinosaur.glb',
    (gltf) => {
        model = gltf.scene;
        
        // Center and scale the model properly
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Scale to fit nicely in view - 25% smaller
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3 / maxDim; // Reduced from 4 to 3 (25% smaller)
        model.scale.multiplyScalar(scale);
        
        // Center the model at origin
        box.setFromObject(model);
        const newCenter = box.getCenter(new THREE.Vector3());
        model.position.sub(newCenter);
        
        // Enable shadows
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        
        scene.add(model);
        console.log('✅ Model loaded successfully!');
    },
    (progress) => {
        const percent = (progress.loaded / progress.total * 100).toFixed(0);
        console.log('Loading model:', percent + '%');
    },
    (error) => {
        console.error('❌ Error loading model:', error);
        
        // Try to provide helpful error message
        if (error.message) {
            console.error('Error details:', error.message);
        }
    }
);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
});

// ===== Audio Player =====
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');

// SVG icons with rounded corners
const playIcon = `<svg width="32" height="32" viewBox="0 0 24 24" fill="white" style="margin-left: -6px;">
    <path d="M8 5.14v13.72L19 12z" stroke="white" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
</svg>`;

const pauseIcon = `<svg width="32" height="32" viewBox="0 0 24 24" fill="white" style="margin-left: 0;">
    <rect x="6" y="4" width="4" height="16" rx="2" ry="2"/>
    <rect x="14" y="4" width="4" height="16" rx="2" ry="2"/>
</svg>`;

// Set initial icon
playPauseBtn.innerHTML = playIcon;

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = pauseIcon;
    } else {
        audio.pause();
        playPauseBtn.innerHTML = playIcon;
    }
});

// Reset button when audio ends
audio.addEventListener('ended', () => {
    playPauseBtn.innerHTML = playIcon;
});
