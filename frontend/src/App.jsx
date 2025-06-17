// import React, { useState } from 'react';
// import { Navigate, Route, Routes } from 'react-router-dom';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Home from './pages/Home';
// import ModeToggle from './components/ModeToggle';
// import { CssVarsProvider } from '@mui/joy/styles';
// import Sheet from '@mui/joy/Sheet';
// import RefreshHandler from './components/RefreshHandler';




// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const PrivateRoute = ({element}) => {
//     return isAuthenticated ? element : <Navigate to='/login'/>
//   }


//   return (
//     <>
     
//     <CssVarsProvider>
      
      
//       <Sheet
//         variant="outlined"
//         sx={{
//           width: 300,
//           mx: 'auto',
//           my: 4,
//           py: 3,
//           px: 2,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 2,
//           borderRadius: 'sm',
//           boxShadow: 'md',
//         }}
//       >
//         <RefreshHandler setIsAuthenticated = {setIsAuthenticated}/>
       
//         <ModeToggle />
        
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/home" element={<PrivateRoute element={<Home />}/>} />
//         </Routes>
//       </Sheet>
//     </CssVarsProvider>
//     </>
//   );
// };

// export default App;

import React, { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ModeToggle from './components/ModeToggle';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import RefreshHandler from './components/RefreshHandler';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <CssVarsProvider>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

      {isAuthPage ? (
        <Sheet
          variant="outlined"
          sx={{
            width: 300,
            mx: 'auto',
            my: 4,
            py: 3,
            px: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
        >
          <ModeToggle />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Sheet>
      ) : (
        // No sheet layout for main content like Home
        <>
          <ModeToggle />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          </Routes>
        </>
      )}
    </CssVarsProvider>
  );
};

export default App;
