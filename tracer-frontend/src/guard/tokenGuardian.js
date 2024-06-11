import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

const Guardian = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
  }, [authenticated]);
  const token = localStorage.getItem('token');
  
  return !!token ? children : <Navigate to="/login" />;
};

export default Guardian;