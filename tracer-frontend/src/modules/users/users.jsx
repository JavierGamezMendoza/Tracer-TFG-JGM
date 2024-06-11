import React, { useEffect, useState } from 'react';
import Loading from '../../components/loading/loading';
import UserService from '../../services/userService';
import styles from './users.module.css';

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
        <div>qjino</div>
    );
};

export default Users;