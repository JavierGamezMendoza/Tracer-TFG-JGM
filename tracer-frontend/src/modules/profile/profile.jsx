import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import UserService from '../../services/userService';
import authService from '../../services/authService';
import Image from 'react-bootstrap/Image';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(false);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        UserService.updateUser(user.id, user);
        setIsEditing(false); // Deshabilitar la edición después de guardar los cambios
    };

    const fetchCurrentUser = async () => {
        const currentUser = authService.getCurrentUser()
        const loadeduser = await UserService.getUserById(currentUser.id)
        console.log(loadeduser)
        setUser(loadeduser)
    }

    useEffect(() => {
        fetchCurrentUser();
    }, [])

    return (
        <Container className='border rounded shadow mt-5'>
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6} xl={4} className='d-flex justify-content-center align-items-center'>
                    <div className="text-center mb-4">
                        <Image src={user.profilePic} alt="Profile Pic" className="rounded-circle" width="200" height="200" />
                    </div>
                </Col>
                <Col className=' justify-content-center align-items-center pt-5 pb-5 pe-5'>
                    <div>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={user?.username || ''}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Bio</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="bio"
                                    value={user?.bio || ''}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={user?.email || ''}
                                    onChange={handleChange}
                                    disabled
                                />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                {isEditing ? (
                                    <Button type="submit" variant="primary">Save</Button>
                                ) : (
                                    <button onClick={handleEditToggle} className="btn btn-outline-secondary">
                                        <FaEdit className="me-1" />
                                        Edit
                                    </button>
                                )}
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
