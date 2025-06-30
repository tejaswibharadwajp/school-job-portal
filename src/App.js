import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import JobList from './pages/JobList';
import NewJob from './pages/NewJob';
import ApproveJobs from './pages/ApproveJobs';
import Header from "./components/Header/Header";
import ApplyPage from "./pages/JobApplication";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
        <Header />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} /> common login staff, students, companies
        <Route path="/jobs" element={<JobList />} /> studnets
        <Route path="/new" element={<NewJob />} /> company new job
        <Route path="/approve" element={<ApproveJobs />} /> staff to approve new jobs
        <Route path="/apply/:jobId" element={<ApplyPage />} /> link to apply
      </Routes>
    </BrowserRouter>
  );
}

export default App;