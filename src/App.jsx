import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import PostDetails from './pages/PostDetails/PostDetails';
import PostAdd from './pages/PostAdd/PostAdd';
import Header from './components/Header/Header';
import UserPosts from './pages/UserPosts/UserPosts';

function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/posts/:postId' element={<PostDetails />}></Route>
      <Route path='/posts/add' element={<PostAdd />}></Route>
      <Route path='/users/:userId/posts' element={<UserPosts />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
