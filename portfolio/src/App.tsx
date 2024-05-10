import { Canvas, extend } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Billboard, Environment, Image, KeyboardControls, Loader, Sphere, Stars } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { EcctrlJoystick } from 'ecctrl'
import { getProject } from '@theatre/core'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { SheetProvider } from '@theatre/r3f'
import demoProjectState from './state.json'
import { editable as e } from '@theatre/r3f'
import nyan from "./assets/nyan.png"
import strat from "./assets/strat.png"
import mainRoadTexture from "./assets/main_road_material.jpg"
import intersectionTexture from "./assets/intersection_material.jpg"

const mainRoadTextureLoader = new THREE.TextureLoader().load(mainRoadTexture)
const intersectionTextureLoader = new THREE.TextureLoader().load(intersectionTexture)

const MainRoad = (props: any) => {
  return (
    <mesh theatreKey="road1" {...props}>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial map={mainRoadTextureLoader} />
    </mesh>
  )
}

const Intersection = (props: any) => {
  return (
    <mesh {...props}>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial map={intersectionTextureLoader} />
    </mesh>
  )
}


// our Theatrjs project sheet, we'll use this later
const demoSheet = getProject('Demo Project', { state: demoProjectState }).sheet('Demo Sheet')

if (import.meta.env.DEV) {
  studio.initialize()
  studio.extend(extension)
}

import Lights from './components/Lights'
// import Map from './Map'
import Player from './components/Player'
import ViceCity from './components/Vice_city_map'
import ViceCityColliderMesh from './components/Vice_city_collider_mesh'
import Tommy from './components/Tommy-animated'
import { Perf } from 'r3f-perf'
import { LayerMaterial, Gradient } from 'lamina'
import * as THREE from 'three'
import Ground from './components/Ground'

extend({ Canvas })

const EcctrlJoystickControls = () => {
  const [isTouchScreen, setIsTouchScreen] = useState(false)
  useEffect(() => {
    // Check if using a touch control device, show/hide joystick
    if (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0)) {
      setIsTouchScreen(true)
      console.log('isTouchScreen')
    } else {
      setIsTouchScreen(false)
      console.log('isNotTouchScreen')
    }
  }, [])
  return (
    <>
      {isTouchScreen && <EcctrlJoystick />}
    </>
  )
}

export default function App() {

  // useEffect(() => {
  //   demoSheet.project.ready.then(() => demoSheet.sequencplay({ iterationCount: 1 }))
  // }, [])

  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
  ];

  return (
    <>
      <EcctrlJoystickControls />
      <Canvas
        shadows
        camera={{
          fov: 65,
          near: 0.1,
          far: 1000,
        }}
        onPointerDown={(e) => {
          if (e.pointerType === 'mouse') {
            (e.target as HTMLCanvasElement).requestPointerLock()
          }
        }}>
        <color attach={'background'} args={['black']} />
        {/* <ContactShadows  /> */}
        <SheetProvider sheet={demoSheet}>
          {/* <Perf position="top-left" /> */}
          <axesHelper args={[3]} />
          <Environment preset='night' />
          {/* <Sphere scale={[80, 80, 80]} rotation-y={Math.PI / 2}>
            <LayerMaterial
              // lighting='physical'
              // transmission={1}
              side={THREE.BackSide}
            >
              <Gradient
                colorA={"magenta"}
                colorB={"blue"}
                axes='y'
                start={0}
                end={0.4}
              />
            </LayerMaterial>
          </Sphere> */}
          {/* <Stars /> */}
          <Lights />
          {/* <Stats /> */}
          <Physics>
            <KeyboardControls map={keyboardMap}>
              <Player />
            </KeyboardControls>
            <Tommy />
            {/* <Suspense fallback={null}>
          </Suspense> */}
            <Ground />
            <MainRoad position={[0, -0.3, 0]} rotation={[-1.58, 0, 0]} />
            <Intersection position={[30, -0.3, 0]} rotation={[-1.58, 0, 0]} />
            <MainRoad position={[60, -0.3, 0]} rotation={[-1.58, 0, 0]} />

            {/* <ViceCity /> */}
            {/* <ViceCityColliderMesh /> */}
            {/* <ViceCityColliderMesh /> */}
            {/* <GroveStreet visible={false} /> */}
          </Physics>
          {/* <Billboard>
            <group>
              <Image url={nyan} transparent />
            </group>
            <group>
              <Image url={strat} transparent zoom={0.35} />
            </group>
          </Billboard> */}
        </SheetProvider>
      </Canvas >
      <Loader />
    </>
  )
}
