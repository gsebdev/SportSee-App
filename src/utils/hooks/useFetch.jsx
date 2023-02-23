import { useEffect, useState } from "react";
import mockApi from "../../__mocks__/mockApi";


export default function useFetch(ressource=null, id=null) {
    const [ data, setData ] = useState()
    const [ error, setError ] = useState()
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            
            try {
                console.log(process.env.REACT_APP_MOCK_DATA )
                if(process.env.REACT_APP_MOCK_DATA === 'true'){
                    console.log(mockApi[ressource])
                    setTimeout(() => {setData(mockApi[ressource])}, 2000)
                    setLoading(false)
                } else {
                    if(id){
                        const response = await fetch(`http://localhost:3000/user/${id}${ressource && ressource !== 'user' ? '/' + ressource: ''}`)
                        const jsData = await response.json()  
                        setData(jsData)
                    }else{
                        throw new Error('Une erreur est survenue!')
                    }
                    
                }
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }
        setLoading(true)
        fetchData()
    }, [ressource, id])

    return { data, error, loading }
}