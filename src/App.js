import React, {useState,  useEffect} from 'react'
import './styles/App.css'
import PostList from './components/PostList'
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/modal/MyModal';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePosts';
import PostService from './API/PostService';
import MyLoader from './components/UI/loader/MyLoader';

function App() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [isPostsLoading, setIsPostsLoading] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  useEffect(() => {
    fetchPosts()
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  async function fetchPosts() {
    setIsPostsLoading(true)
    setTimeout(async () => {
      const posts = await PostService.getAll();
      setPosts(posts)
      setIsPostsLoading(false)
    }, 1000)

  }

  const removePost = (post) => {
    setPosts([...posts].filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <MyButton onClick={fetchPosts}>GET POSTS</MyButton>
      <MyButton style={{margin: '30px 0 0 30px'}} onClick={() => setModal(true)}>
        Создать публикацию
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}></PostForm>
      </MyModal>
      <hr style={{margin: '15px 0'}}></hr>
      <PostFilter filter={filter} setFilter={setFilter}/>
      {isPostsLoading
        ? <div style={{display: 'flex', justifyContent: 'center', margin: '50px 0 0 0'}}><MyLoader/></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов'}/>
      }
    </div>
  );
}

export default App
