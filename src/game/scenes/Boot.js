import { Scene } from 'phaser';

let bubble;
let frameSpeed = 200;
let joyStickX, joyStickY;
let deltaX, deltaY;

export class Boot extends Scene {
    constructor() {
        super('Boot');
    }

    getTime() {
        let d = new Date();
        return d.getTime();
    }

    getDelta() {
        let elapsed = this.getTime() - this.start;
        this.start = this.getTime();
        return elapsed / 1000;
    }

    preload() {
        let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);
        this.load.image('thumb', 'assets/thumb.png');
        this.load.image('base', 'assets/base.png');
        this.load.image('bubble', 'assets/bubble.png');
        this.load.image('food', 'assets/food.png');
        this.load.image('background', 'assets/tile.png');
    }

    create() {
        this.start = this.getTime();
        const background = this.add.tileSprite(0, 0, 5800, 10000, 'background').setOrigin(0, 0);
        background.setScale(0.3, 0.3)
        bubble = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'bubble');
        bubble.setScale(0.5, 0.5)
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
        let deltaTime = this.getDelta();
        if (this.joyStick.forceX != this.joyStick.pointerX) {
            deltaX = this.joyStick.forceX / 60;
            deltaY = -this.joyStick.forceY / 60;
        } else {
            deltaX = 0;
            deltaY = 0;
        }
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
        bubble.setPosition(bubble.x + (deltaX * deltaTime * frameSpeed), bubble.y - (deltaY * deltaTime * frameSpeed));
        this.cameras.main.centerOn(bubble.x, bubble.y);
        // console.log('deltaX: ', this.joyStick.pointerX, 'deltaY: ', this.joyStick.forceX, 'deltaTime: ', deltaTime)
        // console.log(this.joyStick)
    }
}




