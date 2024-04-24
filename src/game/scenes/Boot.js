import { Scene } from 'phaser';

export class Boot extends Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);
        this.load.image('thumb', '../../../public/assets/thumb.png');
        this.load.image('base', '../../../public/assets/base.png');
    }

    create() {
        let base = this.add.image(0, 0, 'base');
        let thumb = this.add.image(0, 0, 'thumb');
        base.displayHeight = window.innerWidth / 3;
        base.displayWidth = window.innerWidth / 3;
        thumb.displayHeight = window.innerWidth / 6;
        thumb.displayWidth = window.innerWidth / 6;
        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: window.innerWidth * 0.75,
            y: window.innerHeight * 0.85,
            radius: 60,
            base: base,
            thumb: thumb,
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
