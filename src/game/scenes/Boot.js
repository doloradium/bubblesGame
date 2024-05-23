import { Scene } from 'phaser';

import websocketStats from '../../data/websocketStats';

let joyStickX, joyStickY;
let deltaX, deltaY;
let newX, newY;
let eject, split;
let message;
let room;
let webSocketPath;
let webSocket;
let localObjects = []
let scene
let UICam
let ping
let background
let halo, pointer
let userStats = []

const searchParams = new URLSearchParams(window.location.search);
const token = searchParams.get('token');
const telegram_id = searchParams.get('telegram_id')

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

let colors = ['0xE400BF', '0xFF7A00', '0x8236FF', '0x0075FF', '0x43D2CA', '0x04C800', '0xFFF500']

const fetchString = 'https://agario.crypto-loto.xyz/api/join?token=' + token + '&telegram_id=' + telegram_id
console.log(fetchString)

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

// async function getName(userId) {
//     try {
//         const response = await fetch('https://agario.crypto-loto.xyz/api/getname?telegram_id=' + userId, {
//             method: 'GET',
//         });

//         if (!response.ok) {
//             console.log(response)
//             throw new Error('Network response was not ok');
//         }
//         const responseJson = await response.json();
//         return responseJson.user_name
//     } catch (error) {
//         console.error('Error sending name data:', error);
//     }
// }

async function getName(userId) {
    try {
        const response = await fetch('https://agario.crypto-loto.xyz/api/getname?telegram_id=' + userId);
        const data = await response.json();
        return { "name": data.user_name, "id": userId };
    } catch (error) {
        console.error('Error:', error);
    }
}

// function getName(userId) {
//     fetch('https://agario.crypto-loto.xyz/api/getname?telegram_id=' + userId)
//         .then(response => response.json())
//         .then(json => {
//             let data = json;
//             return data // data is now stored in the variable
//         })
//         .catch(error => console.error('Error:', error));
// }
function newWebSocket() {
    webSocket = new WebSocket(
        webSocketPath
    );

    webSocket.onopen = function (event) {
        console.log("WebSocket is connected");
        let myTimer = setInterval(() => {
            try {
                message = JSON.stringify({ 'action': 'move', 'dx': deltaX, 'dy': deltaY })
                webSocket.send(message)
            } catch (e) {
                clearInterval(myTimer)
            }
        }, 50)
    };

    webSocket.onmessage = onMessage

    webSocket.onerror = function (error) {
        console.error("WebSocket Error: ", error);
    };

    webSocket.onclose = function (event) {
        localObjects.length = 0
        console.log(event)
        console.log("Connection is closed");
    };
}

// let userName = await getName(item.user_id)
// xonsole.log(userName)

let allUsers = {};

