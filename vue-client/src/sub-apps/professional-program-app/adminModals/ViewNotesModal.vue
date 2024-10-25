<template>
    <div class="modal" :class="styles['notes-modal']" :show="show" @hide="onHide" size="lg" centered>
      <div class="modal-Header"close-button :class="styles['modal-header-color']">
        <div class = "modal-Title" id="contained-modal-title-vcenter">
          Admin Notes
        </div>
    </div>
      <div class = "modal-body" :class="styles['modal-body-color']">
        <Form.Control
          as="textarea"
          :class="styles['textarea-notes']"
          v-model="editableNotes"
        />
      </div>
      <div class = "modal-Footer" :class="styles['modal-header-color']">
        <Button @click="handleSave" variant="success">Save</Button>
        <Button @click="closeModal">Close</Button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch, onMounted } from 'vue';
  import Button from 'primevue/button';
  import { he } from 'he';
  import styles from '../../../styles/AdminForm.module.css';
  
  export default {
    props: {
      show: Boolean,
      notes: String,
      onHide: Function,
      onSave: Function,
    },  components: {
    Button,
    },
    setup(props) {
      const editableNotes = ref('');
  
      watch(() => props.notes, (newNotes) => {
        if (props.show) {
          const decodedNotes = he.decode(newNotes);
          editableNotes.value = `\n${decodedNotes}`;
        }
      });
  
      const handleSave = () => {
        props.onSave(editableNotes.value);
        props.onHide();
      };
  
      const closeModal = () => {
        props.onHide();
        editableNotes.value = '';
      };
  
      return {
        editableNotes,
        handleSave,
        closeModal,
        styles,
      };
    },
  };
  </script>
  

  