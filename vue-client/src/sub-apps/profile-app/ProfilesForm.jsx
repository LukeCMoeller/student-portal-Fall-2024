import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from '../../styles/ProfileForm.module.css'; 
import { UserContext } from '../../context/UserContext';
import LoadingIndicator from '../common/LoadingIndicator'; 
import { useUsersStore } from '@/stores/UserStore';
import { useTokenStore } from '@/stores/TokenStore';
import Logger from 'js-logger'


export default function ProfilesForm() { 
    const tokenStore = useTokenStore()
    const usersStore = useUsersStore()
    usersStore.hydrate();
    const user = usersStore.getUser(tokenStore.id())

    Logger.info(tokenStore.id())
    Logger.info(user)

    const handleUpdateProfile = ()=>{}
    const loading = false;
    const userData = useContext(UserContext)
    const [firstName, setFirstName] = useState(user.first_name || '');
    const [lastName, setLastName] = useState(user.last_name || '')

    

    const updateProfileOnClick = (event) => { 
        event.preventDefault();
        handleUpdateProfile(userData.eid, firstName, lastName);
    };

    return (
        <div > 
            <Container role="main" className={styles.ProfilesForm}>
                
                <Row className="mb-4">
                    <Col xs={12}>
                        <h3 className={styles.h3Style}>Update your user profile:</h3>
                    </Col>
                </Row>

                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="first_name">
                        <Form.Label column sm={2}>First Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" defaultValue={user.first_name} onChange={(e) => setFirstName(e.target.value)} style={{ backgroundColor: '#d1d1d1' }} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="last_name">
                        <Form.Label column sm={2}>Last Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" defaultValue={user.last_name} onChange={(e) => setLastName(e.target.value)} style={{ backgroundColor: '#d1d1d1' }} />
                        </Col>
                    </Form.Group>

                    <Row className="mb-3">
                        <Col xs={12}> 
                            <button className={styles['btn-update']} onClick={updateProfileOnClick}>Update Profile</button>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12}>
                            <h4 className={styles['profile-help-message']}>Contact your advisor or department to update these items if they are incorrect</h4>
                        </Col>
                    </Row>

                    <Form.Group as={Row} className="mb-3" controlId="email">
                        <Form.Label column sm={2}>Email Address</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" disabled defaultValue={user.email} style={{ backgroundColor: '#d1d1d1' }} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="wid">
                        <Form.Label column sm={2}>Wildcat ID</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" disabled defaultValue={user.wid} style={{ backgroundColor: '#d1d1d1' }} /> 
                        </Col>
                    </Form.Group>
                </Form>
            </Container>  
            <footer className={styles.footer}>
                <Container>
                    <p>CS Applications - Contact webmaster@cs.ksu.edu for help</p>
                </Container>
            </footer>
        </div>
    );
}

