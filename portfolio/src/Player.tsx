import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import CharacterModel from "./CharacterModel";
import Ecctrl, { EcctrlAnimation } from 'ecctrl'

export default function Player() {
    const ref = useRef<any>()

    const characterURL = "./sayem-animated.glb"

    const animationSet = {
        idle: 'Idle',
        walk: 'Walk',
        run: 'Running',
        jump: 'Jump_Start',
        jumpIdle: 'Falling_Idle',
        jumpLand: 'Jump_Land',
        fall: 'Falling_Idle'
    }

    useFrame(() => {
        if (ref.current) {
            const position = (ref.current).translation()

            // Reset
            if (position.y < - 3) {
                reset()
            }
        }
    })

    const reset = () => {
        if (ref.current) {
            ref.current.setTranslation({ x: 0, y: 1, z: 2 })
            ref.current.setLinvel({ x: 0, y: 0, z: 0 })
            ref.current.setAngvel({ x: 0, y: 0, z: 0 })
        }
    }

    return (
        <Ecctrl
            ref={ref}
            debug
            animated
            position={[26, 11, -15]}
        >
            <EcctrlAnimation
                characterURL={characterURL} // Must have property
                animationSet={animationSet} // Must have property
            >
                <CharacterModel />
            </EcctrlAnimation>
        </Ecctrl>
    )
}