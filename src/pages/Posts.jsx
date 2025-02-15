import React, {useState,  useEffect, useRef} from 'react'
import '../styles/App.css'
import PostList from '../components/PostList'
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/modal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import MyLoader from '../components/UI/loader/MyLoader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../utils/pages.js'
import MyPaginator from '../components/UI/pagination/MyPaginator.jsx';
import { useObserver } from '../hooks/useObserver.js';
import MySelect from '../components/UI/select/Myselect.jsx';

function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const lastElement = useRef()

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page)
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useObserver(
    lastElement, 
    page < totalPages,
    isPostsLoading,
    () => setPage(page+1)
  )

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts([...posts].filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
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
      <MySelect 
        value={limit}
        onChange={val => setLimit(val)}
        defaultValue="Кол-во элментов на странице"
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Все'},
        ]}
      />
      {postError &&
        <h1>Произошла ошибка ${postError}</h1>
      }
      {isPostsLoading &&
        <div style={{display: 'flex', justifyContent: 'center', margin: '50px 0 0 0'}}><MyLoader/></div>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов'}/>
      <div ref={lastElement} style={{height: 20}}></div>
    </div>
  );
}

export default Posts
