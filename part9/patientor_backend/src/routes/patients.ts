import express from "express";
import patientService from "../services/patientService";
import { NewPatientEntry } from "../types";
import toNewPatientEntry from '../utils';
const router = express.Router();


router.get('/', (_req, res) =>{
     
  res.send(patientService.getNonSensitivePatientsData());
  
});

router.post('/', (req, res) =>{

  try{
   
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry:NewPatientEntry = toNewPatientEntry(req.body);

    res.send(patientService.addPatient(newPatientEntry));
  }
  catch(err:unknown){
      let errMsg =' Error : ' ;

      if (err instanceof Error)
          errMsg+=err.message;
      
    res.status(404).send(errMsg);
  }
    
});

export default router;