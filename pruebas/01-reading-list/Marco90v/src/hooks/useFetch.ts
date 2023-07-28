import { useCallback, useEffect, useState } from "react"

function useFetch(URL:string): (library | undefined)[] {
    const [state, setState] = useState<library>()
    
    const getData = useCallback( () => {
        try {
            fetch(URL)
            .then( async response => {
                if(response.ok){
                    const data = await response.json() as library
                    setState(data);
                }else{
                    console.log(response)
                }
            })
            .catch(error => {
                console.log(error)
            })
            
        } catch (error) {
            console.log(error)
        }
    }, [URL])

    useEffect(() => {
        getData()
    }, [URL, getData]);

    return [ state ]
}
export default useFetch