import { useContext, useEffect } from 'react';
import useFetch from './hooks/useFetch'
import { Context } from './Context/Global';
import { Status, Storage, Types } from './const';
import Sidebar from './components/Sidebar';
import Books from './components/Books';
import { getLocalStorage } from './utils/storage';
import Spinner from './components/Spinner';

function App() {
  // const [ data ] = useFetch('https://raw.githubusercontent.com/Marco90v/pruebas-tecnicas/main/pruebas/01-reading-list/books.json');
  const { state, dispatch } = useContext(Context);
  const [ data, status ] = useFetch('src/books.json');
    
  useEffect(() => {
    if (status === Status.completed && data && state.library.length === 0){
      dispatch({type:Types.setInitialData, payload:data})
    } 
  }, [status, dispatch, data, state.library.length])

  useEffect(() => {
    window.addEventListener('storage', event => {
      updateReadingByEventStorage(event)
    })
    return () => {
      window.removeEventListener('storage', updateReadingByEventStorage)
    }
  })
  
  const updateReadingByEventStorage = (event:StorageEvent) => {
    if(event.key === Storage.fav){
        const reading:book[] = getLocalStorage()
        dispatch({type:Types.UpdateReading, payload:{reading}})
    }
  } 

  return state.library.length === 0 ? 
    <main className='w-screen h-screen flex justify-center items-center'>
      <Spinner />
    </main> :
    <main className='main'>
      <Sidebar />
      <Books />
    </main>
}

export default App
