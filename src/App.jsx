import { useEffect, useRef, useState } from "react";
import { PhaserGame } from "./game/PhaserGame";
import Phaser from "phaser";

import Stats from "./components/Stats/Stats";

function App({ gameState }) {
    const [canMoveSprite, setCanMoveSprite] = useState(true);
    const phaserRef = useRef();
    const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
    const [phaserState, setPhaserState] = useState(gameState);

    useEffect(() => {
        setPhaserState(gameState);
    }, [gameState]);

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

    const overflow = 100;
    document.body.style.overflowY = "hidden";
    document.body.style.marginTop = `${overflow}px`;
    document.body.style.height = window.innerHeight + overflow + "px";
    document.body.style.paddingBottom = `${overflow}px`;
    window.scrollTo(0, overflow);
    let ts;

    const onTouchStart = (e) => {
        ts = e.touches[0].clientY;
    };

    // const onTouchMove = (e) => {
    //     e.preventDefault();
    // };

    document.documentElement.addEventListener("touchstart", onTouchStart, {
        passive: false,
    });

    // document.documentElement.addEventListener("touchmove", onTouchMove, {
    //     passive: false,
    // });

    return (
        <div id="app">
            <Stats />
            {phaserState == true ? (
                <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            ) : null}
        </div>
    );
}

export default App;

