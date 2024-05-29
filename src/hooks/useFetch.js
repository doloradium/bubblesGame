import { useEffect, useState } from "react"

export const useFetch = (fetchFunction, params) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    const stringParams = params ? new URLSearchParams(params).toString() : ''

    useEffect(() => {
        (async () => {
            try {
                const result = await fetchFunction(params)
                setData(result)
            } catch (error) {
                setError(error)
            }
        })()
    }, [fetchFunction, stringParams])

    return { data, error }
}