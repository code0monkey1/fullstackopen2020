import express from "express";
import { v4 as uuid } from 'uuid';
import patientService from "../services/patientService";
import { NewEntry, NewPatientEntry } from "../types";
import { toNewEntry, toNewPatientEntry } from '../utils';
const router = express.Router();


router.get('/', (_req, res) =>{
     
  res.send(patientService.getNonSensitivePatientsData());
  
});


router.get('/:id', (req, res) =>{
     
  res.status(200).json(patientService.getPatientData(req.params.id));
  
});

router.post("/:id/entries", (req, res)=>{  
   console.log(`post("api/patients/:id/entries")`);

   console.log("data received",JSON.stringify(req.body,null,2));
  try{          

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
    const newEntry:NewEntry =toNewEntry(req.body);

    res.json(patientService.addPatientEntry(req.params.id, {...newEntry,id:uuid()}));
   
   }catch(err:unknown){

     let errMsg = 'Error : ';

     if (err instanceof Error)
          errMsg+=err.message;
    
     res.status(400).json(errMsg);
   }
});

router.post('/', (req, res) =>{
  console.log(`post("api/patients/")`);
  try{
   
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry:NewPatientEntry = toNewPatientEntry(req.body);

    res.json(patientService.addPatient(newPatientEntry));
  }
  catch(err:unknown){
      let errMsg =' Error : ' ;

      if (err instanceof Error)
          errMsg+=err.message;
      
    res.status(400).json(errMsg);
  }
    
});

export default router;