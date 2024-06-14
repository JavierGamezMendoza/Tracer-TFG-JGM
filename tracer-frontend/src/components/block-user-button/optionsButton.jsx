import React, { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Dropdown } from 'react-bootstrap';
import styles from './optionsButton.module.css';
import UserService from '../../services/userService';
import threadpostService from '../../services/threadpostService';
import { ImBin } from 'react-icons/im';
import threadService from '../../services/threadService';

const OptionsButton = ({ mode, userId, fetch, userRole, type, threadPostId, threadId }) => {

    const blockUser = async () => {
        await UserService.blockUser(userId);
        fetch();
    }

    const unBlockUser = async () => {
        await UserService.unBlockUser(userId);
        fetch();
    }

    const deletePost = async () => {
        await threadpostService.deleteThreadpost(threadPostId);
        fetch();
    }

    const deleteThread = async () => {
        await threadService.deleteThread(threadId);
        fetch();
    }

    const banUser = async () => {
        await UserService.banUser(userId);
        fetch();
    }

    return (

        <Dropdown>
            <Dropdown.Toggle variant="link" id="dropdown-basic" className={styles.dropdowntoggle}>
                <BsThreeDots style={{ color: 'grey' }} />
            </Dropdown.Toggle>

            {mode == "block" && userRole == "USER" && type == "thread" &&
                <Dropdown.Menu>
                    <Dropdown.Item onClick={blockUser}>Block User</Dropdown.Item>
                    <Dropdown.Item >Report User</Dropdown.Item>
                </Dropdown.Menu>
            }

            {mode == "unblock" && userRole == "USER" && type == "thread" &&
                <Dropdown.Menu>
                    <Dropdown.Item onClick={unBlockUser}>Unblock User</Dropdown.Item>
                </Dropdown.Menu>
            }

            {userRole == "ADMIN" && type == "threadpost" &&
                <Dropdown.Menu>
                    <Dropdown.Item onClick={deletePost} className='text-danger align-items-center'>Delete post <ImBin /></Dropdown.Item>
                    <Dropdown.Item onClick={banUser}>Ban user</Dropdown.Item>
                </Dropdown.Menu>
            }

            {userRole == "ADMIN" && type == "thread" &&
                <Dropdown.Menu>
                    <Dropdown.Item onClick={deleteThread} className='text-danger align-items-center'>Delete thread <ImBin /></Dropdown.Item>
                    <Dropdown.Item onClick={banUser}>Ban user</Dropdown.Item>
                </Dropdown.Menu>
            }
        </Dropdown>

    );
};

export default OptionsButton;
