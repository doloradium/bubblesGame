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
        const response = await axios.get("https://agario.crypto-loto.xyz/api/bubbles")
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