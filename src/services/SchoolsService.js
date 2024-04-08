import axios from "axios";
import {Base_URL} from "../constant";

class SchoolService{
    getSchools(){
        const accessToken = localStorage.getItem('accessToken');
        return axios.get(Base_URL + '/admin/schools', {
            headers: { Authorization: `Bearer ${accessToken}`}
        })

    };

    getSchoolsById(id){
        const accessToken = localStorage.getItem('accessToken');
        return axios.get(Base_URL + `/admin/schools/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
    }

    createSchools(data){
        const accessToken = localStorage.getItem('accessToken');
        return axios.post(Base_URL + `/admin/schools`,data, {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
    }

    updateSchools(id,data){
        const accessToken = localStorage.getItem('accessToken');
        return axios.put(Base_URL + `/admin/schools/${id}`,data, {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
    }

    deleteSchools(id){
        const accessToken = localStorage.getItem('accessToken');
        return axios.delete(Base_URL + `/admin/schools/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
    }

}
export default new SchoolService();
