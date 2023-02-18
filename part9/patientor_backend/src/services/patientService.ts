
import { v1 as uuid } from 'uuid';
import patients from "../../data/patients";
import { Entry, NewPatientEntry, NonSensitivePatientData, Patient } from '../types';

const getPatients=():Array<Patient> => patients;

const getNonSensitivePatientsData=():Array<NonSensitivePatientData> => patients
.map( ({id,name,dateOfBirth,gender,occupation,entries}) => ( { id, name,dateOfBirth,gender,occupation,entries}));


const addPatient=(patient:NewPatientEntry):NonSensitivePatientData =>{
      
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment

   const newPatient=<Patient>{...patient,id:uuid()};

   patients.push(newPatient);

  return newPatient ;
     
};

const getPatientData=(id:string):Patient=>{

  const patient:Patient= patients.find(p => id==p.id )  as Patient;
  if(!patient) throw new Error(`Patient not found`);

  return patient;
     
};

const addPatientEntry=(id:string,entry:Entry)=>{
       
   const patient:Patient= patients.find(p => id==p.id )  as Patient;
   
   if(!patient) throw new Error("Patient not found");
   
   //add to Db
   patient.entries=patient.entries.concat(entry);
    
   return entry;
};


export default {
  getPatients,
  getNonSensitivePatientsData,
  addPatient,
  getPatientData,
  addPatientEntry
};

