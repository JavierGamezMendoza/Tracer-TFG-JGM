import React, { useEffect, useState } from 'react';
import vehicleService from '../../services/vehicleService';
import { Container, Row, Col, Card, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaSearch, FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import styles from './feed.module.css';
import authService from '../../services/authService';
import UserService from '../../services/userService';

const Feed = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // Obtener todos los vehículos al cargar el componente
  const fetchVehicles = async () => {
    const allVehicles = await vehicleService.getAllVehicles();
    setVehicles(allVehicles);
    setFilteredVehicles(allVehicles); // Inicialmente, los vehículos filtrados serán todos los vehículos
  };

  const fetchCurrentUser = () => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchVehicles();
  }, []);

  // Función para filtrar vehículos seguidos por el usuario actual
  const setFavoriteFilter = () => {
    const favorites = vehicles.filter(vehicle => vehicle.followers.some(follower => follower.id === currentUser.id));
    setFilteredVehicles(favorites);
  };

  const handleFavoriteButton = (id) => (event) => {
    const isChecked = event.target.checked;
    console.log(isChecked)
    if (isChecked) {
      setFavoriteFilter(id);
    } else {
      setFilteredVehicles(vehicles);
    }
  };

  // Función para filtrar vehículos basados en el valor de búsqueda
  useEffect(() => {
    const filtered = vehicles.filter(vehicle => {
      const modelMatch = vehicle.model && vehicle.model.toLowerCase().includes(searchValue.toLowerCase());
      const brandMatch = vehicle.brand && vehicle.brand.toLowerCase().includes(searchValue.toLowerCase());
      const dateMatch = vehicle.creationDate && new Date(vehicle.creationDate).toLocaleDateString().includes(searchValue);
      return modelMatch || brandMatch || dateMatch;
    });

    setFilteredVehicles(filtered);
  }, [searchValue, vehicles]);

  const followVehicle = async (id) => {
    try {
      await UserService.followVehicle(id);
      fetchVehicles();
    } catch (error) {
      console.log(error);
    }
  };

  const unFollowVehicle = async (id) => {
    try {
      await UserService.unFollowVehicle(id);
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
              placeholder="Buscar vehículo por nombre o fecha de creación"
              aria-label="Buscar vehículo"
              aria-describedby="basic-addon2"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <InputGroup.Text id="basic-addon2"><FaSearch /></InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8} className="justify-content-left">
          <input
            type="checkbox"
            className='d-none'
            id={`btn-check-favorites`}
            autoComplete="off"
            onChange={handleFavoriteButton()}
          />
          <label className={`${styles.checkboxFavorites}`} htmlFor={`btn-check-favorites`}><FaHeart /> Favoritos</label>
        </Col>
      </Row>
      <Row className='justify-content-start d-flex flex-wrap m-5'>
        {filteredVehicles.map((vehicle, index) => (
          <Col key={index} xs={12} sm={12} md={6} lg={4} xl={4} className='mt-4 justify-content-left'>
            <Card>
              <Card.Body>
                <Card.Title>
                  <p>Brand: {vehicle.brand}</p>
                  <p>Model: {vehicle.model} </p>
                </Card.Title>
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
                    id={`btn-check-${vehicle.id}`}
                    autoComplete="off"
                    onChange={handleFollowButton(vehicle.id)}
                    checked={vehicle.followers.some(user => user.id === currentUser.id)}
                  />
                  <label className={`${styles.checkbox}`} htmlFor={`btn-check-${vehicle.id}`}><FaHeart></FaHeart></label>
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
