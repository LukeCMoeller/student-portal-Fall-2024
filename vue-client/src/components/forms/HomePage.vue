<script>
import styles from '../../styles/HomePage.module.css'
import ApplyButton from '../common/Button.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Row from 'primevue/row'
import {RouterView} from 'vue-router'
//test
</script>


<template>
    <div className={styles.HomePage}>
      <DataTable>
        <div className={styles.appHeader}>
          <h1 className={styles.h1Style}>CS Applications</h1>
          <h4 className={styles.h4Style}>Welcome to the CS Applications System</h4>
        </div>
      </DataTable>

      <DataTable>
        <Row className="gx-2">
          <Column md={5} className={styles.boxStyle} style={{ backgroundColor: #d1d1d1}}> 
            <h2 className={styles.h2Style}>Requirements</h2>
            <p>In order to be considered for admission to the professional program, a student must have:</p>
            <ol className={styles.customList}>
              <li>Passed all pre-professional program courses with a C or better</li>
              <li>Achieved at least a 2.3 GPA on all pre-professional courses (including transfer courses)</li>
            </ol>
          </Column>  
          <Column md={{ span: 5, offset: 2 }} className={styles.applyBoxStyle} style={{ backgroundColor: #d1d1d1}}>
            <h2 className={styles.h2Style}>Apply</h2>
            <p className={styles.pStyleApply}>When you are ready to apply, click the button below!</p>
            <br/> 
            <RouterLink to="/Apply" className={styles[link-no-decoration]}> 
              <div className={styles.buttonContainer}>
                <ApplyButton/> 
              </div>
            </RouterLink>
          </Column>
        </Row>
      </DataTable>
    </div>
</template>


