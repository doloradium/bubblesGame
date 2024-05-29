import axios from "axios"

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