import { Scene } from 'phaser';

export class Boot extends Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);
    }

    create() {
        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: window.innerWidth * 0.8,
            y: window.innerHeight * 0.85,
            base: this.add.circle(0, 0, window.innerWidth * 0.18, 0x888888),
            thumb: this.add.circle(0, 0, window.innerWidth * 0.08, 0xcccccc),
        });
        this.joystickCursors = this.joyStick.createCursorKeys();
    }

    update() {
        // if (this.joystickCursors.up.isDown) {
        //     jugador.setVelocityY(-200);
        // }
        // else if (this.joystickCursors.down.isDown) {
        //     jugador.setVelocityY(200);
        // }
        // else if (this.joystickCursors.left.isDown) {
        //     jugador.setVelocityX(-200);
        // }
        // else if (this.joystickCursors.right.isDown) {
        //     jugador.setVelocityX(200);
        // }
        // else {
        //     jugador.setVelocity(0);
        // }
    }
}
