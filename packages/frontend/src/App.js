import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home';
import PrivateRoute from "./Pages/PrivateRoute";
import './App.css';
import Verification from './Pages/Verification';

function App() {
  return (
    <Box>
      <Router>
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/verification" element={<Verification />} />
          <Route exact path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
