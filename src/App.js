import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import JobList from './pages/JobList';
import NewJob from './pages/NewJob';
import ApproveJobs from './pages/ApproveJobs';
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
        <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/new" element={<NewJob />} />
        <Route path="/approve" element={<ApproveJobs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;