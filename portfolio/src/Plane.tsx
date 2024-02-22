import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { editable as e } from '@theatre/r3f'

export default function Ground() {

    return (
        // <RigidBody type="fixed" colliders="trimesh" ccd>
        //     <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        //         <meshStandardMaterial color={'#888888'} />
        //     </Plane>
        // </RigidBody>
        // <RigidBody type="fixed" ccd>
        //     <mesh position={[0, -0.5, 0]}>
        //         <boxGeometry args={[20, 50, 20]} />
        //         <meshStandardMaterial color={"blue"} />
        //     </mesh>
        // </RigidBody>
        <RigidBody type="fixed" ccd>
            <e.mesh theatreKey="Plane" receiveShadow position={[0, -5.3, 0]}>
                <boxGeometry args={[50, 10, 50]} />
                <meshStandardMaterial color="lightblue" metalness={0.3} roughness={0.2} />
            </e.mesh>
        </RigidBody>
    );
}