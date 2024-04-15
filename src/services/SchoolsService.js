import axios from "axios";
import {Base_URL} from "../constant";

class SchoolService{
    getSchools(data){
        const accessToken = localStorage.getItem('accessToken');
        const config = {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: data
        };

        return axios.get(Base_URL + '/admin/schools', config);
    }
    

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

const schoolServiceInstance = new SchoolService();
export default schoolServiceInstance;

