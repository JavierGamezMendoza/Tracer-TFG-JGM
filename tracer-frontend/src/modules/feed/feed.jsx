import React, { useEffect, useState } from 'react';
import vehicleService from '../../services/vehicleService';
import { Container, Row, Col, Card, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaSearch, FaHeart, FaTimes, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import styles from './feed.module.css';
import authService from '../../services/authService';
import UserService from '../../services/userService';
import { Form } from 'react-bootstrap';

const Feed = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    creationDate: ''
  });
  const [formErrors, setFormErrors] = useState({
    brand: '',
    model: '',
    creationDate: ''
  });

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

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.brand.trim()) {
      errors.brand = 'Brand is required';
      isValid = false;
    } else if (formData.brand.length > 15) {
      errors.brand = 'Brand must be less than 15 characters';
      isValid = false;
    }

    if (!formData.model.trim()) {
      errors.model = 'Model is required';
      isValid = false;
    } else if (formData.model.length > 30) {
      errors.model = 'Model must be less than 30 characters';
      isValid = false;
    }

    if (!formData.creationDate.trim()) {
      errors.creationDate = 'Creation Date is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const vehicle = await vehicleService.addVehicle({
          brand: formData.brand,
          model: formData.model,
          creationDate: formData.creationDate
        });

        setFormData({
          brand: '',
          model: '',
          creationDate: ''
        });

        fetchVehicles();
        setShowForm(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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
      {currentUser?.role === 'ADMIN' && (
        <>
          {showForm ? (
            <Row className="justify-content-center ms-5 me-5">
              <Col xs={12} md={8}>
                <Card>
                  <Card.Body>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Brand"
                          name="brand"
                          value={formData.brand}
                          onChange={handleChange}
                          isInvalid={!!formErrors.brand}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.brand}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Model</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Enter Model"
                          name="model"
                          value={formData.model}
                          onChange={handleChange}
                          isInvalid={!!formErrors.model}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.model}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Creation Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="creationDate"
                          value={formData.creationDate}
                          onChange={handleChange}
                          isInvalid={!!formErrors.creationDate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.creationDate}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                      <Button variant="secondary" onClick={handleCancel} className="ms-2">
                        Cancel <FaTimes className='ms-1' />
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            <Row className="ms-5 me-5">
              <Col xs={12} md={8}>
                <Button onClick={toggleForm} className='d-flex align-items-center justify-content-center '>Add Vehicle <FaPlus className='ms-2' /></Button>
              </Col>
            </Row>
          )}
        </>
      )}
      <Row className='justify-content-start d-flex flex-wrap ms-5 me-5'>
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
