import { Scene } from 'phaser';

import websocketStats from '../../data/websocketStats';
import websocketManager from '../../data/websocketManager';
import bubbles from '../../data/bubbles';

let joyStickX, joyStickY;
let mainPosition = { x: 0, y: 0 }
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
let coordinates
let background
let halo, pointer
let userStats = []
let allUsers = {};
let playerBubbles = []
let pop, shrink
let myTimer
let userSkins = []
let cameraX = 0, cameraY = 0
let playerX = 0, playerY = 0, playerSize = 0
let lastDX = 0.5, lastDY = 0;
let colors = ['0xE400BF', '0xFF7A00', '0x8236FF', '0x0075FF', '0x43D2CA', '0x04C800', '0xFFF500']

import { getNameNew } from '../../api/apiBubbles';

const searchParams = new URLSearchParams(window.location.search);
const token = searchParams.get('token');
const telegram_id = searchParams.get('telegram_id')
const fetchString = 'https://agario.crypto-loto.xyz/api/join'
console.log(fetchString, telegram_id, token)

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

function Centroid(points) {
    let minX = 5000
    let minY = 5000
    let maxX = 0
    let maxY = 0
    points.forEach((item) => {
        if (item.x < minX) { minX = item.x }
        if (item.x > maxX) { maxX = item.x }
        if (item.y < minY) { minY = item.y }
        if (item.y > maxY) { maxY = item.y }
    })
    cameraX = (maxX + minX) / 2
    cameraY = (maxY + minY) / 2
}

function vectorLength(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let length = Math.sqrt(dx * dx + dy * dy);
    return length;
}

async function sendFormData() {
    console.log(websocketStats.bet)
    if (webSocket != null) {
        return;
    }
    try {
        const response = await fetch(fetchString, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                telegram_id: telegram_id,
                bet: websocketStats.bet,
                skin: websocketStats.skin
            })
        });

        if (!response.ok) {
            console.log(response)
            webSocket = null
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
        const response = await fetch('https://agario.crypto-loto.xyz/api/getname?telegram_id=' + userId + '&room_id=' + room);
        const data = await response.json();
        return { "name": data.username, "id": userId, 'skin': data.skin };
    } catch (error) {
        console.error('Error:', error);
    }
}

