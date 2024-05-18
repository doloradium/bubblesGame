import { Scene } from 'phaser';

import websocketManager from '../../data/websocketManager';

let joyStickX, joyStickY;
let deltaX, deltaY;
let newX, newY;
let eject, split;
let message;
let room;
let webSocketPath;
let webSocket;
let localObjects = []
// let deleteObjects = []
let scene
let UICam
let timers = []

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
        console.log(websocketManager, websocketManager.length)
        websocketManager.length == 0 ? newWebSocket() : null
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
        websocketManager.length == 0 ? websocketManager.push(webSocket) : null
        console.log(timers)
        // console.log(websocketManager.length)
        console.log("WebSocket is connected");
        let myTimer = setInterval(() => {
            // console.log(websocketManager.length)
            try {
                message = JSON.stringify({ 'action': 'move', 'dx': deltaX, 'dy': deltaY })
                webSocket.send(message)
                // console.log(websocketManager, websocketManager.length)
            } catch (e) { }
        }, 100)
        timers.push(myTimer)
    };

    webSocket.onmessage = onMessage

    webSocket.onerror = function (error) {
        console.error("WebSocket Error: ", error);
    };

    webSocket.onclose = function (event) {
        timers.forEach((item) => {
            clearTimeout(item)
        })
        localObjects.length = 0
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
                console.log(localItem)
                localItem.object.setDisplaySize(localItem.size * 2, localItem.size * 2)
                if (localItem.type == 'player') {
                    localItem.halo.setDisplaySize((localItem.size + localItem.size / 5) * 2, (localItem.size + localItem.size / 5) * 2)
                }
                have = true
            }
        })
        if (have == false) {
            let object = scene.add.sprite(item.x, item.y, item.type == 'player' ? 'bubble' : 'point');
            object.setDisplaySize(item.size * 2, item.size * 2)
            object.setOrigin(0.5, 0.5)
            object.depth = item.id
            let halo, pointer
            if (item.type == 'player') {
                halo = scene.add.circle(
                    item.x,
                    item.y,
                    item.size + item.size / 5,
                    0xFF0000,
                    0
                );
                pointer = scene.add.sprite(item.x, item.y, 'pointer');
                pointer.setOrigin(0.5, 0.5)
                pointer.setScale(0.1, 0.1)
                pointer.setTint(0xff0000)
                pointer.setAlpha(1)
                pointer.depth = 10000
                halo.setStrokeStyle(0.25, 0xff0000);
                halo.depth = item.id - 1
                halo.setOrigin(0.5, 0.5)
            }
            localObjects.push({ id: item.id, type: item.type, x: item.x, y: item.y, size: item.size, object: object, halo: halo, pointer: pointer })
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

    // localObjects.forEach((localItem) => {
    //     let have = false
    //     receivedMessage.p_obj.forEach((item) => {
    //         if (localItem.id == item.id) {
    //             have = true
    //         }
    //     })
    //     if (have == false) {
    //         deleteObjects.push(localItem)
    //     }
    // })
    // deleteObjects.forEach((item) => {
    //     let index = localObjects.indexOf(item);
    //     localObjects.splice(index, 1)
    // })
    // deleteObjects = []
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
        websocketManager == 0 ? sendFormData() : null
    }

    create() {
        this.cameras.roundPx = false;
        this.start = this.getTime();
        const background = this.add.tileSprite(0, 0, 5000, 5000, 'background').setOrigin(0, 0);
        background.setScale(0.3, 0.3)
        eject = this.add.sprite(51, window.innerHeight - 91, 'eject').setInteractive();
        eject.setScrollFactor(0)
        eject.setScale(0.3);
        eject.depth = 10000;
        split = this.add.sprite(51, window.innerHeight - 178, 'split').setInteractive();
        split.setScrollFactor(0)
        split.setScale(0.3);
        split.depth = 10000;
        eject.on('pointerdown', function () {
            message = JSON.stringify({ 'action': 'gift', 'dx': deltaX, 'dy': deltaY })
            webSocket.send(message)
        });
        split.on('pointerdown', function () {
            message = JSON.stringify({ 'action': 'split', 'dx': deltaX, 'dy': deltaY })
            webSocket.send(message)
        });
        let base = this.add.image(0, 0, 'base');
        let thumb = this.add.image(0, 0, 'thumb');
        base.depth = 10000;
        base.displayHeight = window.innerWidth / 3;
        base.displayWidth = window.innerWidth / 3;
        thumb.displayHeight = window.innerWidth / 8;
        thumb.displayWidth = window.innerWidth / 8;
        thumb.depth = 10001;
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
        UICam = this.cameras.add(0, 0, window.innerWidth, window.innerHeight);
        this.cameras.main.ignore([this.joyStick.base, this.joyStick.thumb, split, eject]);
        UICam.ignore([background]);
    }

    update() {
        // let deltaTime = this.getDelta();
        localObjects.forEach((item) => {
            UICam.ignore([item.object])
            if (item.type == 'player' || item.type == 'split' || item.type == 'gift') {
                item.halo.setPosition(Phaser.Math.Linear(item.object.x, item.x, 0.04), Phaser.Math.Linear(item.object.y, item.y, 0.04))
                item.object.setPosition(Phaser.Math.Linear(item.object.x, item.x, 0.04), Phaser.Math.Linear(item.object.y, item.y, 0.04))
                // let angle = scene.calculateAngleInRadians(joyStickX, joyStickY, scene.joyStick.thumb.x, scene.joyStick.thumb.y)
                // newX = item.object.x + (item.size + item.size / 5) * Math.cos(angle);
                // newY = item.object.y + (item.size + item.size / 5) * Math.sin(angle);
                // item.pointer.setPosition(newX, newY);
                // item.pointer.setAngle(angle * 180 / Math.PI)
                // if (angle / Math.PI == 0) {
                //     item.pointer.setAlpha(0)
                // }
                if (item.player_id == telegram_id) {
                    this.cameras.main.centerOn(item.object.x, item.object.y);
                    this.cameras.main.setZoom(120 / item.size, 120 / item.size);
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
    }
}



