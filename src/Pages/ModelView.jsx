import React, { useRef, useState, useEffect } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import floorData from "../components/floors_data.json";
import "../components/popup2.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import R101 from "../assets/unit plans/Type B TWO BEDROOM TYPICAL FLAT-101.png";
import R102 from "../assets/unit plans/Type A TWO BEDROOM TYPICAL FLAT-102.png";
import R103 from "../assets/unit plans/Type A STUDIO TYPICAL FLAT-103.png";
import R104 from "../assets/unit plans/TypeB STUDIO TYPICAL FLAT-104.png";
import R105 from "../assets/unit plans/TYPICAL FLAT-105 Type C STUDIO.png";
import R106 from "../assets/unit plans/TYPICAL FLAT-106 Type B ONE BEDROOM.png";
import R107 from "../assets/unit plans/Type A ONE BEDROOM TYPICAL FLAT-107.png";

import R201_801 from "../assets/unit plans/TYPICAL FLAT-201 TO 801 Type B TWO BEDROOM.png";
import R202_802 from "../assets/unit plans/Type A TWO BEDROOM TYPICAL FLAT-202 TO 802.png";
import R203_803 from "../assets/unit plans/Type A STUDIO TYPICAL FLAT-203 TO 803.png";
import R204_804 from "../assets/unit plans/TypeB STUDIO TYPICAL FLAT-204 TO 804.png";
import R205_805 from "../assets/unit plans/TYPICAL FLAT-205 TO 805 Type C STUDIO.png";
import R206_806 from "../assets/unit plans/TYPICAL FLAT-206 TO 806 Type B ONE BEDROOM.png";
import R207_807 from "../assets/unit plans/Type A ONE BEDROOM TYPICAL FLAT-207 TO 807.png";
import { TbRulerMeasure } from "react-icons/tb";
import { Environment } from "@react-three/drei";
import Loader from "../components/Loader";

const unitMapping = {};

// Loop through each set of units
for (let base = 101; base <= 801; base += 100) {
  for (let offset = 0; offset < 7; offset++) {
    const key = base + offset;
    unitMapping[key] = key; // Mapping each number to itself
  }
}

const getImage = (image) => {
  const images = {
    "Type B TWO BEDROOM TYPICAL FLAT-101.png": R101,
    "Type A TWO BEDROOM TYPICAL FLAT-102.png": R102,
    "Type A STUDIO TYPICAL FLAT-103.png": R103,
    "TypeB STUDIO TYPICAL FLAT-104.png": R104,
    "TYPICAL FLAT-105 Type C STUDIO.png": R105,
    "TYPICAL FLAT-106 Type B ONE BEDROOM.png": R106,
    "Type A ONE BEDROOM TYPICAL FLAT-107.png": R107,
    "TYPICAL FLAT-201 TO 801 Type B TWO BEDROOM.png": R201_801,
    "TYPICAL FLAT-202 TO 802 Type B TWO BEDROOM.png": R202_802,
    "Type A STUDIO TYPICAL FLAT-203 TO 803.png": R203_803,
    "TypeB STUDIO TYPICAL FLAT-204 TO 804.png": R204_804,
    "TYPICAL FLAT-205 TO 805 Type C STUDIO.png": R205_805,
    "TYPICAL FLAT-206 TO 806 Type B ONE BEDROOM.png": R206_806,
    "Type A ONE BEDROOM TYPICAL FLAT-207 TO 807.png": R207_807,
  };
  return images[image] || null;
};

const Model = ({
  setPopupInfo,
  setPopupPosition,
  setPopupVisible,
  targetRotation,
  setLoading,
  unit,
}) => {
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const { camera, scene } = useThree();
  const [hoveredMesh, setHoveredMesh] = useState(null);
  const modelRef = useRef(); // Ref for the model
  const navigate = useNavigate();

  const gltf = useLoader(GLTFLoader, "/api 7.glb");
  useEffect(() => {
    // When the model has loaded, set loading to false
    if (gltf) {
      setLoading(false);
    }
  }, [gltf]);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // console.log(child.name);

        child.material = child.material.clone();
      }
    });

    modelRef.current = gltf.scene;
  }, [gltf]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        targetRotation,
        0.6
      );
    }
  });

  const hoveredMeshes = new Set();

  const onMouseMove = (event) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const hoveredObject = intersects[0].object;

      const match = hoveredObject.name.match(/^(\d{3})/); // Extract base unit number
      const baseUnitNumber = match ? match[1] : null;

      if (baseUnitNumber && unitMapping[baseUnitNumber]) {
        const unitNumber = unitMapping[baseUnitNumber];

        const currentUnit = floorData
          .flatMap((floor) => floor.units)
          .find((unit) => unit.unitNo === unitNumber.toString());

        if (currentUnit) {
          setPopupInfo(currentUnit);
          setPopupPosition({
            x: event.clientX + 5,
            y: event.clientY - 125,
          });
          setPopupVisible(true);

          if (!hoveredMeshes.has(hoveredObject)) {
            // Reset all previously hovered meshes
            hoveredMeshes.forEach((mesh) => {
              mesh.material.color.set(mesh.userData.originalColor);
              hoveredMeshes.delete(mesh);
            });

            // Apply hover effect to the new object
            if (!hoveredObject.userData.originalColor) {
              hoveredObject.userData.originalColor =
                hoveredObject.material.color.getHex();
            }

            hoveredObject.material.color.set(0x3498db);
            hoveredObject.material.needsUpdate = true;
            hoveredMeshes.add(hoveredObject); // Add to the hovered set
          }
          return;
        }
      }
    }

    // Reset hover when no object is intersected
    hoveredMeshes.forEach((mesh) => {
      mesh.material.color.set(mesh.userData.originalColor);
      hoveredMeshes.delete(mesh);
    });

    setPopupInfo(null);
    setPopupVisible(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [hoveredMesh, unit]);

  const onMouseClick = () => {
    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      console.log(clickedObject.name);

      // Extract the unit number before the underscore (if any)
      const unitNumberString = clickedObject.name.split("_")[0]; // Splitting at the underscore

      // Map the extracted unit number string to the unitNumber
      const unitNumber = unitMapping[unitNumberString];

      if (unitNumber) {
        console.log(unit);
        navigate(`/status/${unitNumber}`);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onMouseClick);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onMouseClick);
    };
  }, []);

  return <primitive object={gltf.scene} scale={1.4} position={[0, 0, 0]} />;
};

