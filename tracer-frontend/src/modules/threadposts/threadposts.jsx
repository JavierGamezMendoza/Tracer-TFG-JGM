import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container, Card, Row } from 'react-bootstrap';
import Loading from '../../components/loading/loading';
import threadService from '../../services/threadService'
import styles from './threadposts.module.css';
import Image from 'react-bootstrap/Image';
import { FaUser } from 'react-icons/fa';
import { GoPaperAirplane } from 'react-icons/go';
import { AiFillMessage } from 'react-icons/ai';
import threadpostService from '../../services/threadpostService';
import authService from '../../services/authService'
import dateService from '../../services/dateService'
import { IoShieldCheckmark } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip'
import { FaRegCheckCircle, FaHeart } from "react-icons/fa";
import UserService from '../../services/userService';

const Threadposts = () => {
    const { id } = useParams();
    const [thread, setThread] = useState(null);
    const [threadPosts, setThreadPosts] = useState(null)
    const [message, setMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(null);

    const fetchThreadposts = async () => {
        const threadById = await threadService.getThreadById(id);
        setThread(threadById);
        setThreadPosts(dateService.sortByCreationDate(threadById.threadposts));
        console.log(threadById)

    };

    const fetchCurrentUser = () => {
        const threadById = authService.getCurrentUser();
        setCurrentUser(threadById);
    };

    const sendPost = async () => {
        console.log(currentUser);
        try {

            const threadpost = await threadpostService.addThreadpost(
                {
                    "message": message,
                    "user": currentUser.id,
                    "thread": thread.id
                }
            );
            setMessage("");
            fetchThreadposts();
        } catch (error) {
            console.log(error);
        }
    };

    const closeThread = async () => {
        try {
            const threadpost = await threadService.closeThread(thread.id);
            fetchThreadposts();
        } catch (error) {
            console.log(error);
        }
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault(); // Evita el comportamiento predeterminado del Enter (agregar nueva línea)
            if (message.trim() !== '') {
                sendPost(message); // Llama a la función para enviar el mensaje
                setMessage(''); // Borra el contenido del textarea después de enviar el mensaje
            }
        }
    };

    useEffect(() => {
        console.log("EL ID ES:", id)
        fetchCurrentUser();
        fetchThreadposts();
    }, []);

    if (!thread) {
        return <Loading />
    }

    const followThread = async (id) => {
        try {
            await UserService.followThread(id);
            fetchThreadposts();
        } catch (error) {
            console.log(error);
        }
    };

    const unFollowThread = async (id) => {
        try {
            await UserService.unFollowThread(id);
            fetchThreadposts();
        } catch (error) {
            console.log(error);
        }
    };

    const handleFollowButton = (id) => (event) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            followThread(id);
        } else {
            unFollowThread(id);
        }
    };
    return (
        <div>

            <Container>

                <Row className='justify-content-center align-items-center m-3' xs={1} md={1} lg={1} xl={12}>
                    <Card className={styles.card}>
                        <Card.Body>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <input
                                        type="checkbox"
                                        className='d-none'
                                        id="btn-check"
                                        autoComplete="off"
                                        onChange={handleFollowButton(thread.id)}
                                        checked={thread.users.some(user => user.id === currentUser.id)}
                                    />
                                    <label className={`${styles.checkbox}`} htmlFor="btn-check"><FaHeart></FaHeart></label>
                                </div>
                                <div className='align-items-center justify-content-center'>
                                    <Image className={styles.profilePic} src={thread.creator.img} /> {thread.creator.username}
                                </div>
                            </div>
                            <hr />
                            <div className='justify-content-left'>
                                <h5>
                                    {thread.title}
                                </h5>

                                <div className='p-4 bg-light rounded mt-4'>
                                    {thread.message}
                                </div>
                            </div>
                            <div className='d-flex justify-content-between align-items-center mt-4'>
                                <div >
                                    {thread.closeDate != null &&
                                        <span className={`${styles.solvedSpan} d-flex justify-content-center align-items-center p-2`}><FaRegCheckCircle className='me-1' />SOLVED</span>
                                    }
                                    {thread.closeDate == null &&
                                        <span className={`${styles.openSpan} d-flex justify-content-center align-items-center p-2`}><FaRegCheckCircle className='me-1' />OPEN</span>
                                    }
                                </div>
                                <div className='d-flex align-items-centers'>
                                    <div className='d-flex align-items-center'>
                                        <FaUser className='me-1'></FaUser> {thread.users.length}
                                    </div >
                                    <div className='ms-2 d-flex align-items-center'>
                                        <AiFillMessage className='me-1'></AiFillMessage> {thread.threadposts.length}

                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Row>

                {threadPosts.map((threadpost, index) => (
                    <Row className='justify-content-center align-items-center m-3' key={index} >
                        <Card>
                            <Card.Body>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <p className='text-secondary'>{dateService.formatDate(threadpost.creationDate)}</p>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <Image className={styles.profilePic} src={threadpost.user.img} /> {threadpost.user.username}
                                        {threadpost.user.reliable &&
                                            <div className='d-flex align-items-center justify-content-center'>
                                                <IoShieldCheckmark className={`${styles.reliable} ms-2`} data-tooltip-id="my-tooltip" data-tooltip-content="This is a Reliable user" />
                                                <Tooltip id="my-tooltip" />
                                            </div>

                                        }
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mt-3 mb-3'>
                                    {threadpost.message}
                                </div>
                                {thread.closeDate == null && threadpost.user.id != currentUser.id && thread.creator.id == currentUser.id &&
                                    <div >
                                        <button onClick={closeThread} className={`${styles.solvedButton} d-flex justify-content-center align-items-center`}><FaRegCheckCircle className='me-1' /> Mark as solved</button>
                                    </div>
                                }
                            </Card.Body>
                        </Card>
                    </Row>
                ))}


            </Container>
            <Row className={`${styles.postContainer} m-auto justify-content-center align-items-center col-10`}>
                <div className={`${styles.customInput} input-group`}>
                    <textarea
                        placeholder='Text your reply...'
                        className={`${styles.postBox} form-control`}
                        value={message}
                        onChange={handleMessageChange}
                        onKeyDown={handleKeyDown}
                        style={{ height: `${message.split('\n').length * 1.2}em` }} // Ajusta la altura según las líneas de texto
                        aria-label="With textarea"
                    />
                    <button onClick={sendPost} className={`${styles.customButton} input-group-text`} id="addon-wrapping">
                        <GoPaperAirplane></GoPaperAirplane>
                    </button>
                </div>
            </Row>
        </div>


    );
};

export default Threadposts;