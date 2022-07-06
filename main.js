import './style.css'
import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'

//popup
const popup = document.querySelector(".instructions-container")
const popupBtn  = document.querySelector(".instructions__btn")

popupBtn.addEventListener("click", () => {
    popup.style.display = "none"
})


const gui = new dat.GUI({
    width: 400
}) 

const parameters = {
    color: 0xbc74ec
}

// colorpallette knop
const guiBtn = document.querySelector('.gui')
let visible = false
gui.hide()

guiBtn.onclick = () =>
{
    if(!visible)
    {
        gui.show()
        visible = true
    }
    else
    {
        gui.hide()
        visible = false
    }
}

// setup
const loadingBarElement = document.querySelector('.loading-bar')
const loadingCurtain = document.querySelector('.loading-curtain')
const loadingManager = new THREE.LoadingManager(
    // loader
    () =>
    {
        window.setTimeout(() =>
        {
            loadingBarElement.classList.add('ended')
            loadingBarElement.style.transform = 'scaleX(0)'
            loadingCurtain.style.opacity = '0'
            gsap.from('.loading-curtain', {opacity: 1, duration: 1, ease: 'ease-in'})
            gsap.to('.loading-curtain', {opacity: 0, duration: 1, ease: 'ease-in'})
        }, 500)
        window.setTimeout(() =>
        {  
            loadingCurtain.style.display = 'none'
        }, 600)

    },
    (itemUrl, itemsLoaded, itemsTotal) =>
    {
        // Progressie van laden -> laadbalk
        const progressRatio = itemsLoaded / itemsTotal
        loadingBarElement.style.transform = `scaleX(${progressRatio})`
    }
)

// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager)

// model canvas
const canvas = document.querySelector('canvas.webgl')

// de scene
const scene = new THREE.Scene()


// Lights posities
const light1 = new THREE.PointLight(parameters.color, 10, 30)
light1.position.y = 22.27
light1.position.x = 28.66
scene.add(light1)

const light2 = new THREE.PointLight(parameters.color, 5, 30)
light2.position.x = -4.2
light2.position.y = 11
light2.position.z = 14.97
scene.add(light2)

const light3 = new THREE.PointLight(parameters.color, 5, 30)
light3.position.x = -12.41
light3.position.y = 18
light3.position.z = 36
scene.add(light3)

const light4 = new THREE.PointLight(parameters.color, 10, 30)
light4.position.x = -27.93
light4.position.y = 22.27
light4.position.z = -6.02
scene.add(light4)

const light5 = new THREE.PointLight(parameters.color, 10, 30)
light5.position.x = 4.93
light5.position.y = 22.27
light5.position.z = -15.15
scene.add(light5)

const light6 = new THREE.PointLight(parameters.color, 10, 30)
light6.position.x = 38.7
light6.position.y = 22.27
light6.position.z = -24.28
scene.add(light6)

const light7 = new THREE.PointLight(parameters.color, 10, 30)
light7.position.x = 53.3
light7.position.y = 25.92
light7.position.z = -24.28
scene.add(light7)

const light8 = new THREE.PointLight(parameters.color, 10, 30)
light8.position.x = 55.12
light8.position.y = 24.09
light8.position.z = 1.28
scene.add(light8)


// Light switch
const lightswitch = document.querySelector('.lights')
let power = true
lightswitch.addEventListener('click', () =>
{
    if(!power)
    {
        light1.intensity = 10
        light2.intensity = 5
        light3.intensity = 5
        light4.intensity = 10
        light5.intensity = 10
        light6.intensity = 10
        light7.intensity = 10
        light8.intensity = 10
        power = true
    }
    else
    {
        light1.intensity = 2
        light2.intensity = 2
        light3.intensity = 2
        light4.intensity = 2
        light5.intensity = 2
        light6.intensity = 2
        light7.intensity = 2
        light8.intensity = 2
        power = false
    }
})

