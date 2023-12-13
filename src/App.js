import React, {useState, useRef} from 'react'
import Counter from './components/counter';
import ClassCounter from './components/classCounter';
import './styles/App.css'
import PostList from './components/PostList'
import PostForm from './components/PostForm';

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Javascript', body: 'Description'},
    {id: 2, title: 'React', body: 'Description'},
    {id: 3, title: 'React Native', body: 'Description'}
  ])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts([...posts].filter(p => p.id !== post.id))
  }


  return (
    <div className="App">
      <PostForm create={createPost}></PostForm>
      {posts.length !== 0
        ? <PostList remove={removePost} posts={posts} title={'Список постов'}/>
        : <h1 style={{textAlign: 'center'}}>Посты не найдены</h1>
      }
    </div>
  );
}

export default App
