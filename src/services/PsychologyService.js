import axios from "axios";
import {Base_URL} from "../constant";

class PsychologyService{
    getPsychology(schoolId){
        axios.get(Base_URL + `/admin/schools/${schoolId}/users?name=&role=PSYCHOLOGIST`)
            .then(response=>{
                return response.data;
            })
    };

    updatePsychology(schoolId,userId,data){
        axios.put(Base_URL + `/admin/schools/${schoolId}/users/${userId}`,data)
            .then(response=>{
                return response.data;
            })
    };
    createPsychology(data){
        axios.post(Base_URL + `/admin/psychologist`,data)
            .then(response=>{
                return response.data;
            })
    }

    delPsychology(schoolId,userId){
        axios.get(Base_URL + `/admin/schools/${schoolId}/users/${userId}`)
            .then(response=>{
                return response.data;
            })
    };
}
export default new PsychologyService();
