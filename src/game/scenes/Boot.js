import { Scene } from 'phaser';

let bubble;
let joyStickX, joyStickY;
let deltaX, deltaY;

export class Boot extends Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);
        this.load.image('thumb', '../../../public/assets/thumb.png');
        this.load.image('base', '../../../public/assets/base.png');
        this.load.image('bubble', '../../../public/assets/bubble.png');
        this.load.image('food', '../../../public/assets/food.png');
        this.load.image('background', '../../../public/assets/tile.png');
    }

    create() {

        const background = this.add.tileSprite(0, 0, 5800, 10000, 'background').setOrigin(0, 0);
        background.setScale(0.3, 0.3)
        bubble = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'bubble');
        let base = this.add.image(0, 0, 'base');
        let thumb = this.add.image(0, 0, 'thumb');
        base.displayHeight = window.innerWidth / 3;
        base.displayWidth = window.innerWidth / 3;
        thumb.displayHeight = window.innerWidth / 6;
        thumb.displayWidth = window.innerWidth / 6;
        joyStickX = window.innerWidth * 0.75;
        joyStickY = window.innerHeight * 0.85;
        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: joyStickX,
            y: joyStickY,
            radius: 60,
            base: base,
            thumb: thumb,
        });
        this.joystickCursors = this.joyStick.createCursorKeys();
        console.log(this.joyStick)
    }

    update() {
        // this.background.tilePositionX = this.cameras.main.scrollX;
        this.cameras.main.centerOn(bubble.x, bubble.y);
        deltaX = this.joyStick.forceX / 60;
        deltaY = -this.joyStick.forceY / 60;
        if (deltaX > 1) {
            deltaX = 1
        }
        if (deltaX < -1) {
            deltaX = -1
        }
        if (deltaY > 1) {
            deltaY = 1
        }
        if (deltaY < -1) {
            deltaY = -1
        }
        console.log('deltaX: ', deltaX, 'deltaY: ', deltaY)
        bubble.setPosition(bubble.x + deltaX, bubble.y - deltaY);
    }
}