// light controls
gui.addColor(parameters, 'color')
.onChange(() =>
{
    light1.color.set(parameters.color)
    light2.color.set(parameters.color)
    light3.color.set(parameters.color)
    light4.color.set(parameters.color)
    light5.color.set(parameters.color)
    light6.color.set(parameters.color)
    light7.color.set(parameters.color)
    light8.color.set(parameters.color)
})
const folder = gui.addFolder('light intensity')
folder.add(light1, 'intensity').min(0).max(20).step(0.001).name("light1 intensity")
folder.add(light2, 'intensity').min(0).max(20).step(0.001).name("light2 intensity")
folder.add(light3, 'intensity').min(0).max(20).step(0.001).name("light3 intensity")
folder.add(light4, 'intensity').min(0).max(20).step(0.001).name("light4 intensity")
folder.add(light5, 'intensity').min(0).max(20).step(0.001).name("light5 intensity")
folder.add(light6, 'intensity').min(0).max(20).step(0.001).name("light6 intensity")
folder.add(light7, 'intensity').min(0).max(20).step(0.001).name("light7 intensity")
folder.add(light8, 'intensity').min(0).max(20).step(0.001).name("light8 intensity")

// group all objects
const group = new THREE.Group()
group.add(light1, light2, light3, light4, light5, light6, light7, light8)

// add model to group 
gltfLoader.load(
    'colorV24.glb',
    (gltf) => 
    {
        group.add(gltf.scene)
    }
)

// Transparant box rond obstakels
const communityBox = new THREE.Mesh(
    new THREE.CircleBufferGeometry(1, 48),
    new THREE.MeshBasicMaterial(
        {
            color: "#8932CC",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
            
        }
    )
)
group.add(communityBox)
communityBox.position.x = 48.1
communityBox.position.y = 8
communityBox.position.z = 10 

const communityBoxLine = new THREE.Mesh(
    new THREE.ConeBufferGeometry(0.1, 4.5),
    new THREE.MeshBasicMaterial(
        {
            color: "#8932CC",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
            
        }
    )
)
group.add(communityBoxLine)
communityBoxLine.position.x = 48.1
communityBoxLine.position.y = 5
communityBoxLine.position.z = 10 
communityBoxLine.rotation.x = Math.PI / 1

const RailBox = new THREE.Mesh(
    new THREE.CircleBufferGeometry(1, 48),
    new THREE.MeshBasicMaterial(
        {
            color: "#8932CC",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
        }
    )
)
group.add(RailBox)
RailBox.position.x = 38.1
RailBox.position.y = 9
RailBox.position.z = -15.7

const railBoxLine = new THREE.Mesh(
    new THREE.ConeBufferGeometry(0.1, 4.5),
    new THREE.MeshBasicMaterial(
        {
            color: "#8932CC",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
            
        }
    )
)
group.add(railBoxLine)
railBoxLine.position.x = 38.1
railBoxLine.position.y = 6
railBoxLine.position.z = -15.7
railBoxLine.rotation.x = Math.PI / 1

const halfPipeBox = new THREE.Mesh(
    new THREE.CircleBufferGeometry(1, 48),
    new THREE.MeshBasicMaterial(
        {
            color: "#8932CC",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
        }
    )
)
group.add(halfPipeBox)
halfPipeBox.position.x = 65.24
halfPipeBox.position.y = 10
halfPipeBox.position.z = -14.47

const halfPipeBoxLine = new THREE.Mesh(
    new THREE.ConeBufferGeometry(0.1, 4.5),
    new THREE.MeshBasicMaterial(
        {
            color: "#8932CC",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
            
        }
    )
)
group.add(halfPipeBoxLine)
halfPipeBoxLine.position.x = 65.24
halfPipeBoxLine.position.y = 7
halfPipeBoxLine.position.z = -14.47
halfPipeBoxLine.rotation.x = Math.PI / 1

const ledgeBox = new THREE.Mesh(
    new THREE.CircleBufferGeometry(1, 48),
    new THREE.MeshBasicMaterial(
        {
            color: "#8932CC",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
        }
    )
)
group.add(ledgeBox)
ledgeBox.position.x = 37.85
ledgeBox.position.y = 10
ledgeBox.position.z = -25.38

const legdeBoxLine = new THREE.Mesh(
    new THREE.ConeBufferGeometry(0.1, 4.5),
    new THREE.MeshBasicMaterial(
        {
            color: "#8932CC",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
            
        }
    )
)
group.add(legdeBoxLine)
legdeBoxLine.position.x = 37.85
legdeBoxLine.position.y = 7
legdeBoxLine.position.z = -25.38
legdeBoxLine.rotation.x = Math.PI / 1


const pyramidBox = new THREE.Mesh(
    new THREE.CircleBufferGeometry(1, 48),
    new THREE.MeshBasicMaterial(
        {
            color: "#8932CC",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
        }
    )
)
group.add(pyramidBox)
pyramidBox.position.x = -5.35
pyramidBox.position.y = 10
pyramidBox.position.z = -4.04

