import { useEffect, useState } from "react";
import mockApi from "../../__mocks__/mockApi";


export default function useFetchAllData(id=null) {
    const [ data, setData ] = useState()
    const [ error, setError ] = useState()
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const url = 'http://localhost:3000/'
            const endpoints = {
                user: `user/${id}`,
                activity: `user/${id}/activity`,
                averageSessions: `user/${id}/average-sessions`,
                performance: `user/${id}/performance`,
            }

            try {
                if(process.env.REACT_APP_MOCK_DATA === 'true'){
                    setData(mockApi)
                    setLoading(false)
                } else {
                    if(id){
                        const fetchedData = {}
                        Object.keys(endpoints).forEach(async key => {
                            const response = await fetch(url + endpoints[key])
                            const jsData = await response.json()
                            fetchedData.key = jsData
                        })
                        setData(fetchedData)
                    }else{
                        throw new Error('Une erreur est survenue!')
                    }
                    
                }
            } 
            catch (error) {
                setError(error)
                setLoading(false)
            }
        }
        setLoading(true)
        fetchData()
    }, [id])

    return { data, error, loading }
}