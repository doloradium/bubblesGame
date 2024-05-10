import { Scene } from 'phaser';

let bubble, halo, pointer;
let frameSpeed = 200;
let joyStickX, joyStickY;
let deltaX, deltaY;
let radius = 110;
let newX, newY;
let eject, split;
let message;
let room;
let webSocketPath;
let webSocket;
let localObjects = []
let deleteObjects = []
let scene

const searchParams = new URLSearchParams(window.location.search);
const token = searchParams.get('token');
const telegram_id = searchParams.get('telegram_id')

const fetchString = 'https://agario.crypto-loto.xyz/api/join?token=' + token + '&telegram_id=' + telegram_id
console.log(fetchString)


async function sendFormData() {
    try {
        const response = await fetch(fetchString, {
            method: 'GET',
        });

        if (!response.ok) {
            console.log(response)
            throw new Error('Network response was not ok');
        }

        const responseJson = await response.json();
        room = responseJson['room_id']
        webSocketPath = 'wss://agario.crypto-loto.xyz/game/online?token=' + token + '&telegram_id=' + telegram_id + '&room_id=' + room
        newWebSocket()
        console.log(webSocketPath)
    } catch (error) {
        console.error('Error sending form data:', error);
    }
}

function newWebSocket() {
    webSocket = new WebSocket(
        webSocketPath
    );

    webSocket.onopen = function (event) {
        console.log("WebSocket is connected");
        // websocketState = 1;
        setInterval(() => {

            try {
                message = JSON.stringify({ 'action': 'move', 'dx': deltaX, 'dy': deltaY })
                // websocketState === 1 ? webSocket.send(message) : null
                webSocket.send(message)
            } catch (e) { }
            // console.log(message)
            // console.log(receivedMessage)
        }, 100)
    };

    webSocket.onmessage = onMessage

    webSocket.onerror = function (error) {
        console.error("WebSocket Error: ", error);
    };

    webSocket.onclose = function (event) {
        console.log("Connection is closed");
    };
}

function onMessage(event) {
    let receivedMessage = JSON.parse(event.data);
    // console.log(receivedMessage);
    receivedMessage.p_obj.forEach((item) => {
        let have = false
        localObjects.forEach((localItem) => {
            if (localItem.id == item.id) {
                localItem.x = item.x
                localItem.y = item.y
                localItem.size = item.size
                localItem.object.setSize(localItem.size, localItem.size)
                // localItem.object.setPosition(localItem.x, localItem.y);
                have = true
            }
        })
        if (have == false) {
            var object = scene.add.sprite(item.x, item.y, item.type == 'player' ? 'bubble' : 'point');
            object.setDisplaySize(item.size, item.size)
            object.setSize(item.size, item.size)
            object.setOrigin(0.5, 0.5)
            localObjects.push({ id: item.id, type: item.type, x: item.x, y: item.y, size: item.size, object: object })
            if (item.type == "player") {
                localObjects[localObjects.length - 1].player_id = item.player_id;
            }
        }
    })


    //удаление объектов, которые больше не передаются
    localObjects.forEach((localItem) => {
        let have = false
        receivedMessage.p_obj.forEach((item) => {
            if (localItem.id == item.id) have = true
        })
        if (have == false) {
            localItem.object.destroy()
            localObjects.splice(localObjects.indexOf(localItem), 1)
        }
    })
    //---

    localObjects.forEach((localItem) => {
        let have = false
        receivedMessage.p_obj.forEach((item) => {
            if (localItem.id == item.id) {
                have = true
            }
        })
        if (have == false) {
            deleteObjects.push(localItem)
        }
    })
    deleteObjects.forEach((item) => {
        let index = localObjects.indexOf(item);
        localObjects.splice(index, 1)
    })
    deleteObjects = []
}


export class Boot extends Scene {
    constructor() {
        super('Boot');
        scene = this;
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
        this.load.image('point', 'assets/food.png');
        this.load.image('background', 'assets/tile.png');
        this.load.image('halo', 'assets/halo.png');
        this.load.image('pointer', 'assets/pointer.png');
        this.load.image('eject', 'assets/button1.png');
        this.load.image('split', 'assets/button2.png');
        sendFormData()
    }

    create() {
        this.start = this.getTime();
        const background = this.add.tileSprite(0, 0, 5800, 10000, 'background').setOrigin(0, 0);
        background.setScale(0.3, 0.3)
        // halo = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'halo');
        // halo.setScale(0.65, 0.65)
        // halo.setTint(0x00ff00)
        // pointer = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'pointer');
        // pointer.setScale(0.65, 0.65)
        // pointer.setTint(0x00ff00)
        eject = this.add.sprite(51, window.innerHeight - 91, 'eject').setInteractive();
        eject.setScrollFactor(0)
        eject.setScale(0.3);
        split = this.add.sprite(51, window.innerHeight - 178, 'split').setInteractive();
        split.setScrollFactor(0)
        split.setScale(0.3);
        eject.on('pointerdown', function () {
            message = JSON.stringify({ 'action': 'gift', 'dx': deltaX, 'dy': deltaY })
            webSocket.send(message)
            console.log('asdasdasdasdasd')
        });
        split.on('pointerdown', function () {
            message = JSON.stringify({ 'action': 'split', 'dx': deltaX, 'dy': deltaY })
            webSocket.send(message)
        });
        let base = this.add.image(0, 0, 'base');
        let thumb = this.add.image(0, 0, 'thumb');
        base.displayHeight = window.innerWidth / 3;
        base.displayWidth = window.innerWidth / 3;
        thumb.displayHeight = window.innerWidth / 8;
        thumb.displayWidth = window.innerWidth / 8;
        joyStickX = window.innerWidth - 78;
        joyStickY = window.innerHeight - 112;
        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: joyStickX,
            y: joyStickY,
            radius: 44,
            base: base,
            thumb: thumb,
        });
        this.joystickCursors = this.joyStick.createCursorKeys();
    }

    update() {
        let deltaTime = this.getDelta();
        localObjects.forEach((item) => {
            if (item.type == 'player') {
                item.object.setPosition(Phaser.Math.Linear(item.object.x, item.x, 0.04), Phaser.Math.Linear(item.object.y, item.y, 0.04))

                // console.log(item)
                if (item.player_id.toString() == telegram_id) {
                    this.cameras.main.centerOn(item.object.x, item.object.y);
                }
            }
        })

        if (this.joyStick.forceX != this.joyStick.pointerX) {
            deltaX = this.joyStick.forceX / 60;
            deltaY = this.joyStick.forceY / 60;
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
        // pointer.setAlpha(1)
        // let angle = this.calculateAngleInRadians(joyStickX, joyStickY, this.joyStick.thumb.x, this.joyStick.thumb.y)
        // halo.setPosition(halo.x + (deltaX * deltaTime * frameSpeed), halo.y - (deltaY * deltaTime * frameSpeed));
        // newX = bubble.x + radius * Math.cos(angle);
        // newY = bubble.y + radius * Math.sin(angle);
        // pointer.setPosition(newX, newY);
        // pointer.setAngle(angle * 180 / Math.PI)
        // if (angle / Math.PI == 0) {
        //     pointer.setAlpha(0)
        // }
    }
}