const pyramidBoxLine = new THREE.Mesh(
    new THREE.ConeBufferGeometry(0.1, 4.5),
    new THREE.MeshBasicMaterial(
        {
            color: "#8932CC",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
            
        }
    )
)
group.add(pyramidBoxLine)
pyramidBoxLine.position.x = -5.35
pyramidBoxLine.position.y = 7
pyramidBoxLine.position.z = -4.04
pyramidBoxLine.rotation.x = Math.PI / 1


const stairRailBox = new THREE.Mesh(
    new THREE.CircleBufferGeometry(1, 48),
    new THREE.MeshBasicMaterial(
        {
            color: "#8932CC",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
        }
    )
)
group.add(stairRailBox)
stairRailBox.position.x = 31.16
stairRailBox.position.y = 10
stairRailBox.position.z = 14.21

const stairRailBoxLine = new THREE.Mesh(
    new THREE.ConeBufferGeometry(0.1, 4.5),
    new THREE.MeshBasicMaterial(
        {
            color: "#8932CC",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
        }
    )
)
group.add(stairRailBoxLine)
stairRailBoxLine.position.x = 31.16
stairRailBoxLine.position.y = 7
stairRailBoxLine.position.z = 14.21
stairRailBoxLine.rotation.x = Math.PI / 1


const stairBox = new THREE.Mesh(
    new THREE.CircleBufferGeometry(1, 48),
    new THREE.MeshBasicMaterial(
        {
            color: "#8932CC",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
        }
    )
)
group.add(stairBox)
stairBox.position.x = 23.34
stairBox.position.y = 10
stairBox.position.z = -5.35

const stairBoxLine = new THREE.Mesh(
    new THREE.ConeBufferGeometry(0.1, 4.5),
    new THREE.MeshBasicMaterial(
        {
            color: "#8932CC",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
        }
    )
)
group.add(stairBoxLine)
stairBoxLine.position.x = 23.34
stairBoxLine.position.y = 7
stairBoxLine.position.z = -5.35
stairBoxLine.rotation.x = Math.PI / 1

const quarterpipeBox = new THREE.Mesh(
    new THREE.CircleBufferGeometry(1, 48),
    new THREE.MeshBasicMaterial(
        {
            color: "#8932CC",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
        }
    )
)
group.add(quarterpipeBox)
quarterpipeBox.position.x = -34
quarterpipeBox.position.y = 15
quarterpipeBox.position.z = 11.6

const quarterpipeBoxLine = new THREE.Mesh(
    new THREE.ConeBufferGeometry(0.1, 4.5),
    new THREE.MeshBasicMaterial(
        {
            color: "#8932CC",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
        }
    )
)
group.add(quarterpipeBoxLine)
quarterpipeBoxLine.position.x = -34
quarterpipeBoxLine.position.y = 12
quarterpipeBoxLine.position.z = 11.6
quarterpipeBoxLine.rotation.x = Math.PI / 1

const funboxBox = new THREE.Mesh(
    new THREE.CircleBufferGeometry(1, 48),
    new THREE.MeshBasicMaterial(
        {
            color: "#8932CC",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
        }
    )
)
group.add(funboxBox)
funboxBox.position.x = 16.3
funboxBox.position.y = 10
funboxBox.position.z = -23.6

const funBoxLine = new THREE.Mesh(
    new THREE.ConeBufferGeometry(0.1, 4.5),
    new THREE.MeshBasicMaterial(
        {
            color: "#8932CC",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
        }
    )
)
group.add(funBoxLine)
funBoxLine.position.x = 16.3
funBoxLine.position.y = 7
funBoxLine.position.z = -23.6
funBoxLine.rotation.x = Math.PI / 1

const ledgeupBox = new THREE.Mesh(
    new THREE.CircleBufferGeometry(1, 48),
    new THREE.MeshBasicMaterial(
        {
            color: "#8932CC",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
        }
    )
)
group.add(ledgeupBox)
ledgeupBox.position.x = -11.86
ledgeupBox.position.y = 10
ledgeupBox.position.z = 25.95

const ledgeupBoxLine = new THREE.Mesh(
    new THREE.ConeBufferGeometry(0.1, 4.5),
    new THREE.MeshBasicMaterial(
        {
            color: "#8932CC",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
        }
    )
)
group.add(ledgeupBoxLine)
ledgeupBoxLine.position.x = -11.86
ledgeupBoxLine.position.y = 7
ledgeupBoxLine.position.z = 25.95
ledgeupBoxLine.rotation.x = Math.PI / 1