const CameraHelper = ({ setPopupScale }) => {
  const { camera } = useThree();

  useEffect(() => {
    const updatePopupScale = () => {
      const zoomFactor = THREE.MathUtils.clamp(
        camera.position.z / 10,
        0.9,
        0.5
      );
      setPopupScale(zoomFactor);
    };

    camera.addEventListener("change", updatePopupScale);
    updatePopupScale();

    return () => camera.removeEventListener("change", updatePopupScale);
  }, [camera]);

  return null; // No JSX needed, just a helper function
};

const ModelView = () => {
  const [popupScale, setPopupScale] = useState(1);
  const [loading, setLoading] = useState(true);

  const [targetRotation, setTargetRotation] = useState(0);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const [popupInfo, setPopupInfo] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [popupVisible, setPopupVisible] = useState(false);
  const [unit, setUnit] = useState(null);

  useEffect(() => {
    setUnit(popupInfo);
  }, []);

  const adjustedPopupPosition = {
    left: Math.min(window.innerWidth - 250, Math.max(20, popupPosition.x)),
    top: Math.min(window.innerHeight - 250, Math.max(20, popupPosition.y)),
  };

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resetImage = () => {
    setPopupVisible(false);
    setPopupInfo(null);
  };

  const rotateLeft = () => {
    // Snap to predefined rotation points (e.g., every 90 degrees)
    setTargetRotation((prev) => {
      const newRotation =
        Math.floor((prev - Math.PI / 2) / (Math.PI / 2)) * (Math.PI / 2);
      return newRotation;
    });
  };
  const rotateRight = () => {
    // Snap to predefined rotation points
    setTargetRotation((prev) => {
      const newRotation =
        Math.floor((prev + Math.PI / 2) / (Math.PI / 2)) * (Math.PI / 2);
      return newRotation;
    });
  };
  return (
    <div
      onClick={resetImage}
      className="relative w-full h-full md:h-screen"
      style={{ zIndex: 1 }}
    >
      {loading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      <Canvas
        camera={{
          position: [0, 14, 0.04], // Bring camera closer, lower Z value
          fov: dimensions.width < 768 ? 50 : 40, // Narrower field of view for more detail
        }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        castShadow={false}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[10, 10, 10]} />
        <Environment
          files="/hdri2.exr" // Local HDRI file
          background={true} // Set to true to use HDRI as background
        />
        <Model
          position={[0, 0, 0]} // Adjust the model's position (e.g., centering it or moving it along axes)
          setPopupInfo={setPopupInfo}
          setPopupPosition={setPopupPosition}
          setPopupVisible={setPopupVisible}
          targetRotation={targetRotation}
          setLoading={setLoading}
          unit={unit}
        />
        <OrbitControls
          enablePan={false}
          enableZoom
          minDistance={3} // Minimum zoom-in distance
          maxDistance={7.5} // 🔥 Reduced max zoom-out distance from 20 to 10
          enableRotate
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 3}
          enableDamping
          // dampingFactor={0.1}
          // rotateSpeed={0.4}
          // zoomSpeed={1}
          dampingFactor={0.2} // Increased for faster damping
          rotateSpeed={1.2} // Increased for faster rotation
          zoomSpeed={2} // Increased for faster zoom
        />
        <CameraHelper setPopupScale={setPopupScale} />{" "}
        {/* ✅ Fix applied here */}
      </Canvas>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-white bg-opacity-50 rounded-lg p-2 shadow-md">
        <button
          onClick={rotateRight}
          className="p-3 bg-white rounded-lg shadow-md"
        >
          <FaArrowLeft className="text-xl" />
        </button>
        <button
          onClick={rotateLeft}
          className="p-3 bg-white rounded-lg shadow-md"
        >
          <FaArrowRight className="text-xl" />
        </button>
      </div>

      <div
        className={`popup ${popupVisible ? "show" : "hide"}`}
        style={{
          left: `${adjustedPopupPosition.left}px`,
          top: `${adjustedPopupPosition.top}px`,
          transform: `scale(${popupScale})`,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            cursor: "pointer",
          }}
          onClick={() => setPopupVisible(false)}
        >
          x
        </span>
        {popupInfo && (
          <>
            <span>
              <img src={getImage(popupInfo.image)} alt={popupInfo.type} />
            </span>
            <div className="flex gap-3">
              <h3>{popupInfo.type}</h3>

              <h3># {popupInfo.unitNo}</h3>
            </div>
            <div className="info-row flex items-center justify-center gap-2">
              <TbRulerMeasure size={20} />
              <span>{popupInfo.totalAreaSqFt} sq.ft.</span>
              <span>{popupInfo.sellingPriceAED}</span>
            </div>
            <button className="sold-btn">{popupInfo.status}</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ModelView;
