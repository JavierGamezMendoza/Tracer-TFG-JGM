import React, { useEffect, useState } from 'react';
import Loading from '../../components/loading/loading';
import UserService from '../../services/userService';
import styles from './users.module.css';
import { Container, Table } from 'react-bootstrap';

const Users = () => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const fetchVehicle = async () => {
            const userList = await UserService.getAllUsers();
            setUsers(userList)
        };

        fetchVehicle();
    }, []);

    if (!users) {
        return <Loading />
    }


    return (
        <Container>
            <Table bordered hover className='text-center mt-4'>
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
                    {users.map((user, index) => (
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