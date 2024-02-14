import React from 'react';
import { Plane } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export default function Ground() {

    return (
        // <RigidBody type="fixed" colliders="trimesh" ccd>
        //     <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        //         <meshStandardMaterial color={'#888888'} />
        //     </Plane>
        // </RigidBody>
        <RigidBody type="fixed">
            <mesh receiveShadow position={[0, -3.5, 0]}>
                <boxGeometry args={[300, 5, 300]} />
                <meshStandardMaterial color="lightblue" />
            </mesh>
        </RigidBody>
    );
}