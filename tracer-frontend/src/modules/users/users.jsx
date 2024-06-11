import React, { useEffect, useState } from 'react';
import Loading from '../../components/loading/loading';
import UserService from '../../services/userService';
import styles from './users.module.css';
import { Container, Table, Form, FormControl, InputGroup } from 'react-bootstrap';

const Users = () => {
    const [users, setUsers] = useState(null);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const userList = await UserService.getAllUsers();
            setUsers(userList)
        };

        fetchUsers();
    }, []);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const filteredUsers = users ? users.filter(user => {
        return (
            user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.bio.toLowerCase().includes(searchValue.toLowerCase())
        );
    }) : [];

    if (!users) {
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
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={index}>
                            <td>
                                <img src={user.profilePic} className='rounded-circle' style={{ width: '50px', height: '50px' }}/>
                            </td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.bio}</td>
                            <td>{user.followers.length}</td>
                            <td>{user.follows.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Users;
