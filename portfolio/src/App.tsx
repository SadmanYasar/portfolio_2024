import { Canvas, extend } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Billboard, Environment, Image, KeyboardControls, Loader } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { EcctrlJoystick } from 'ecctrl'
// import { getProject } from '@theatre/core'
// import studio from '@theatre/studio'
// import extension from '@theatre/r3f/dist/extension'
// import { SheetProvider } from '@theatre/r3f'
// import demoProjectState from './statjson'
// import { editable as e } from '@theatre/r3f'
// import nyan from "./assets/nyan.png"
// import strat from "./assets/strat.png"

// our Theatrjs project sheet, we'll use this later
// const demoSheet = getProject('Demo Project', { state: demoProjectState }).sheet('Demo Sheet')

// Vite
// if (import.meta.env.DEV) {
//   studio.initialize()
//   studio.extend(extension)
// }

import Lights from './components/Lights'
// import Map from './Map'
import Player from './components/Player'
import ViceCity from './components/Vice_city_map'
import Tommy from './components/Tommy-animated'

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
      {/* <EcctrlJoystickControls /> */}
      {/* <Canvas
        shadows
        camera={{
          fov: 65,
          near: 0.1,
          far: 100,
        }}
        onPointerDown={(e) => {
          // if (pointerType === 'mouse') {
          //   (target as HTMLCanvasElement).requestPointerLock()
          // }
        }}> */}
      <color attach={'background'} args={['black']} />
      {/* <ContactShadows  /> */}
      {/* <SheetProvider sheet={demoSheet}> */}
      {/* <Perf position="top-left" minimal /> */}
      {/* <axesHelper args={[3]} /> */}
      <Environment preset='night' />
      {/* <Sphere scale={[50, 50, 50]} rotation-y={Math.PI / 2}>
            <LayerMaterial
              // lighting='physical'
              // transmission={1}
              side={THREBackSide}
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
      <Physics timeStep={"vary"} >
        <KeyboardControls map={keyboardMap}>
          {/* <Suspense fallback={null}>
          </Suspense> */}
          <Player />
        </KeyboardControls>
        <Suspense fallback={null}>
          <Tommy />
        </Suspense>
        {/* <Ground /> */}
        <ViceCity />
        {/* <GroveStreet visible={false} /> */}
      </Physics>
      {/* <mesh>
              <Html position={[0, -0.8, 10]} transform occlude="raycast">
                <div>
                  <img src='https://media.tenor.com/5Z5h-ffbqj0AAAAj/%D0%BA%D0%BE%D1%82%D1%83%D1%81%D0%BB%D0%B5%D1%82%D0%BE%D1%83%D1%81.gif' className="object-cover w-64 h-64" />
                </div>
              </Html>
            </mesh> */}
      {/* <Billboard>
          <group>
            <Image url={nyan} transparent />
          </group>
          <group>
            <Image url={strat} transparent zoom={0.35} />
          </group>
        </Billboard> */}
      {/* </SheetProvider> */}
      {/* </Canvas > */}
      {/* <Loader /> */}
    </>
  )
}
