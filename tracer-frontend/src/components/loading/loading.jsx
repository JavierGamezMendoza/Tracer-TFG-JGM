import Spinner from 'react-bootstrap/Spinner';
import { Container, Row } from 'react-bootstrap';

const Loading = () => {

    return (
        <Container fluid className='h-100'>
            <Row className='h-100 d-flex justify-content-center align-items-center'>
                <Spinner variant='primary' animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Row>
        </Container>
    );
};

export default Loading;