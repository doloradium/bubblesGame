import axios from "axios"
import userInfo from "../data/userInfo"

export const getTotalPlayers = async () => {
    try {
        const response = await axios.get("https://agario.crypto-loto.xyz/api/totaluser")
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getBubbles = async () => {
    try {
        const response = await axios.get("https://agario.crypto-loto.xyz/api/bubbles",
            {
                params: {
                    token: userInfo.token,
                    telegram_id: userInfo.telegram_id
                }
            })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const buyBubbles = async (id) => {
    try {
        const response = await axios.post("https://agario.crypto-loto.xyz/api/buy",
            {
                token: userInfo.token,
                telegram_id: userInfo.telegram_id,
                skins: id
            })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getMe = async () => {
    try {
        const response = await axios.get("https://agario.crypto-loto.xyz/api/me",
            {
                params: {
                    token: userInfo.token,
                    telegram_id: userInfo.telegram_id
                }
            })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getNameNew = async () => {
    try {
        const response = await axios.get("https://agario.crypto-loto.xyz/api/getname",
            {
                params: {
                    room_id: 0,
                    telegram_id: userInfo.telegram_id
                }
            })
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const getQR = async () => {
    try {
        const response = await axios.get(`https://agario.crypto-loto.xyz/api/qrwallet`,
            {
                params: {
                    token: userInfo.token,
                    telegram_id: userInfo.telegram_id
                }
            })
        return response.data
    } catch (error) {
        console.log(error)
    }
}