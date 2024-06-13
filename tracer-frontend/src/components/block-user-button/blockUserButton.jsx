import React, { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Dropdown } from 'react-bootstrap';
import styles from './blockUserButton.module.css';
import UserService from '../../services/userService';

const BlockUserButton = ({ mode, userId, fetch }) => {

    const blockUser = async () => {
        await UserService.blockUser(userId);
        fetch();
    }

    const unBlockUser = async () => {
        await UserService.unBlockUser(userId);
        fetch();
    }

    return (

        <Dropdown>
            <Dropdown.Toggle variant="link" id="dropdown-basic" className={styles.dropdowntoggle}>
                <BsThreeDots style={{ color: 'grey' }} />
            </Dropdown.Toggle>

            {mode == "block" &&
                <Dropdown.Menu>

                    <Dropdown.Item onClick={blockUser}>Block User</Dropdown.Item>
                    <Dropdown.Item >Report User</Dropdown.Item>
                </Dropdown.Menu>
            }

            {mode == "unblock" &&
                <Dropdown.Menu>
                    <Dropdown.Item onClick={unBlockUser}>Unblock User</Dropdown.Item>
                </Dropdown.Menu>
            }
        </Dropdown>

    );
};

export default BlockUserButton;
