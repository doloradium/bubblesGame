import { Scene } from 'phaser';

import websocketStats from '../../data/websocketStats';
import websocketManager from '../../data/websocketManager';

let joyStickX, joyStickY;
let deltaX, deltaY;
let newX, newY;
let gift, split;
let message;
let room;
let zoomFactor;
let webSocketPath;
let webSocket;
let localObjects = []
let scene
let UICam
let ping
let background
let halo, pointer
let userStats = []
let allUsers = {};
let lastDX = 0.5, lastDY = 0;
let colors = ['0xE400BF', '0xFF7A00', '0x8236FF', '0x0075FF', '0x43D2CA', '0x04C800', '0xFFF500']

const searchParams = new URLSearchParams(window.location.search);
const token = searchParams.get('token');
const telegram_id = searchParams.get('telegram_id')
const fetchString = 'https://agario.crypto-loto.xyz/api/join?token=' + token + '&telegram_id=' + telegram_id
console.log(fetchString)

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

async function sendFormData() {
    if (webSocket) {
        return;
    }
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

async function getName(userId) {
    try {
        const response = await fetch('https://agario.crypto-loto.xyz/api/getname?telegram_id=' + userId);
        const data = await response.json();
        return { "name": data.user_name, "id": userId };
    } catch (error) {
        console.error('Error:', error);
    }
}

function newWebSocket() {
    webSocket = new WebSocket(
        webSocketPath
    );

    webSocket.onopen = function (event) {
        console.log("WebSocket is connected");
        let myTimer = setInterval(() => {
            try {
                if (deltaX != 0 || deltaY != 0) {
                    lastDX = deltaX;
                    lastDY = deltaY;
                }
                message = JSON.stringify({ 'action': 'move', 'dx': deltaX, 'dy': deltaY })
                webSocket.send(message)
            } catch (e) {
                clearInterval(myTimer)
            }
        }, 50)
        websocketManager.push({ socket: webSocket, timer: myTimer })
    };

    webSocket.onmessage = function (event) {
        let receivedMessage
        event.data.length > 0 ? receivedMessage = JSON.parse(event.data) : null
        userStats = []
        console.log(receivedMessage)
        if (receivedMessage.action == 'lose') {
            let modal = document.querySelector('#loseModal')
            // console.log(modal)
            modal.style.display = 'block'
            setTimeout(() => {
                modal.style.opacity = 1;
            }, 100);
        }
        if (typeof (event.data.top) != undefined) {
            receivedMessage.top.forEach(async (item) => {
                if (allUsers[item.user_id]) {
                    userStats.push({ user_id: allUsers[item.user_id], size: Math.floor(item.size) })
                } else {
                    getName(item.user_id).then((value) => {
                        allUsers[value["id"]] = value["name"];
                    });
                }
            })
            websocketStats.users = userStats
            websocketStats.status = receivedMessage.sent_at == 'undefined' ? 'loading' : 'ready'
        }

        let last = Date.now() / 1000
        if (receivedMessage.action == 'update') {
            let popup = document.querySelector('#defaultModal')
        }
        ping.setText(`ping: ${Math.round((last - receivedMessage.sent_at) * 1000)} ms`);
        receivedMessage.p_obj.forEach((item) => {
            let have = false
            localObjects.forEach((localItem) => {
                if (localItem.id == item.id) {
                    localItem.x = item.x
                    localItem.y = item.y
                    localItem.size = item.size
                    if (localItem.type == "gift") {
                        item.size = 20;
                    }
                    have = true
                }
            })
            if (!have) {
                let object = scene.add.sprite(item.x, item.y, item.type == 'player' ? 'bubble' : 'point');
                object.setDisplaySize(item.size * 2, item.size * 2)
                object.setOrigin(0.5, 0.5)
                object.depth = item.id
                localObjects.push({ id: item.id, type: item.type, x: item.x, y: item.y, size: item.size, object: object })
                if (item.type == "player") {
                    let text = scene.add.text(item.x, item.y - item.size * 1.2, '', {
                        fontFamily: 'Inter',
                    });
                    text.depth = 10010;
                    text.setAlign("center");
                    if (allUsers[item.player_id] == null) {
                        getName(item.player_id).then((value) => {
                            allUsers[value["id"]] = value["name"];
                        });
                    }
                    text.setFontSize(96);
                    let graphics = scene.add.graphics();
                    graphics.fillStyle(0xFF0000, 1);
                    graphics.lineStyle(20, 0xFFFFFF, 1);
                    graphics.depth = 10009;
                    graphics.strokeRoundedRect(item.x, item.y, text.displayWidth, text.displayHeight, 5);
                    UICam.ignore([text]);
                    localObjects[localObjects.length - 1].player_id = item.player_id;
                    localObjects[localObjects.length - 1].text = text;
                    localObjects[localObjects.length - 1].graphics = graphics;
                } else if (item.type == 'point') {
                    object.setDisplaySize(item.size * 20, item.size * 20)
                    object.setTint(colors[getRandom(7)])
                }
            }
        })

        localObjects.forEach((localItem) => {
            let have = false
            receivedMessage.p_obj.forEach((item) => {
                if (localItem.id == item.id) have = true
            })
            if (have == false) {
                localItem.object.destroy()
                if (localItem.type == "player") {
                    localItem.text.destroy()
                }
                localObjects.splice(localObjects.indexOf(localItem), 1)
            }
        })
    }

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
        webSocket = undefined
        let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);
        this.load.svg('thumb', 'assets/thumb.svg', { width: window.innerWidth / 2, height: window.innerWidth / 2 });
        this.load.svg('base', 'assets/base.svg', { width: window.innerWidth / 0.75, height: window.innerWidth / 0.75 });
        this.load.svg('bubble', 'assets/bubble.svg', { width: 300, height: 300 });
        this.load.svg('point', 'assets/food.svg', { width: 100, height: 100 });
        this.load.svg('background', 'assets/background.svg', { width: 290, height: 492 });
        this.load.svg('halo', 'assets/halo.svg', { width: 500, height: 500 });
        this.load.svg('pointer', 'assets/pointer.svg', { width: 40, height: 40 });
        this.load.svg('gift', 'assets/gift.svg', { width: 300, height: 300 });
        this.load.svg('split', 'assets/split.svg', { width: 300, height: 300 });
        sendFormData()
    }

    create() {
        localObjects = []
        userStats = []
        this.start = this.getTime();
        background = this.add.tileSprite(0, 0, window.innerWidth * 2, window.innerHeight * 2, 'background').setOrigin(0.5, 0.5);
        gift = this.add.sprite(102, (window.innerHeight - 91) * 2, 'gift').setInteractive();
        gift.setDisplaySize(150, 150)
        gift.setScrollFactor(0)
        gift.depth = 10000;
        split = this.add.sprite(102, (window.innerHeight - 178) * 2, 'split').setInteractive();
        split.setDisplaySize(150, 150)
        split.setScrollFactor(0)
        split.depth = 10000;
        this.input.addPointer(3);
        gift.on('pointerdown', function () {
            message = JSON.stringify({ 'action': 'gift', 'dx': lastDX, 'dy': lastDY })
            webSocket.send(message)
        });
        split.on('pointerdown', function () {
            message = JSON.stringify({ 'action': 'split', 'dx': deltaX, 'dy': deltaY })
            webSocket.send(message)
        });
        let base = this.add.image(0, 0, 'base');
        let thumb = this.add.image(0, 0, 'thumb');
        base.depth = 10000;
        base.displayHeight = window.innerWidth / 1.5;
        base.displayWidth = window.innerWidth / 1.5;
        thumb.displayHeight = window.innerWidth / 4;
        thumb.displayWidth = window.innerWidth / 4;
        thumb.depth = 10001;
        joyStickX = (window.innerWidth - 78) * 2;
        joyStickY = (window.innerHeight - 112) * 2;
        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: joyStickX,
            y: joyStickY,
            radius: 80,
            base: base,
            thumb: thumb,
        });
        this.joystickCursors = this.joyStick.createCursorKeys();
        UICam = this.cameras.add(0, 0, window.innerWidth * 2, window.innerHeight * 2);
        UICam.ignore([background]);
        ping = scene.add.text(16, 128, 'loading', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#ffffff'
        });
        halo = this.add.sprite(window.innerWidth, window.innerHeight, 'halo')
        halo.depth = 9998
        halo.setOrigin(0.5, 0.5)
        halo.setScale(0.5)
        pointer = scene.add.sprite(0, 0, 'pointer');
        pointer.setOrigin(0.5, 0.5)
        pointer.depth = 9999
        this.cameras.main.ignore([this.joyStick.base, this.joyStick.thumb, split, gift, halo, pointer]);
    }

    update() {
        pointer.setAlpha(1)
        let angle = scene.calculateAngleInRadians(joyStickX, joyStickY, scene.joyStick.thumb.x, scene.joyStick.thumb.y)
        newX = window.innerWidth + (window.innerWidth / 3.1) * Math.cos(angle);
        newY = window.innerHeight + (window.innerWidth / 3.1) * Math.sin(angle);
        pointer.setPosition(newX, newY);
        pointer.setAngle(angle * 180 / Math.PI)
        if (angle / Math.PI == 0) {
            pointer.setAlpha(0)
        }
        localObjects.forEach((item) => {
            UICam.ignore([item.object])
            if (item.type == 'player' || item.type == 'split' || item.type == 'gift') {
                item.object.setPosition(Phaser.Math.Linear(item.object.x, item.x, 0.2), Phaser.Math.Linear(item.object.y, item.y, 0.2))
                item.object.setDisplaySize(Phaser.Math.Linear(item.object.displayWidth, item.size * 2, 0.2), Phaser.Math.Linear(item.object.displayHeight, item.size * 2, 0.2))
                if (item.player_id == telegram_id) {
                    this.cameras.main.centerOn(item.object.x, item.object.y);
                    background.setPosition(item.object.x, item.object.y)
                    background.tilePositionX = item.object.x
                    background.tilePositionY = item.object.y
                    this.cameras.main.setZoom(175 / Phaser.Math.Linear(item.object.displayWidth, item.size, 0.2), 175 / Phaser.Math.Linear(item.object.displayWidth, item.size, 0.2));
                    zoomFactor = this.cameras.main.zoom
                    background.setScale(1 / zoomFactor)
                }
                if (item.type == 'player') {
                    item.text.setText(allUsers[item.player_id] ?? "");
                    item.graphics.setPosition(item.text.x, item.text.y)
                    if (item.player_id == telegram_id) {
                        item.text.setOrigin(0.5, -1)
                    } else {
                        item.text.setOrigin(0.5, -0.5)
                    }

                    let graphics = scene.add.graphics();
                    graphics.depth = 10009;
                    graphics.lineStyle(2 / zoomFactor, 0x5855FF);
                    graphics.fillStyle(0x0E0923, 1)
                    item.text.depth = 10011;
                    item.text.setScale(0.4 / zoomFactor)
                    item.text.setPosition(item.object.x, item.object.y + item.size);
                    graphics.fillRoundedRect(item.text.x - item.text.displayWidth / 2 - 10 / zoomFactor, item.text.y + item.text.displayHeight - 1, item.text.displayWidth + 20 / zoomFactor, item.text.displayHeight + 3, 10 / zoomFactor);
                    graphics.strokeRoundedRect(item.text.x - item.text.displayWidth / 2 - 10 / zoomFactor, item.text.y + item.text.displayHeight - 1, item.text.displayWidth + 20 / zoomFactor, item.text.displayHeight + 3, 10 / zoomFactor);
                    item.graphics.destroy()
                    item.graphics = graphics;
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