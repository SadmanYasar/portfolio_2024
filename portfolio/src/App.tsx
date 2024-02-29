import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Billboard, Environment, Html, Image, KeyboardControls, Loader, Sphere } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { EcctrlJoystick } from 'ecctrl'
import { getProject } from '@theatre/core'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { SheetProvider } from '@theatre/r3f'
import demoProjectState from './state.json'
import { editable as e } from '@theatre/r3f'
import nyan from "./assets/nyan.png"

// our Theatre.js project sheet, we'll use this later
const demoSheet = getProject('Demo Project', { state: demoProjectState }).sheet('Demo Sheet')

// Vite
if (import.meta.env.DEV) {
  studio.initialize()
  studio.extend(extension)
}

import Lights from './Lights'
// import Map from './Map'
import Ground from './Plane'
import { Perf } from 'r3f-perf'
import { Gradient, LayerMaterial } from 'lamina'
import * as THREE from 'three'
import Player from './Player'

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
  //   demoSheet.project.ready.then(() => demoSheet.sequence.play({ iterationCount: 1 }))
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
          // if (e.pointerType === 'mouse') {
          //   (e.target as HTMLCanvasElement).requestPointerLock()
          // }
        }}>
        {/* <ContactShadows position={[0, -0.2, 0]} far={1000} /> */}
        <SheetProvider sheet={demoSheet}>
          <Perf position="top-left" minimal />
          <axesHelper args={[3]} />
          <Environment preset='forest' />
          <Sphere scale={[50, 50, 50]} rotation-y={Math.PI / 2}>
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
          </Sphere>
          {/* <Stars /> */}
          <Lights />
          <Physics timeStep={"vary"} >
            <KeyboardControls map={keyboardMap}>
              <Suspense fallback={<capsuleGeometry args={[0.3, 0.7]} />}>
                <Player />
              </Suspense>
            </KeyboardControls>
            <Ground />
          </Physics>
          <e.group theatreKey='htmltext'>
            {/* <mesh>
              <Html position={[0, -0.8, 10]} transform occlude="raycast">
                <div>
                  <img src='https://media.tenor.com/5Z5h-ffbqj0AAAAj/%D0%BA%D0%BE%D1%82%D1%83%D1%81%D0%BB%D0%B5%D1%82%D0%BE%D1%83%D1%81.gif' className="w-64 h-64 object-cover" />
                </div>
              </Html>
            </mesh> */}
            <Billboard>
              <Image url={nyan} transparent />
            </Billboard>
          </e.group>
        </SheetProvider>
      </Canvas>
      <Loader />
    </>
  )
}
