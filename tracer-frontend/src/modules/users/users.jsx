import React, { useEffect, useState } from 'react';
import Loading from '../../components/loading/loading';
import authService from '../../services/authService';
import UserService from '../../services/userService';
import { Container, Table, FormControl, InputGroup } from 'react-bootstrap';
import { FaHeart } from "react-icons/fa";
import styles from './users.module.css';

const Users = () => {
    const [users, setUsers] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    const fetchUsers = async () => {
        const userList = await UserService.getAllUsers();
        setUsers(userList);
        fetchCurrentUser();
    };

    const fetchCurrentUser = async () => {
        const user = authService.getCurrentUser();
        const realUser = await UserService.getUserById(user.id);
        console.log(realUser);
        setCurrentUser(realUser);
    };

    useEffect(() => {

        fetchUsers();
        fetchCurrentUser();
    }, []);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const handleFavoriteToggle = async (userId) => {
        try {
            const isFavorited = currentUser.follows.some(followedUser => followedUser.id === userId);
            if (isFavorited) {
                await UserService.unFollowUser(userId);
            } else {
                await UserService.followUser(userId);
            }

            // Update current user and users list

            fetchUsers();

        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };

    const filteredUsers = users ? users.filter(user => {
        return (
            user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.bio.toLowerCase().includes(searchValue.toLowerCase())
        );
    }) : [];

    if (!users || !currentUser) {
        return <Loading />;
    }

    return (
        <Container>
            <InputGroup className="mb-3 mt-4">
                <FormControl
                    placeholder="Search..."
                    aria-label="Search..."
                    aria-describedby="basic-addon2"
                    value={searchValue}
                    onChange={handleSearch}
                />
            </InputGroup>
            <Table bordered hover className='text-center align-middle'>
                <thead>
                    <tr>
                        <th>Profile Pic</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Bio</th>
                        <th>Followers</th>
                        <th>Follows</th>
                        <th>Favorites</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={index}>
                            <td>
                                <img src={user.profilePic} className='rounded-circle' style={{ width: '50px', height: '50px' }} />
                            </td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.bio}</td>
                            <td>{user.followers.length}</td>
                            <td>{user.follows.length}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    className='d-none'
                                    id={`btn-check-${user.id}`}
                                    autoComplete="off"
                                    checked={currentUser.follows.some(followedUser => followedUser.id === user.id)}
                                    onChange={() => handleFavoriteToggle(user.id)}
                                    disabled={user.id == currentUser.id}
                                />
                                <label className={`${styles.checkbox} m-auto`} htmlFor={`btn-check-${user.id}`}>
                                    <FaHeart className={currentUser.follows.some(followedUser => followedUser.id === user.id) ? styles.favorited : ''} />
                                </label>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Users;
