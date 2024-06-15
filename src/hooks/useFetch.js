import axios from "axios"
import { useState, useEffect } from "react"

const useFetch = (url, method, token, body) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null)
    useEffect(() => {
        switch (method) {
            case "GET":
                axios.get(url, {
                    headers: {
                        "authorization": token
                    }
                }).then(({ data }) => {
                    setIsLoading(false)
                    setData(data)

                }).catch(err => {
                    setIsLoading(false)
                    setError(err.message)
                })
                break;
            case "POST":
                axios.post(url, {}, {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": token
                    }
                }).then(({ data }) => {
                    setIsLoading(false)
                    setData(data)

                }).catch(err => {
                    setIsLoading(false)
                    setError(err.message)
                })
        }
    }, [method, url, token])
    return [isLoading, error, data]
}
export default useFetch;