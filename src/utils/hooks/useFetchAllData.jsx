import { useEffect, useState } from "react";
import mockApi from "../../__mocks__/mockApi";


export default function useFetchAllData(id=null) {
    const [ data, setData ] = useState()
    const [ error, setError ] = useState()
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const url = process.env.REACT_APP_API_URL
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
                        const fetchedData = {user: '', activity: '', averageSessions: '', performance: ''}
                        for (const key of Object.keys(endpoints)) {
                            const response = await fetch(url + endpoints[key])
                            if(response.ok) {
                                const jsData = await response.json()
                                fetchedData[key] = jsData 
                            } else {
                                throw new Error(response.status)
                            }
                        }
                        setData(fetchedData)
                        setLoading(false)
                    } else {
                        throw new Error('Une erreur est survenue!')
                    }
                }
            } catch(error) {
                const message = error.message === '404' ? 'Erreur 404 : Page non trouvée' : `Erreur ${error.message}`
                setError(message)
                setLoading(false)
            }
        }
        setLoading(true)
        fetchData()
    }, [id])

    return { data, error, loading }
}