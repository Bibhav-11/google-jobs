import NavBar from './components/NavBar/Navbar';
import Home from './pages/Home/Home'
import Main from './layout/Main/Main';
import Error from './pages/Error/Error';
import { Routes, Route, Link } from 'react-router-dom';
import JobDetail from './pages/JobDetail/JobDetail';
import { useState } from 'react';

function App() {
  const [jobs, setJobs] = useState([]);

  return (
    <div className='bg-backgroundColor min-h-screen'>
      <div className='max-w-[1350px] mx-auto'>
        <NavBar />
        <Main>
          <Routes>
            <Route path="/" element={<Home jobs={jobs} setJobs={setJobs} />} />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path='*' element={<Error />} />
        
          </Routes>
        </Main>
      </div>
    </div>
  );
}

export default App;
