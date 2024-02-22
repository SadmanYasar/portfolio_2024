import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Environment, KeyboardControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense, useEffect, useState } from 'react'
import Ecctrl, { EcctrlAnimation, EcctrlJoystick } from 'ecctrl'

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
  const characterURL = "./sayem-animated.glb"

  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
  ];

  const animationSet = {
    idle: 'Idle',
    walk: 'Walk',
    run: 'Running',
    jump: 'Jump_Start',
    jumpIdle: 'Falling_Idle',
    jumpLand: 'Jump_Land',
    fall: 'Falling_Idle'
  }

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
        <axesHelper args={[5]} />
        <Environment background files="/night.hdr" />
        <Lights />
        <Physics timeStep={"vary"}>
          <KeyboardControls map={keyboardMap}>
            {/* <Suspense fallback={<capsuleGeometry args={[0.3, 0.7]} />}> */}
            <Ecctrl
              debug
              animated
            >
              <EcctrlAnimation
                characterURL={characterURL} // Must have property
                animationSet={animationSet} // Must have property
              >
                <CharacterModel />
              </EcctrlAnimation>
            </Ecctrl>
            {/* <Map /> */}
            {/* </Suspense> */}
          </KeyboardControls>
          <Ground />
        </Physics>
      </Canvas>
    </>
  )
}
