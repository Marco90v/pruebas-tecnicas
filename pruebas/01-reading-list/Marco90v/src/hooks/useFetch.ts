import { useCallback, useEffect, useState } from "react"
import { Status } from "../const"

function useFetch(URL:string): [library | undefined, string] {
    const [state, setState] = useState<library>()
    const [status, setStatus] = useState<string>(Status.wait)
    
    const getData = useCallback( () => {
        setStatus(Status.loading)
        try {
            fetch(URL)
            .then( async response => {
                if(response.ok){
                    const data = await response.json() as library
                    setState(data)
                    setStatus(Status.completed)
                }else{
                    console.log(response)
                    setStatus(Status.error)
                }
            })
            .catch(error => {
                console.log(error)
                setStatus(Status.error)
            })
            
        } catch (error) {
            console.log(error)
            setStatus(Status.error)
        }
    }, [URL])

    useEffect(() => {
        getData()
    }, [URL, getData]);

    return [ state, status ]
}
export default useFetch