// group alle boxes
scene.add(group)
group.rotation.y = 0.21


// raycaster
const raycaster = new THREE.Raycaster()
let currentIntersect = null



// mouse position
let mouse = new THREE.Vector2()
mouse.x = 0
mouse.y = 0

// location mouse
window.addEventListener('mousemove', (event) =>
{
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
})

// add all boxes in array
const objectsToIntersect = 
[
    communityBox,
    RailBox,
    halfPipeBox,
    ledgeBox,
    pyramidBox,
    stairRailBox,
    stairBox,
    quarterpipeBox,
    funboxBox,
    ledgeupBox
]

// pagina doorverwijzing
window.addEventListener('mousedown', () => 
{
    if(currentIntersect)
    {
        switch(currentIntersect.object)
        {
            case communityBox: 
            window.location.href="pages/community.html"
            break
            case RailBox: 
            window.location.href="pages/rail.html"
            break
            case halfPipeBox: 
            window.location.href="pages/halfpipe.html"
            break
            case ledgeBox: 
            window.location.href="pages/ledge.html"
            break
            case pyramidBox: 
            window.location.href="pages/pyramid.html"
            break
            case stairRailBox: 
            window.location.href="pages/stairrail.html"
            break
            case stairBox: 
            window.location.href="pages/stairs.html"
            break
            case quarterpipeBox: 
            window.location.href="pages/quarterpipe.html"
            break
            case funboxBox: 
            window.location.href="pages/funbox.html"
            break
            case ledgeupBox: 
            window.location.href="pages/ledgeup.html"
            break
        }
    }
})

// size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    //Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 60
camera.position.y = 40
camera.position.z = 100
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.minDistance = 40
controls.maxDistance = 110

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor("#000000", 0)



const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    group.rotation.y = elapsedTime * 0.02
    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(objectsToIntersect)

    if(intersects.length)
    {
        if(!currentIntersect)
        {
            currentIntersect = intersects[0]
            switch(currentIntersect.object)
            {
                case communityBox: 
                document.body.classList.add("pointer")
                gsap.to(communityBox.rotation, {y: 6, z: 2, duration: 2,})
                break
                case RailBox: 
                document.body.classList.add("pointer")
                gsap.to(RailBox.rotation, {y: 6, z: 2, duration: 2,})
                break
                case halfPipeBox: 
                document.body.classList.add("pointer")
                gsap.to(halfPipeBox.rotation, {y: 6, z: 2, duration: 2,})
                break
                case ledgeBox: 
                document.body.classList.add("pointer")
                gsap.to(ledgeBox.rotation, {y: 6, z: 2, duration: 2,})
                break
                case pyramidBox: 
                document.body.classList.add("pointer")
                gsap.to(pyramidBox.rotation, {y: 6, z: 2, duration: 2,})
                break
                case stairRailBox: 
                document.body.classList.add("pointer")
                gsap.to(stairRailBox.rotation, {y: 6, z: 2, duration: 2,})
                break
                case stairBox: 
                document.body.classList.add("pointer")
                gsap.to(stairBox.rotation, {y: 6, z: 2, duration: 2,})
                break
                case quarterpipeBox: 
                document.body.classList.add("pointer")
                gsap.to(quarterpipeBox.rotation, {y: 6, z: 2, duration: 2,})
                break
                case funboxBox: 
                document.body.classList.add("pointer")
                gsap.to(funboxBox.rotation, {y: 6, z: 2, duration: 2,})
                break
                case ledgeupBox: 
                document.body.classList.add("pointer")
                gsap.to(ledgeupBox.rotation, {y: 6, z: 2, duration: 2,})
                break
                case communityBoxLine: 
                document.body.classList.add("pointer")
                break
                case railBoxLine: 
                document.body.classList.add("pointer")
                break
                case halfPipeBoxLine: 
                document.body.classList.add("pointer")
                break
                case legdeBoxLine: 
                document.body.classList.add("pointer")
                break
                case pyramidBoxLine: 
                document.body.classList.add("pointer")
                break
                case stairRailBoxLine: 
                document.body.classList.add("pointer")
                break
                case stairBoxLine: 
                document.body.classList.add("pointer")
                break
                case quarterpipeBoxLine: 
                document.body.classList.add("pointer")
                break
                case funboxLineBoxLine: 
                document.body.classList.add("pointer")
                break
                case ledgeupBoxLine: 
                document.body.classList.add("pointer")
                break
            }
        }

        currentIntersect = intersects[0]
    }
    else
    {
        if(currentIntersect)
        {
            document.body.classList.remove("pointer")
            // switch(currentIntersect.object)
            // {
            //     case communityBox: 
            //     document.body.classList.add("pointer")
            //     gsap.to(communityBox.rotation, {y: -3, duration: 2, transition:"ease"})
            //     break
            //     case RailBox: 
            //     document.body.classList.add("pointer")
            //     gsap.to(RailBox.rotation, {y: -3, duration: 2, transition:"ease"})
            //     break
            //     case halfPipeBox: 
            //     document.body.classList.add("pointer")
            //     gsap.to(halfPipeBox.rotation, {y: -3, z:1, duration: 2, transition:"ease"})
            //     break
            //     case ledgeBox: 
            //     document.body.classList.add("pointer")
            //     gsap.to(ledgeBox.rotation, {y: -3, z:1, duration: 0.5, transition:"ease"})
            //     break
            //     case pyramidBox: 
            //     document.body.classList.add("pointer")
            //     gsap.to(pyramidBox.rotation, {y: -3, z:1, duration: 0.5, transition:"ease"})
            //     break
            //     case stairRailBox: 
            //     document.body.classList.add("pointer")
            //     gsap.to(stairRailBox.rotation, {y: -3, z:1, duration: 0.5, transition:"ease"})
            //     break
            //     case stairBox: 
            //     document.body.classList.add("pointer")
            //     gsap.to(stairBox.rotation, {y: -3, z:1, duration: 0.5, transition:"ease"})
            //     break
            //     case quarterpipeBox: 
            //     document.body.classList.add("pointer")
            //     gsap.to(quarterpipeBox.rotation, {y: -3, z:1, duration: 0.5, transition:"ease"})
            //     break
            //     case funboxBox: 
            //     document.body.classList.add("pointer")
            //     gsap.to(funboxBox.rotation, {y: -3, z:1, duration: 0.5, transition:"ease"})
            //     break
            //     case ledgeupBox: 
            //     document.body.classList.add("pointer")
            //     gsap.to(ledgeupBox.rotation, {y: -3, z:1, duration: 0.5, transition:"ease"})
            //     break
            // }
        }
        currentIntersect = null
    }     
}

