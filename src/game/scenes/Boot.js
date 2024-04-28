import { Scene } from 'phaser';

async function sendFormData() {
    try {
        const response = await fetch('https://595ffe397d5c11c5444aff2946388f42.serveo.net/api/join?token=2222&telegram_id=3333', {
            method: 'GET',
        });

        if (!response.ok) {
            console.log(response)
            throw new Error('Network response was not ok');
        }

        const responseJson = await response.json();
        room = responseJson['room_id']
        webSocketPath = 'ws://595ffe397d5c11c5444aff2946388f42.serveo.net/game/online?token=2222&telegram_id=3333&room_id=' + room
        newWebSocket()
        console.log(webSocketPath)
    } catch (error) {
        console.error('Error sending form data:', error);
    }
}

let bubble, halo, pointer;
let frameSpeed = 200;
let joyStickX, joyStickY;
let deltaX, deltaY;
let radius = 110;
let newX, newY;
let eject, split;
// let websocketState
let message;
let receivedMessage = '';
let room;
let webSocketPath;
let webSocket

sendFormData()

function newWebSocket() {
    webSocket = new WebSocket(
        webSocketPath
    );

    webSocket.onopen = function (event) {
        console.log("WebSocket is connected");
        // websocketState = 1;
        setInterval(() => {
            message = JSON.stringify({ 'action': 'move', 'delta_x': deltaX, 'delta_y': deltaY })
            // websocketState === 1 ? webSocket.send(message) : null
            webSocket.send(message)
            // console.log(receivedMessage)
        }, 100)
    };

    webSocket.onmessage = function (event) {
        receivedMessage = JSON.parse(event.data);
        console.log(receivedMessage);
        // receivedMessage.room.players.map((item) => {
        //     window['bubble' + item.player_id] = this.add.image(window.innerWidth / 2 + 2, window.innerHeight / 2 + 2, 'bubble');
        //     window['bubble' + item.player_id].setScale(0.5, 0.5)
        // })
    };

    webSocket.onerror = function (error) {
        console.error("WebSocket Error: ", error);
    };

    webSocket.onclose = function (event) {
        console.log("Connection is closed");
    };
}

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
        this.load.image('eject', 'assets/button1.png');
        this.load.image('split', 'assets/button2.png');
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
        eject = this.add.sprite(window.innerWidth * 0.18, window.innerHeight * 0.89, 'eject').setInteractive();
        eject.setScrollFactor(0)
        eject.setScale(0.3);
        split = this.add.sprite(window.innerWidth * 0.18, window.innerHeight * 0.73, 'split').setInteractive();
        split.setScrollFactor(0)
        split.setScale(0.3);
        eject.on('pointerdown', function () {
            console.log('Eject');
        });
        split.on('pointerdown', function () {
            console.log('Split');
        });
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
        // console.log(receivedMessage.telegram_id)
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



