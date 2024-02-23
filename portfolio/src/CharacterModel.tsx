//disable eslint and typescript for this file
/* eslint-disable */
// @ts-nocheck

import { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { editable as e } from '@theatre/r3f'

export default function CharacterModel(props) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF("/sayem-animated.glb");
    const { actions } = useAnimations(animations, group);

    //reset position if out of bounds
    useFrame(() => {
        if (group.current.position.y < -1) {
            group.current.position.y = 0;
            group.current.position.x = 0;
            group.current.position.z = 0;
        }
    }
    );

    return (
        <e.group theatreKey="Player" ref={group} {...props} dispose={null} position={[0, -0.8, 0]} scale={[1, 1, 1]}>
            <group name="Scene">
                <group name="Armature">
                    <skinnedMesh
                        name="EyeLeft"
                        geometry={nodes.EyeLeft.geometry}
                        material={materials["Wolf3D_Eye.015"]}
                        skeleton={nodes.EyeLeft.skeleton}
                        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
                        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
                    />
                    <skinnedMesh
                        name="EyeRight"
                        geometry={nodes.EyeRight.geometry}
                        material={materials["Wolf3D_Eye.015"]}
                        skeleton={nodes.EyeRight.skeleton}
                        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
                        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
                    />
                    <skinnedMesh
                        name="Wolf3D_Body"
                        geometry={nodes.Wolf3D_Body.geometry}
                        material={materials["Wolf3D_Body.015"]}
                        skeleton={nodes.Wolf3D_Body.skeleton}
                        morphTargetDictionary={nodes.Wolf3D_Body.morphTargetDictionary}
                        morphTargetInfluences={nodes.Wolf3D_Body.morphTargetInfluences}
                    />
                    <skinnedMesh
                        name="Wolf3D_Glasses"
                        geometry={nodes.Wolf3D_Glasses.geometry}
                        material={materials["Wolf3D_Glasses.015"]}
                        skeleton={nodes.Wolf3D_Glasses.skeleton}
                    />
                    <skinnedMesh
                        name="Wolf3D_Hair"
                        geometry={nodes.Wolf3D_Hair.geometry}
                        material={materials["Wolf3D_Hair.015"]}
                        skeleton={nodes.Wolf3D_Hair.skeleton}
                    />
                    <skinnedMesh
                        name="Wolf3D_Head"
                        geometry={nodes.Wolf3D_Head.geometry}
                        material={materials["Wolf3D_Skin.015"]}
                        skeleton={nodes.Wolf3D_Head.skeleton}
                        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
                        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
                    />
                    <skinnedMesh
                        name="Wolf3D_Outfit_Bottom"
                        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
                        material={materials["Wolf3D_Outfit_Bottom.015"]}
                        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
                        morphTargetDictionary={
                            nodes.Wolf3D_Outfit_Bottom.morphTargetDictionary
                        }
                        morphTargetInfluences={
                            nodes.Wolf3D_Outfit_Bottom.morphTargetInfluences
                        }
                    />
                    <skinnedMesh
                        name="Wolf3D_Outfit_Footwear"
                        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
                        material={materials["Wolf3D_Outfit_Footwear.015"]}
                        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
                        morphTargetDictionary={
                            nodes.Wolf3D_Outfit_Footwear.morphTargetDictionary
                        }
                        morphTargetInfluences={
                            nodes.Wolf3D_Outfit_Footwear.morphTargetInfluences
                        }
                    />
                    <skinnedMesh
                        name="Wolf3D_Outfit_Top"
                        geometry={nodes.Wolf3D_Outfit_Top.geometry}
                        material={materials["Wolf3D_Outfit_Top.015"]}
                        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
                        morphTargetDictionary={
                            nodes.Wolf3D_Outfit_Top.morphTargetDictionary
                        }
                        morphTargetInfluences={
                            nodes.Wolf3D_Outfit_Top.morphTargetInfluences
                        }
                    />
                    <skinnedMesh
                        name="Wolf3D_Teeth"
                        geometry={nodes.Wolf3D_Teeth.geometry}
                        material={materials["Wolf3D_Teeth.015"]}
                        skeleton={nodes.Wolf3D_Teeth.skeleton}
                        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
                        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
                    />
                    <primitive object={nodes.Hips} />
                </group>
            </group>
        </e.group>
    );
}

useGLTF.preload("/sayem-animated.glb");
