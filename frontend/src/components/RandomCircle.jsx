import React from "react";
import { useMemo } from "react";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    const r = getRandomInt(0, 255);
    const g = getRandomInt(0, 255);
    const b = getRandomInt(0, 255);
    return `rgb(${r},${g},${b})`;
}

export default function RandomCircle({ amount }) {
    // Set the area for random positioning (adjust as needed)
    const areaWidth = window.innerWidth;
    const areaHeight = window.innerHeight;

    const circles = useMemo(() => (
        Array.from({ length: amount }, (_, i) => {
            const size = getRandomInt(30, 120); // px
            const left = getRandomInt(0, areaWidth - size);
            const top = getRandomInt(0, areaHeight - size);
            const style = {
                width: size,
                height: size,
                backgroundColor: getRandomColor(),
                borderRadius: "50%",
                position: "absolute",
                left,
                top,
                opacity: 0.5,
                pointerEvents: "none",
            };
            return <div key={i} style={style} />;
        })
    ), [amount, areaWidth, areaHeight]);

    return (
        <div
            className="z-0"
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            {circles}
        </div>
    );
}