function onMessage(event) {
    let receivedMessage
    event.data.length > 0 ? receivedMessage = JSON.parse(event.data) : null
    userStats = []
    if (typeof (event.data.top) != undefined) {
        console.log(receivedMessage.top.length);
        receivedMessage.top.forEach(async (item) => {
            if (allUsers[item.user_id]) {
                userStats.push({ user_id: allUsers[item.user_id], size: item.size })
            } else {
                getName(item.user_id).then((value) => {
                    allUsers[value["id"]] = value["name"];
                });
            }
            // let userName = await getName(item.user_id)
            // let userName = await getName(item.user_id)
            // userName
            //     .then(({ data }) => data)
            //     .then(data => { console.log(data) })// rest of script
            //     .catch();
            // console.log(userName)
            // userStats.push({ user_id: userName, size: item.size })
        })
        websocketStats.users = userStats
    }

    let last = Date.now() / 1000
    // ping.setText(`ping: ${Math.round((last - receivedMessage.sent_at) * 1000)} ms`);
    // console.log(receivedMessage);
    receivedMessage.p_obj.forEach((item) => {
        let have = false
        localObjects.forEach((localItem) => {
            if (localItem.id == item.id) {
                localItem.x = item.x
                localItem.y = item.y
                localItem.size = item.size
                // localItem.object.setDisplaySize(localItem.size * 2, localItem.size * 2)
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
                    fontFamily: 'font1',
                });
                text.setAlign("center");
                if (allUsers[item.player_id] == null) {
                    getName(item.player_id).then((value) => {
                        allUsers[value["id"]] = value["name"];
                    });
                }
                localObjects[localObjects.length - 1].player_id = item.player_id;
                localObjects[localObjects.length - 1].text = text;
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
        this.load.svg('thumb', 'assets/thumb.svg', { width: window.innerWidth / 4, height: window.innerWidth / 4 });
        this.load.svg('base', 'assets/base.svg', { width: window.innerWidth / 1.5, height: window.innerWidth / 1.5 });
        this.load.svg('bubble', 'assets/bubble.svg', { width: 200, height: 200 });
        this.load.svg('point', 'assets/food.svg', { width: 50, height: 50 });
        this.load.svg('background', 'assets/background.svg', { width: 290, height: 496 });
        this.load.svg('halo', 'assets/halo.svg', { width: 110, height: 110 });
        this.load.svg('pointer', 'assets/pointer.svg', { width: 20, height: 20 });
        this.load.svg('eject', 'assets/eject.svg', { width: 150, height: 150 });
        this.load.svg('split', 'assets/split.svg', { width: 150, height: 150 });
        sendFormData()
    }

    create() {
        this.cameras.roundPx = false;
        this.start = this.getTime();
        background = this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'background').setOrigin(0.5, 0.5);
        eject = this.add.sprite(51, window.innerHeight - 91, 'eject').setInteractive();
        eject.setDisplaySize(75, 75)
        eject.setScrollFactor(0)
        eject.depth = 10000;
        split = this.add.sprite(51, window.innerHeight - 178, 'split').setInteractive();
        split.setDisplaySize(75, 75)
        split.setScrollFactor(0)
        split.depth = 10000;
        this.input.addPointer(3);
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
        UICam.ignore([background]);
        // ping = scene.add.text(16, 64, 'loading', {
        //     fontFamily: 'Arial',
        //     fontSize: 20,
        //     color: '#ffffff'
        // });
        halo = this.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'halo')
        // halo = scene.add.circle(
        //     window.innerWidth / 2,
        //     window.innerHeight / 2,
        //     window.innerWidth / 4,
        //     0xFF0000,
        //     0
        // );
        // halo.setStrokeStyle(3, 0xff0000);
        // halo.setTint(0xff0000)
        halo.depth = 9998
        halo.setOrigin(0.5, 0.5)
        pointer = scene.add.sprite(0, 0, 'pointer');
        // pointer.setScale(0.6, 0.6)
        pointer.setOrigin(0.5, 0.5)
        pointer.setTint(0xff0000)
        pointer.depth = 9999
        this.cameras.main.ignore([this.joyStick.base, this.joyStick.thumb, split, eject, halo, pointer]);
    }

    update() {
        pointer.setAlpha(1)
        let angle = scene.calculateAngleInRadians(joyStickX, joyStickY, scene.joyStick.thumb.x, scene.joyStick.thumb.y)
        newX = window.innerWidth / 2 + (window.innerWidth / 6.9) * Math.cos(angle);
        newY = window.innerHeight / 2 + (window.innerWidth / 6.9) * Math.sin(angle);
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
                    this.cameras.main.setZoom(75 / Phaser.Math.Linear(item.object.displayWidth, item.size, 0.2), 75 / Phaser.Math.Linear(item.object.displayWidth, item.size, 0.2));
                    const zoomFactor = this.cameras.main.zoom
                    background.setScale(1 / zoomFactor)
                }

                if (item.type == 'player') {
                    item.text.setText(allUsers[item.player_id] ?? "");
                    item.text.setPosition(item.object.x - item.text.width / 2, item.object.y + item.size * 1.35);
                    item.text.setFontSize(item.size / 2);
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



