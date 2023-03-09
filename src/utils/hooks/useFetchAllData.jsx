import { useEffect, useState } from "react";
import mockApi from "../../__mocks__/mockApi";

/**
 * Custom React hook that fetches user's data from many endpoints
 * @function useFetchAllData
 * @param {number} id - the id of the user's data to fetch
 * @returns {Object} an object with the `data`, `error` and `loading` states of the hook
 */
export default function useFetchAllData(id) {

    const [ data, setData ] = useState()
    const [ error, setError ] = useState()
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        //define a async function to fetch data
        const fetchData = async () => {
            
            //The base URL of the API found in the .env file of the app
            const url = process.env.REACT_APP_API_URL
            
            //Endpoints correponding to each property we need to fetch data from
            const endpoints = {
                user: `user/${id}`,
                activity: `user/${id}/activity`,
                averageSessions: `user/${id}/average-sessions`,
                performance: `user/${id}/performance`,
            }
            try {
                //if the REACT_APP_MOCK_DATA variable in the .env file is set to 'true'
                //the data is taken from a file that mock the return of the API
                if(process.env.REACT_APP_MOCK_DATA === 'true'){
                    setData(mockApi)
                    setLoading(false)
                } 
                //if the REACT_APP_MOCK_DATA variable in the .env file is not set to 'true'
                //the data is fetched on the API
                else {
                    if(id){
                        //initialisation of a contant object to store the data returned by each API endpoints
                        const fetchedData = {user: '', activity: '', averageSessions: '', performance: ''}
                        //for each endpoint the data is fetched and added to the fetchedData object
                        for (const key of Object.keys(endpoints)) {
                            const response = await fetch(url + endpoints[key])
                            if(response.ok) {
                                const { data } = await response.json()
                                fetchedData[key] = data 
                            } else {
                                throw new Error(response.status)
                            }
                        }
                        //Once all data is fetched, set the `data` state with the fetchdData and `loading` state to false
                        setData(fetchedData)
                        setLoading(false)
                    } 
                    //if no id provided throw an error
                    else {
                        throw new Error('Une erreur est survenue!')
                    }
                }
            } 
            //Catch errors during fetch process and set the `error` state with the appropriate message
            catch(error) {
                const message = error.message === '404' ? 'Erreur 404 : Page non trouvée' : `Erreur ${error.message}`
                setError(message)
                setLoading(false)
            }
        }
        setLoading(true)
        //call the function
        fetchData()
    }, [id])

    return { data, error, loading }
}