
import axios from 'axios';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';
const baseUrl = 'http://localhost:3001/api/diaries'

export const getDiaryEntries =()=> {
   
return axios.get<NonSensitiveDiaryEntry[]>(baseUrl).then((response=>response.data))

}     

export const createEntry = (entry: NewDiaryEntry)  => {
  
 return  axios.post<DiaryEntry[]>(baseUrl,entry).then(response=>response.data )
 
}