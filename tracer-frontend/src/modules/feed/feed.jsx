import React, { useEffect, useState } from 'react';
import vehicleService from '../../services/vehicleService';
import { Container, Row, Col, Card, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaSearch, FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import styles from './feed.module.css';
import authService from '../../services/authService';

const Feed = () => {
  const [vehicles, setVehicles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  // Obtener todos los vehículos al cargar el componente
  const fetchVehicles = async () => {
    const allVehicles = await vehicleService.getAllVehicles();
    setVehicles(allVehicles);
    console.log(allVehicles)
  };

  const fetchCurrentUser = () => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
};

  useEffect(() => {
    fetchCurrentUser();
    fetchVehicles();
  }, []);

  const followVehicle = async (id) => {
    try {
      await vehicleService.followVehicle(id);
      fetchVehicles();
    } catch (error) {
      console.log(error);
    }
  };

  const unFollowVehicle = async (id) => {
    try {
      await vehicleService.unFollowVehicle(id);
      fetchVehicles();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollowButton = (id) => (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      followVehicle(id);
    } else {
      unFollowVehicle(id);
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center mb-4 mt-4">
        <Col xs={12} md={8}>
          <InputGroup>
            <FormControl
              placeholder="Buscar vehículo..."
              aria-label="Buscar vehículo"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Text id="basic-addon2"><FaSearch /></InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {vehicles.map((vehicle, index) => (
          <Col key={index} xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card>
              <Card.Body>
                <Card.Title>{vehicle.brand} {vehicle.model}</Card.Title>
                <Card.Text>
                  Creation Date: {new Date(vehicle.creationDate).toLocaleDateString()}
                </Card.Text>
                <div className='d-flex justify-content-between align-items-center'>
                  <Link to={`/vehicle/${vehicle.id}`}>
                    <Button>
                      Threads
                    </Button>
                  </Link>
                  <input
                    type="checkbox"
                    className='d-none'
                    id="btn-check"
                    autoComplete="off"
                    onChange={handleFollowButton(vehicle.id)}
                    checked={vehicle.followers.some(user => user.id === currentUser.id)}
                  />
                  <label className={`${styles.checkbox}`} htmlFor="btn-check"><FaHeart></FaHeart></label>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Feed;