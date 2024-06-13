import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import vehicleService from '../../services/vehicleService';
import { Container, Card, Row, Button, Form, Alert } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Loading from '../../components/loading/loading';
import styles from './vehicle.module.css';
import { FaUser, FaCheck, FaPlus, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import dateService from '../../services/dateService';
import { AiFillMessage } from 'react-icons/ai';
import threadService from '../../services/threadService';
import authService from '../../services/authService';
import { BsThreeDots } from 'react-icons/bs';
import { Dropdown } from 'react-bootstrap';
import BlockUserButton from '../../components/block-user-button/blockUserButton';
import UserService from '../../services/userService';
import { IoShieldCheckmark } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';

const VehicleFeed = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [threads, setThreads] = useState(null);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    title: '',
    message: ''
  });

  const fetchCurrentUser = async () => {
    const newCurrentUser = authService.getCurrentUser()
    setCurrentUser(newCurrentUser);
  }

  const fetchVehicle = async () => {
    const vehicleById = await vehicleService.getVehicleById(id);
    fetchBlockedUsers();
    setVehicle(vehicleById);
    setThreads(dateService.sortByCreationDate(vehicleById.threads));
  };

  const fetchBlockedUsers = async () => {
    const users = await UserService.getBlockedUsers();
    setBlockedUsers(users);
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchVehicle();
    fetchBlockedUsers();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
      isValid = false;
    } else if (formData.title.length > 40) {
      errors.title = 'Title must be less than 40 characters';
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.length > 200) {
      errors.message = 'Message must be less than 200 characters';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const thread = await threadService.addThread({
          "creatorId": currentUser.id,
          "vehicleId": vehicle.id,
          "title": formData.title,
          "message": formData.message
        });

        setFormData({
          title: '',
          message: ''
        });

        fetchVehicle();
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

  if (!vehicle) {
    return <Loading />;
  }

  return (
    <Container>
      <h2 className='mt-4'>{vehicle.brand} - {vehicle.model}</h2>
      {showForm ? (
        <Row className="justify-content-center mt-3">
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    isInvalid={!!formErrors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.title}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    isInvalid={!!formErrors.message}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.message}
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
        </Row>
      ) : (
        <Row className="mt-3">
          <Button onClick={toggleForm} className='d-flex align-items-center justify-content-center'>Add Thread <FaPlus className='ms-2' /></Button>
        </Row>
      )}
      {threads.map((thread, index) => (
        !blockedUsers.some(user => user.id === thread.creator.id) ? (
          <Row className='justify-content-center align-items-center mt-3' key={index} xs={1} md={1} lg={1} xl={12}>
            <Card>
              <Card.Body>
                <div className='d-flex justify-content-between'>
                  <div>
                    <h5>{thread.title}</h5>
                  </div>
                  <div className='d-flex align-items-center justify-content-center'>
                    <Image
                      className={styles.profilePic}
                      src={thread.creator.profilePic}
                      roundedCircle
                      style={{ width: 20, height: 20 }}
                    />
                    <div className='ms-2'> {thread.creator.username}
                    </div>
                    {thread.creator.reliable &&
                      <div className='d-flex align-items-center justify-content-center'>
                        <IoShieldCheckmark className={`${styles.reliable} ms-2`} data-tooltip-id="my-tooltip" data-tooltip-content="This is a Reliable user" />
                        <Tooltip id="my-tooltip" />
                      </div>
                    }
                    {thread.creator.id != currentUser.id &&
                      <BlockUserButton mode="block" userId={thread.creator.id} fetch={fetchVehicle} />
                    }
                  </div>
                </div>

                <div className='mt-4 mb-4 bg-light p-4 rounded '>
                  {thread.message}
                </div>

                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    {thread.closeDate == null &&
                      <div className={`justify-content-between align-items-center`}>
                        <Link to={`/thread/${thread.id}`} >
                          <Button>
                            Get In
                          </Button>
                        </Link>
                      </div>
                    }
                    {thread.closeDate != null &&
                      <Link className={styles.link} to={`/thread/${thread.id}`}>
                        <div className={`${styles.closedThread} p-2 justify-content-between align-items-center`}>
                          <FaCheck /> SOLVED
                        </div>
                      </Link>
                    }
                  </div>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex align-items-center'>
                      <FaUser className='me-1'></FaUser> {thread.users.length}
                    </div>
                    <div className='ms-2 d-flex align-items-center'>
                      <AiFillMessage className='me-1'></AiFillMessage> {thread.threadposts.length}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Row>
        )
          :
          (
            <Row className='justify-content-center align-items-center mt-3' key={index} xs={1} md={1} lg={1} xl={12}>
              <Card>
                <Card.Body>
                  <div className='d-flex justify-content-end'>
                    <div className='d-flex align-items-center justify-content-end'>
                      <Image
                        className={styles.profilePic}
                        src={thread.creator.profilePic}
                        roundedCircle
                        style={{ width: 20, height: 20 }}
                      />
                      <div className='ms-2'> {thread.creator.username} </div>
                      <BlockUserButton mode="unblock" userId={thread.creator.id} fetch={fetchVehicle} />
                    </div>
                  </div>
                  <div className='mt-4 mb-4 bg-light p-4 rounded text-center'>
                    This user is <b>blocked</b> and you will not see their communications.
                  </div>
                </Card.Body>
              </Card>
            </Row>
          )



      ))}
    </Container>
  );
};

export default VehicleFeed;