tick()


















// tekst effect
function initSparkling() {
    // kleur, path
    const color = "#e3b6fa";
    const svgPath = 'M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z';

    // sparkling effect
    let sparkling = function() {
        $('.sparkling').each(function() {
            let sparklingElement = $(this);
            let stars = sparklingElement.find('.star');

            // remove star als 6+
            if(stars.length > 5) {
                stars.each(function(index) {
                    if(index === 0) {
                        $(this).remove();
                    }
                });
            }
            // add new star
            sparklingElement.append(addStar());
        });

        let rand = Math.round(Math.random() * 700) + 100;
        setTimeout(sparkling, rand);
    }
			
    // size + positie
    let addStar = function() {
        let size = Math.floor(Math.random() * 20) + 5;
        let top = Math.floor(Math.random() * 100) - 100;
        let left = Math.floor(Math.random() * 100);

        return '<span class="star" style="top:' + top + '%; left:' + left + '%;">'
            + '<svg width="' + size + '" height="' + size + '" viewBox="0 0 68 68" fill="none">'
            + '<path d="' + svgPath + '" fill="' + color + '" /></svg></span>';
    }

    // execute
    sparkling();
}

$(function() {
    initSparkling();
});

/**
 * MUSIC
 */

const player = document.querySelector('#player');
const playBtn = document.querySelector('#playBtn');
const playIcon = document.querySelector('#playIcon');

playBtn.addEventListener('click', () => {
    if(player.paused) {
        player.play();
        playBtn.classList.add('playing');
        playIcon.src="pages/Assets/volume.png";
        console.log("play")
    } else {
        player.pause();
        playBtn.classList.remove('playing');
        console.log("paused")
        playIcon.src="pages/Assets/muted.png";
    }
})

{/* <audio loop id="player" src="/Assets/BGMQ.mp3"></audio>
<img class="gui" src="/Assets/colorpicker.png" alt="">
<button id="playBtn" class="mute">
  <img id="playIcon" width="50" src="/Assets/muted.png" alt="">
</button> */}