import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Environment, KeyboardControls } from '@react-three/drei'
import { useEffect, useState } from 'react'
import Ecctrl, { EcctrlAnimation, EcctrlJoystick } from 'ecctrl'
import { getProject } from '@theatre/core'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { editable as e, SheetProvider } from '@theatre/r3f'
import demoProjectState from './state.json'

// our Theatre.js project sheet, we'll use this later
const demoSheet = getProject('Demo Project', { state: demoProjectState }).sheet('Demo Sheet')

// Vite
if (import.meta.env.DEV) {
  studio.initialize()
  studio.extend(extension)
}

import Lights from './Lights'
// import Map from './Map'
import CharacterModel from './CharacterModel'
import Ground from './Plane'

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
          // if (e.pointerType === 'mouse') {
          //   (e.target as HTMLCanvasElement).requestPointerLock()
          // }
        }}>
        <SheetProvider sheet={demoSheet}>
          {/* <Perf position="top-left" minimal /> */}
          <axesHelper args={[5]} />
          <Environment background files="/night.hdr" />
          <Lights />
          <Physics debug={true} timeStep={"vary"} >
            <KeyboardControls map={keyboardMap}>
              {/* <Suspense fallback={<capsuleGeometry args={[0.3, 0.7]} />}> */}
              <Ecctrl
                debug
                animated
                position={[0, 11, 0]}
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
        </SheetProvider>
      </Canvas>
    </>
  )
}
