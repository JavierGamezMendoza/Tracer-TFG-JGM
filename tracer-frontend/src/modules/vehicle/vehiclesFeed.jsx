import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import vehicleService from '../../services/vehicleService';
import { Container, Card, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Loading from '../../components/loading/loading';
import styles from './vehicle.module.css';
import { FaUser, FaCheck } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import dateService from '../../services/dateService'

const VehicleFeed = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [threads, setThreads] =useState(null)

  useEffect(() => {
    console.log("EL ID ES:", id)
    const fetchVehicle = async () => {
      const vehicleById = await vehicleService.getVehicleById(id);
      setVehicle(vehicleById);
      setThreads(dateService.sortByCreationDate(vehicleById.threads))
      console.log(vehicleById)
    };

    fetchVehicle();
  }, []);

  if (!vehicle) {

    return <Loading />
  }

  return (
    <Container>
      {threads.map((thread, index) => (
        <Row className='justify-content-center align-items-center m-3' key={index} xs={1} md={1} lg={1} xl={12}>
          <Card>
            <Card.Body>
              <div className='d-flex justify-content-between'>
                <div>
                  {thread.title}
                </div>
                <div className='align-items-center justify-content-center'>
                  <Image className={styles.profilePic} src={thread.creator.img} /> {thread.creator.username}
                </div>
              </div>
              <hr />
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
                <div>
                  <FaUser /> {thread.users.length}
                </div>
              </div>

            </Card.Body>
          </Card>
        </Row>
      ))}
    </Container>
  );
};

export default VehicleFeed;