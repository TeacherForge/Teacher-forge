import axios from "axios";
import {Base_URL} from "../constant";

class PsychologyService{
    getPsychology(schoolId){
        const accessToken = localStorage.getItem('accessToken');
        return axios.get(Base_URL + `/admin/schools/${schoolId}/users?name=&role=PSYCHOLOGIST`, {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
    };

    updatePsychology(schoolId,userId,data){
        const accessToken = localStorage.getItem('accessToken');
        return axios.put(Base_URL + `/admin/schools/${schoolId}/users/${userId}`,data, {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
    };
    createPsychology(data){
        const accessToken = localStorage.getItem('accessToken');
        return axios.post(Base_URL + `/admin/psychologist`,data, {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
    }

    delPsychology(schoolId,userId){
        const accessToken = localStorage.getItem('accessToken');
        return axios.get(Base_URL + `/admin/schools/${schoolId}/users/${userId}`, {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
    };
}
export default new PsychologyService();