function newWebSocket() {
    if (webSocket) {
        return
    }

    clearInterval(myTimer)
    webSocket = new WebSocket(
        webSocketPath
    );

    webSocket.onopen = function (event) {
        console.log("WebSocket is connected");
        myTimer = setInterval(() => {

            try {
                if (webSocket) {
                    if (deltaX != 0 || deltaY != 0) {
                        lastDX = deltaX;
                        lastDY = deltaY;
                    }
                    message = JSON.stringify({ 'action': 'move', 'dx': deltaX, 'dy': deltaY })
                    webSocket.send(message)
                }
            } catch (e) {
                console.log(e)
            }
        }, 50)
        websocketManager.push({ socket: webSocket, timer: myTimer })
    };

    webSocket.onmessage = function (event) {
        let receivedMessage
        event.data.length > 0 ? receivedMessage = JSON.parse(event.data) : null
        let last = Date.now() / 1000
        ping.setText(`ping: ${Math.round((last - receivedMessage.sent_at) * 1000)} ms`);
        userStats = []
        if (receivedMessage.action == 'lose') {
            let modal = document.querySelector('#loseModal')
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
            websocketStats.health = receivedMessage.my_data.health
            websocketStats.score = receivedMessage.my_data.score
        }
        receivedMessage.p_obj.forEach((item) => {
            let have = false
            localObjects.forEach((localItem) => {
                if (localItem.id == item.id) {
                    if (playerX != 0 && playerY != 0) {
                        let percentage = 0
                        if (vectorLength(localItem.x, localItem.y, playerX, playerY) <= playerSize * 6) {
                            if (vectorLength(localItem.x, localItem.y, playerX, playerY) == 0) {
                                percentage = 1
                            } else {
                                percentage = 1 - (Math.round(vectorLength(localItem.x, localItem.y, playerX, playerY)) / Math.round(playerSize * 6))
                                percentage = +percentage.toFixed(1)
                            }
                        }
                        if (localItem.type == 'player' && localItem.size < item.size) {
                            pop.setVolume(percentage)
                            pop.play()
                        } else if (localItem.type == 'player' && localItem.size > item.size) {
                            shrink.setVolume(percentage)
                            shrink.play()
                        }
                    }
                    localItem.x = item.x
                    localItem.y = item.y
                    localItem.size = item.size
                    localItem.main = item.main
                    if (localItem.type == "gift") {
                        item.size = 20;
                    }
                    have = true
                }
            })
            if (!have) {
                if (item.player_id) {
                    getName(item.player_id).then((value) => {
                        if (value.id) {
                            userSkins.push({ id: value.id, skin: value.skin })
                        }
                        console.log(userSkins)
                    });
                }
                let object
                if (item.type == 'point' || item.type == 'gift') {
                    object = scene.add.sprite(item.x, item.y, 'point')
                } else if (item.type == 'player' || item.type == 'split') {
                    object = scene.add.sprite(item.x, item.y, 'shiba')
                }
                object.setDisplaySize(item.size * 2, item.size * 2)
                object.setOrigin(0.5, 0.5)
                object.depth = item.size
                localObjects.push({ id: item.id, type: item.type, x: item.x, y: item.y, size: item.size, object: object, main: item.main })
                if (item.player_id == telegram_id) {
                    playerBubbles.push({ x: item.x, y: item.y, size: item.size })
                }
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
                    UICam.ignore([graphics]);
                    localObjects[localObjects.length - 1].player_id = item.player_id;
                    localObjects[localObjects.length - 1].text = text;
                    localObjects[localObjects.length - 1].graphics = graphics;
                } else if (item.type == 'point') {
                    object.setDisplaySize(item.size * 20, item.size * 20)
                    object.setTint(colors[getRandom(7)])
                } else if (item.type == 'gift') {
                    object.setDisplaySize(item.size * 4, item.size * 4)
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
                playerBubbles.splice(playerBubbles.indexOf(localItem.object), 1)
                if (localItem.type == "player") {
                    localItem.text.destroy()
                    localItem.graphics.destroy()
                }
                localObjects.splice(localObjects.indexOf(localItem), 1)
            }
        })
    }

    webSocket.onerror = function (error) {
        console.error("WebSocket Error: ", error);
    };

    webSocket.onclose = function (event) {
        webSocket = null
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
        this.load.svg('ton', 'assets/ton.svg', { width: 300, height: 300 });
        this.load.svg('bitcoin', 'assets/bitcoin.svg', { width: 300, height: 300 });
        this.load.svg('bnb', 'assets/bnb.svg', { width: 300, height: 300 });
        this.load.svg('doge', 'assets/doge.svg', { width: 300, height: 300 });
        this.load.svg('ethereum', 'assets/ethereum.svg', { width: 300, height: 300 });
        this.load.svg('polygon', 'assets/polygon.svg', { width: 300, height: 300 });
        this.load.svg('shiba', 'assets/shiba.svg', { width: 300, height: 300 });
        this.load.svg('solana', 'assets/solana.svg', { width: 300, height: 300 });
        this.load.svg('tron', 'assets/tron.svg', { width: 300, height: 300 });
        this.load.svg('xrp', 'assets/xrp.svg', { width: 300, height: 300 });
        this.load.svg('point', 'assets/food.svg', { width: 100, height: 100 });
        this.load.svg('background', 'assets/background.svg', { width: 290, height: 492 });
        this.load.svg('halo', 'assets/halo.svg', { width: 350, height: 350 });
        this.load.svg('pointer', 'assets/pointer.svg', { width: 40, height: 40 });
        this.load.svg('gift', 'assets/gift.svg', { width: 300, height: 300 });
        this.load.svg('split', 'assets/split.svg', { width: 300, height: 300 });
        this.load.audio("pop", ["sounds/gamePop.mp3"]);
        this.load.audio("backMusic", ["sounds/background.mp3"]);
        this.load.audio("shrink", ["sounds/shrink.mp3"]);
        sendFormData()
    }

    create() {
        pop = this.sound.add("pop", { loop: false });
        shrink = this.sound.add("shrink", { loop: false });
        let backMusic = this.sound.add("backMusic", { loop: true, volume: 0.5 });
        backMusic.play()
        localObjects = []
        userStats = []
        this.start = this.getTime();
        background = this.add.tileSprite(window.innerWidth, window.innerHeight, window.innerWidth * 2, window.innerHeight * 2, 'background').setOrigin(0.5, 0.5);
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
        coordinates = scene.add.text(16, 150, 'loading', {
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
        UICam.ignore([pointer, halo])
        this.cameras.main.ignore([this.joyStick.base, this.joyStick.thumb, split, gift, coordinates, ping]);
    }

    update() {
        playerBubbles.length = 0
        localObjects.forEach((item) => {
            UICam.ignore([item.object])
            if (item.type == 'player' || item.type == 'split' || item.type == 'gift') {
                item.object.setPosition(Phaser.Math.Linear(item.object.x, item.x, 0.2), Phaser.Math.Linear(item.object.y, item.y, 0.2))
                if (item.type == 'player' || item.type == 'split') {
                    item.object.setDisplaySize(Phaser.Math.Linear(item.object.displayWidth, item.size * 2, 0.2), Phaser.Math.Linear(item.object.displayHeight, item.size * 2, 0.2))
                }
                if (item.player_id == telegram_id) {
                    if (item.main) {
                        mainPosition.x = item.object.x
                        mainPosition.y = item.object.y
                    }
                    coordinates.setText(`x: ${Math.round(item.x)}, y: ${Math.round(item.y)}`);
                    playerX = item.x
                    playerY = item.y
                    playerSize = item.size
                    if (playerSize < 30) {
                        gift.setAlpha(0.5)
                        gift.disableInteractive()
                    } else {
                        gift.setAlpha(1)
                        gift.setInteractive()
                    }
                    if (playerSize < 40) {
                        split.setAlpha(0.5)
                        split.disableInteractive()
                    } else {
                        split.setAlpha(1)
                        split.setInteractive()
                    }
                    let userScore = 0
                    localObjects.forEach((item) => {
                        if (item.player_id == telegram_id) {
                            playerBubbles.push({ x: item.object.x, y: item.object.y })
                            userScore += item.size
                        }
                    })
                    Centroid(playerBubbles)
                    this.cameras.main.centerOn(cameraX, cameraY);
                    background.setPosition(cameraX, cameraY)
                    background.tilePositionX = cameraX
                    background.tilePositionY = cameraY
                    this.cameras.main.setZoom(125 / Phaser.Math.Linear(item.object.displayWidth, item.size, 0.2), 125 / Phaser.Math.Linear(item.object.displayWidth, item.size, 0.2));
                    zoomFactor = this.cameras.main.zoom
                    background.setScale(1 / zoomFactor)
                }
                if (item.type == 'player') {
                    item.text.setText(allUsers[item.player_id] ?? "");
                    userSkins.forEach((skinItem) => {
                        if (item.player_id == skinItem.id) { item.object.setTexture(bubbles[skinItem.skin - 1].name) }
                    })
                    let graphics = scene.add.graphics();
                    UICam.ignore([graphics]);
                    graphics.depth = 10009;
                    graphics.lineStyle(2 / zoomFactor, 0x5855FF);
                    graphics.fillStyle(0x0E0923, 1)
                    item.text.depth = 10011;
                    item.text.setScale(0.4 / zoomFactor)
                    item.text.setPosition(item.object.x, item.object.y + item.size);
                    if (item.main) {
                        graphics.setAlpha(1)
                        item.text.setAlpha(1)
                    } else {
                        graphics.setAlpha(0)
                        item.text.setAlpha(0)
                    }
                    if (item.player_id == telegram_id) {
                        item.text.setOrigin(0.5, -1)
                        graphics.fillRoundedRect(item.text.x - item.text.displayWidth / 2 - 10 / zoomFactor, item.text.y + item.text.displayHeight - 1, item.text.displayWidth + 20 / zoomFactor, item.text.displayHeight + 3, 10 / zoomFactor);
                        graphics.strokeRoundedRect(item.text.x - item.text.displayWidth / 2 - 10 / zoomFactor, item.text.y + item.text.displayHeight - 1, item.text.displayWidth + 20 / zoomFactor, item.text.displayHeight + 3, 10 / zoomFactor);
                    } else {
                        item.text.setOrigin(0.5, -0.5)
                        graphics.fillRoundedRect(item.text.x - item.text.displayWidth / 2 - 10 / zoomFactor, item.text.y + item.text.displayHeight / 2 - 1, item.text.displayWidth + 20 / zoomFactor, item.text.displayHeight + 3, 10 / zoomFactor);
                        graphics.strokeRoundedRect(item.text.x - item.text.displayWidth / 2 - 10 / zoomFactor, item.text.y + item.text.displayHeight / 2 - 1, item.text.displayWidth + 20 / zoomFactor, item.text.displayHeight + 3, 10 / zoomFactor);
                    }
                    item.graphics.destroy()
                    item.graphics = graphics;
                }
            }
        })
        pointer.setAlpha(1)
        halo.setDisplaySize(playerSize * 2 + playerSize / 2, playerSize * 2 + playerSize / 2)
        pointer.setDisplaySize(playerSize / 2, playerSize / 2)
        let angle = scene.calculateAngleInRadians(joyStickX, joyStickY, scene.joyStick.thumb.x, scene.joyStick.thumb.y)
        newX = mainPosition.x + (playerSize + playerSize / 2.75) * Math.cos(angle);
        newY = mainPosition.y + (playerSize + playerSize / 2.75) * Math.sin(angle);
        halo.setPosition(mainPosition.x, mainPosition.y)
        pointer.setPosition(newX, newY);
        pointer.setAngle(angle * 180 / Math.PI)
        if (angle / Math.PI == 0) {
            pointer.setAlpha(0)
        }
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