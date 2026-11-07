
import React from "react";
import { createRoot } from "react-dom/client";
import {
    ShaderGradientCanvas,
    ShaderGradient
} from "@shadergradient/react";
import "./style.css";
function Background() {
    return (
        <ShaderGradientCanvas
            style={{
                position: "fixed",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none"
            }}>
            <ShaderGradient
                animate="on"
                frameRate={10}
                uTime={0}
                uSpeed={0.2}

                color1="#002fff"
                color2="#0000a1"
                color3="#5896e1"

                brightness={1.2}
                envPreset="city"
                lightType="3d"
                reflection={0.1}

                cAzimuthAngle={180}
                cDistance={3.6}
                cPolarAngle={90}
                cameraZoom={1}
                fov={45}

                positionX={-1.4}
                positionY={0}
                positionZ={0}

                rotationX={0}
                rotationY={10}
                rotationZ={50}

                shader="defaults"
                type="waterPlane"

                uAmplitude={1}
                uDensity={4.8}
                uFrequency={5.5}
                uStrength={5.3}

                destination="onCanvas"
                embedMode="off"
                format="gif"
                pixelDensity={1.3}
                grain="on"
                wireframe={false}

                range="disabled"
                rangeStart={0}
                rangeEnd={40}

                axesHelper="off"
                gizmoHelper="hide"
            />
        </ShaderGradientCanvas>
    );
}
const backgroundContainer = document.getElementById(
    "shader-background"
);
createRoot(backgroundContainer).render(
    <Background />
);