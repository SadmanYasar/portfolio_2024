import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Environment, KeyboardControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense, useEffect, useState } from 'react'
import Ecctrl, { EcctrlJoystick } from 'ecctrl'

import Lights from './Lights'
// import Map from './Map'
import CharacterModel from './CharacterModel'
import Ground from './Plane'

function Loading() {
  return (
    <>
      Loading...
    </>
  )
}

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
        <Perf position="top-left" />
        <Environment background files="/night.hdr" />
        <Lights />
        <Physics timeStep="vary">
          <KeyboardControls map={keyboardMap} />
          <Suspense fallback={<capsuleGeometry args={[0.3, 0.7]} />}>
            <Ecctrl
              debug
              followLight
            >
              <CharacterModel />
            </Ecctrl>
            {/* <Map /> */}
            <Ground />
          </Suspense>
        </Physics>
      </Canvas>
    </>
  )
}
