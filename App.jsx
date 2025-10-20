

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from './task';


const App = () => {
  const dispatch = useDispatch();
  const { Error, Loading, Data } = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch]);

  if (Loading) return <p>Loading...</p>
  if (Error) return <p>Error: {Error}</p>  

  return (
    <div>
      <h1>Posts</h1>
      {Data.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}

export default App
