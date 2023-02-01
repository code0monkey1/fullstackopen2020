
import { v1 as uuid } from 'uuid';
import patients from "../../data/patients";
import { NewPatientEntry, NonSensitivePatientData, Patient } from '../types';
const getPatients=():Array<Patient> => patients;

const getNonSensitivePatientsData=():Array<NonSensitivePatientData> => patients
.map( ({id,name,dateOfBirth,gender,occupation}) => ( { id, name,dateOfBirth,gender,occupation}));


const addPatient=(patient:NewPatientEntry):Patient[] =>{
      
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    const id:string = uuid();
    
    patients.push({...patient,id});

    return patients;
     
};
export default {
  getPatients,
  getNonSensitivePatientsData,
  addPatient
};

