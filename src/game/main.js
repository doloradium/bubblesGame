import { Boot } from './scenes/Boot';
import Phaser from 'phaser';

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    backgroundColor: '#000',
    activePointers: 3,
    // mode: Phaser.Scale.RESIZE,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    scene: [
        Boot
    ]
};

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });

}

export default StartGame;
