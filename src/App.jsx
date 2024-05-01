import { useRef, useState } from "react";
import { PhaserGame } from "./game/PhaserGame";
import Phaser from "phaser";

import Button from "./components/Button/Button";

import arrowBack from "../public/assets/arrowBack.svg";

function App() {
    const [canMoveSprite, setCanMoveSprite] = useState(true);
    const phaserRef = useRef();
    const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

    const changeScene = () => {
        const scene = phaserRef.current.scene;

        if (scene) {
            scene.changeScene();
        }
    };

    const moveSprite = () => {
        const scene = phaserRef.current.scene;

        if (scene && scene.scene.key === "MainMenu") {
            scene.moveLogo(({ x, y }) => {
                setSpritePosition({ x, y });
            });
        }
    };

    const addSprite = () => {
        const scene = phaserRef.current.scene;

        if (scene) {
            const x = Phaser.Math.Between(64, scene.scale.width - 64);
            const y = Phaser.Math.Between(64, scene.scale.height - 64);
            const star = scene.add.sprite(x, y, "star");
            scene.add.tween({
                targets: star,
                duration: 500 + Math.random() * 1000,
                alpha: 0,
                yoyo: true,
                repeat: -1,
            });
        }
    };

    const currentScene = (scene) => {
        setCanMoveSprite(scene.scene.key !== "MainMenu");
    };

    const tele = window.Telegram.WebApp;
    tele.expand();

    return (
        <div id="app">
            <Button
                image={arrowBack}
                className="buttonAbsolute"
                onClick={() => {
                    let defaultModal = document.querySelector("#defaultModal");
                    defaultModal.style.display = "block";
                }}
            />
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
        </div>
    );
}

export default App;

