/* eslint-disable @typescript-eslint/no-unsafe-return */

import { BaseEntry, Diagnosis, Gender, HealthCheckEntry, HospitalEntry, NewEntry, NewPatientEntry, OccupationalHealthcareEntry } from "./types";


type Fields ={
  ssn?: unknown,
  name: unknown,
  dateOfBirth?: unknown,
  gender: unknown,
  occupation: unknown
};

const isString=(data:unknown):data is string=>{
   
  return typeof data ==='string' || data instanceof String;
    
};

const parseSsn = (ssn:unknown):string=>{
      
    if(!ssn || !isString(ssn))
        return '';
    
      return ssn;
};

const parseName = (name:unknown):string=>{
     if(!name || !isString(name))
        throw new Error(`Then name parameter is invalid :${name}`);
     
        return name;
};

const isDate =(date:string):boolean=>{
      
     return Boolean(Date.parse(date));
    
};

const parseDate =(date:unknown):string=>{

     if( !date || !isString(date) || !isDate(date) )
        return '';
      
      return date;
}; 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender=(gender:any):gender is Gender=>{
    
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return  Object.values(Gender).includes(gender);

};

const parseGender =(gender:unknown):Gender=>{
  
    if(!gender || !isGender(gender))
      throw new Error(`The gender is invalid ${gender}`);
     
      return gender;
};

const parseOccupation =(occupation:unknown):string=>{
    
  if(!occupation ||!isString(occupation))
      throw new Error(`The occupation is invalid ${occupation}`);
  
      return occupation;
};
export const toNewPatientEntry=(object:Fields):NewPatientEntry=>{
       
  const patientEntry:NewPatientEntry = {

      ssn: parseSsn(object.ssn),
      name:parseName(object.name),
      dateOfBirth:parseDate(object.dateOfBirth),
      gender:parseGender(object.gender),
      occupation:parseOccupation(object.occupation),
  };
   

  return patientEntry;
}; 


const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};


export const toNewEntry=(entry:NewEntry):NewEntry=>{
   
  const newEntry :Omit<BaseEntry,'id'> ={

    diagnosisCodes: parseDiagnosisCodes(entry),
    description:entry.description,
    date:parseDate(entry.date),
    specialist:entry.specialist,
   
  };

  switch(entry.type){

    case 'HealthCheck':

     (<HealthCheckEntry>newEntry).type=entry.type;
     (<HealthCheckEntry>newEntry).healthCheckRating=entry.healthCheckRating;

    break;

    case 'Hospital':
     
     (<HospitalEntry>newEntry).type=entry.type;
     (<HospitalEntry>newEntry).discharge=entry.discharge;

    break;

    case 'OccupationalHealthcare':
      (<OccupationalHealthcareEntry>newEntry).type=entry.type;
      (<OccupationalHealthcareEntry>newEntry).sickLeave=entry?.sickLeave;
      (<OccupationalHealthcareEntry>newEntry).employerName =entry.employerName;

    break;
  }


    return newEntry  as NewEntry ;
};


