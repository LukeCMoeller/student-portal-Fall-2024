<template>
    <Modal
      :show="show"
      @hide="onHide"
      centered
      size="lg"
    >
      <Modal.Header :class="styles['modal-header-color']" close-button>
        <Modal.Title>Review Application</Modal.Title>
      </Modal.Header>
      <Modal.Body :class="styles['modal-body-color']">
        <Form>
          <div :class="styles['status-dars-container']">
            <Form.Group :class="styles['status-group']">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" v-model="selectedStatus">
                <option value="Accepted">Accepted</option>
                <option value="Pending">Pending</option>
                <option value="Pending/Exception">Pending/Exception</option>
                <option value="Pending/Dismissed">Pending/Dismissed</option>
                <option value="Pending/Reinstated">Pending/Reinstated</option>
                <option value="Pending(All)">Pending(All)</option>
                <option value="Declined">Declined</option>
                <option value="Declined/Exception">Declined/Exception</option>
                <option value="Withdrawn">Withdrawn</option>
              </Form.Control>
            </Form.Group>
            <Form.Group :class="styles['dars-group']">
              <Form.Label>DARS Updated By</Form.Label>
              <Form.Control
                type="text"
                v-model="darsUpdatedBy"
              />
            </Form.Group>
          </div>
          <div :class="styles['spacer']"></div>
          <Form.Group :class="notesBorder ? styles['notes-border-red'] : ''">
            <Form.Label :class="styles.notesLabel">Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              v-model="editableNotes"
              :class="`${styles['notes-textarea']} ${notesBorder ? styles['notes-textarea-red'] : ''}`"
              @input="handleNotesChange"
            />
          </Form.Group>
          <div :class="styles['spacer']"></div>
          <table :class="styles['custom-review-table']">
            <thead>
              <tr :class="styles['review-table-header']">
                <th>Course</th>
                <th>Status</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="course in courses"
                :key="`${course.class_subject}-${course.class_catalog}`"
                :class="styles[course.status.replace(/\s+/g, '-').toLowerCase()]"
              >
                <td>{{ `${course.class_subject} ${course.class_catalog}` }}</td>
                <td>{{ course.status }}</td>
                <td>{{ course.grade }}</td>
              </tr>
            </tbody>
          </table>
        </Form>
      </Modal.Body>
      <Modal.Footer :class="styles['modal-header-color']">
        <Button variant="secondary" @click="onHide">Close</Button>
        <Button variant="primary" @click="handleSaveChanges">Save Changes</Button>
      </Modal.Footer>
    </Modal>
  </template>
  
  <script>
  import { ref, watch, onMounted } from 'vue';
  import { Modal, Button, Form } from 'bootstrap-vue'; // Adjust based on your modal component
  import { he } from 'he';
  import styles from '../../../styles/AdminForm.module.css';
  
  export default {
    props: {
      show: Boolean,
      application: Object,
      courses: Array,
      fetchCourses: Function,
      onHide: Function,
    },  components: {
    Button,
    Modal,
    Form
    },
    /*
    setup(props) {
      const editableNotes = ref('');
      const darsUpdatedBy = ref('');
      const selectedStatus = ref('');
      const notesBorder = ref(false);
  
      const handleSaveChanges = async () => {
        const payload = {
          notes: editableNotes.value.trim(),
          dars_updated_by: darsUpdatedBy.value.trim(),
          status: selectedStatus.value,
        };
  

        try {
          const response = await fetch(`http://localhost:3002/api/updateApplication/?appId=${props.application.wid}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            console.log('Update successful', data);
            props.onHide(); // Close modal after successful update
          } else {
            console.error('Update failed', data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
          
      };
      
  
      watch(() => props.show, (newValue) => {
        if (newValue && props.application) {
          editableNotes.value = '';
          if (props.application.notes != null) {
            const decodedNotes = he.decode(props.application.notes);
            editableNotes.value = `\n${decodedNotes}`;
          }
          darsUpdatedBy.value = props.application.dars_updated_by || '';
          selectedStatus.value = props.application.status;
          props.fetchCourses(props.application.wid);
        }
      });
  
      const handleNotesChange = (e) => {
        const decodedInput = he.decode(e.target.value);
        editableNotes.value = decodedInput;
      };
  
      watch(() => props.courses, (newCourses) => {
        const waiverRequested = newCourses.some(course => course.status === 'waiver-requested');
        notesBorder.value = waiverRequested;
      });
  
      return {
        editableNotes,
        darsUpdatedBy,
        selectedStatus,
        notesBorder,
        handleSaveChanges,
        handleNotesChange,
        styles,
      };
    },*/
  };
  </script>