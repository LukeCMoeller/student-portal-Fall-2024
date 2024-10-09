<script>
    import { VContainer, VRow, VCol, VForm } from 'vuetify/components';
    import Button from 'primevue/button';
    import styles from '../../styles/ProfileForm.module.css'; 
   // import { UserContext } from '../../context/UserContext'; 
   // import LoadingIndicator from '../common/LoadingIndicator.vue'; 
    
    //const { userData, handleUpdateProfile, loading } = useUser(); 
    const handleUpdateProfile = ()=>{}
    const loading = false;
    //const userData = useContext(UserContext)
    //const [firstName, setFirstName] = useState(userData.first_name || '');
    //const [lastName, setLastName] = useState(userData.last_name || '')
    const updateProfileOnClick = (event) => { 
        event.preventDefault(); 
        //handleUpdateProfile(userData.eid, firstName, lastName);
    };


   // export default { data() {
   // return {
   //   userData: {
    //    first_name: ''
   //   }
   // };
  //},
  //methods: {
   // updateFirstName(event) {
   //   this.userData.first_name = event.target.value;
   // }
 // }
//};
</script>
    <template>
         <div> 
                <VContainer role="main" className={styles.ProfilesForm}>
                    
                    <VRow className="mb-4">
                        <VCol xs={12}>
                            <h3 className={styles.h3Style}>Update your user profile:</h3>
                        </VCol>
                    </VRow>
    
                    <VForm>
                        <Form.Group as={Row} className="mb-3" controlId="first_name">
                            <Form.Label column sm={2}>First Name</Form.Label>
                            <Col sm={10}>
                                <!--<Form.Control type="text" :value="userData.first_name"   @input="updateFirstName" :style="{ backgroundColor: '#d1d1d1' }" />-->
                            </Col>
                        </Form.Group>
    
                        <VForm.Group as={Row} className="mb-3" controlId="last_name">
                            <VForm.Label column sm={2}>Last Name</VForm.Label>
                            <VCol sm={10}>
                               <!--<VForm.Control type="text" :value="userData.last_name"   @input="updateFirstName" :style="{ backgroundColor: '#d1d1d1' }" />-->
                            </VCol>
                        </VForm.Group>
    
                        <VRow className="mb-3">
                            <VCol xs={12}> 
                                <Button className={styles[btn-update]} onClick={updateProfileOnClick}>Update Profile</Button>
                            </VCol>
                        </VRow>
    
                        <VRow className="mb-3">
                            <VCol xs={12}>
                                <h4 className={styles[profile-help-message]}>Contact your advisor or department to update these items if they are incorrect</h4>
                            </VCol>
                        </VRow>
    
                        <VForm.Group as={Row} className="mb-3" controlId="email">
                            <VForm.Label column sm={2}>Email Address</VForm.Label>
                            <VCol sm={10}>
                               <!--<VForm.Control type="text" disabled defaultValue={userData.email} style={{ backgroundColor: #d1d1d1 }} /> -->
                            </VCol>
                        </VForm.Group>
    
                        <VForm.Group as={Row} controlId="wid">
                            <VForm.Label column sm={2}>Wildcat ID</VForm.Label>
                            <VCol sm={10}>
                                <!-- <Form.Control type="text" disabled defaultValue={userData.wid} style={{ backgroundColor: #d1d1d1 }} /> -->
                            </VCol>
                        </VForm.Group>
                    </VForm>
                </VContainer>  
                <footer className={styles.footer}>
                    <Container>
                        <p>CS Applications - Contact webmaster@cs.ksu.edu for help</p>
                    </Container>
                </footer>
            </div>
    </template>
    
    
    
    
    