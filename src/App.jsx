import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import PostDetails from './pages/PostDetails/PostDetails';
import PostAdd from './pages/PostAdd/PostAdd';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/posts/:postId' element={<PostDetails />}></Route>
      <Route path='/posts/add' element={<PostAdd />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
