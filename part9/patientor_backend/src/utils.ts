/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Gender, NewPatientEntry } from "./types";

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
const toNewPatientEntry=(object:Fields):NewPatientEntry=>{
       
  const patientEntry:NewPatientEntry = {

      ssn: parseSsn(object.ssn),
      name:parseName(object.name),
      dateOfBirth:parseDate(object.dateOfBirth),
      gender:parseGender(object.gender),
      occupation:parseOccupation(object.occupation),
      
  };
   

  return patientEntry;
}; 


export default toNewPatientEntry;