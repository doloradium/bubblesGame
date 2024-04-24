import { Scene } from 'phaser';

let bubble, halo, pointer;
let frameSpeed = 200;
let joyStickX, joyStickY;
let deltaX, deltaY;
let radius = 110;
let newX, newY;

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

    calculateAngleInRadians(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;

        const angleInRadians = Math.atan2(dy, dx);

        return angleInRadians;
    }

    preload() {
        let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);
        this.load.image('thumb', 'assets/thumb.png');
        this.load.image('base', 'assets/base.png');
        this.load.image('bubble', 'assets/bubble.png');
        this.load.image('food', 'assets/food.png');
        this.load.image('background', 'assets/tile.png');
        this.load.image('halo', 'assets/halo.png');
        this.load.image('pointer', 'assets/pointer.png');
    }

    create() {
        this.start = this.getTime();
        const background = this.add.tileSprite(0, 0, 5800, 10000, 'background').setOrigin(0, 0);
        background.setScale(0.3, 0.3)
        bubble = this.add.image(window.innerWidth / 2 + 2, window.innerHeight / 2 + 2, 'bubble');
        bubble.setScale(0.5, 0.5)
        halo = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'halo');
        halo.setScale(0.65, 0.65)
        halo.setTint(0x00ff00)
        pointer = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'pointer');
        pointer.setScale(0.65, 0.65)
        pointer.setTint(0x00ff00)
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
    }

    update() {
        let deltaTime = this.getDelta();
        if (this.joyStick.forceX != this.joyStick.pointerX) {
            deltaX = this.joyStick.forceX / 60;
            deltaY = -this.joyStick.forceY / 60;
        }
        else {
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
        pointer.setAlpha(1)
        let angle = this.calculateAngleInRadians(joyStickX, joyStickY, this.joyStick.thumb.x, this.joyStick.thumb.y)
        halo.setPosition(halo.x + (deltaX * deltaTime * frameSpeed), halo.y - (deltaY * deltaTime * frameSpeed));
        newX = bubble.x + radius * Math.cos(angle);
        newY = bubble.y + radius * Math.sin(angle);
        pointer.setPosition(newX, newY);
        pointer.setAngle(angle * 180 / Math.PI)
        if (angle / Math.PI == 0) {
            pointer.setAlpha(0)
        }
        this.cameras.main.centerOn(bubble.x, bubble.y);
    }
}




