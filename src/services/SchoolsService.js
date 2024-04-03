import axios from "axios";
import {Base_URL} from "../constant";

class SchoolService{
    getSchools(){
        axios.get(Base_URL + '/admin/schools')
            .then(response=>{
                return response.data;
            })
    };

    getSchoolsById(id){
        axios.get(Base_URL + `/admin/schools/${id}`)
            .then(response=>{
                return response.data;
            })
    }

    createSchools(data){
        axios.post(Base_URL + `/admin/schools`,data)
            .then(response=>{
                return response.data;
            })
    }

    updateSchools(id,data){
        axios.put(Base_URL + `/admin/schools/${id}`,data)
            .then(response=>{
                return response.data;
            })
    }

    deleteSchools(id){
        axios.delete(Base_URL + `/admin/schools/${id}`)
            .then(response=>{
                return response.data;
            })
    }

}
export default new SchoolService();
