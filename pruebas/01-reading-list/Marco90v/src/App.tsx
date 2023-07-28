import { useContext, useEffect } from 'react';
import useFetch from './hooks/useFetch'
import { Context } from './Context/Global';
import { Types } from './const';
import Sidebar from './components/Sidebar';
import Books from './components/Books';

function App() {
  // const [ data ] = useFetch('https://raw.githubusercontent.com/Marco90v/pruebas-tecnicas/main/pruebas/01-reading-list/books.json');
  const { dispatch } = useContext(Context);
  const [ data ] = useFetch('src/books.json');
  useEffect(() => {
    data && dispatch({type:Types.setInitialData, payload:data});
  }, [data, dispatch])
  
  return (
    <main className='max-w-6xl m-auto my-8 grid grid-cols-6 bg-slate-100 rounded-md overflow-hidden shadow-lg border-2 border-gray-200'>
      <Sidebar />
      <Books />
    </main>
  )
}

export default App
