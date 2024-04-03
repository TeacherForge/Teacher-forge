import axios from "axios";
import {Base_URL} from "../constant";

class TeacherService{
    getTeachers(schoolId){
        axios.get(Base_URL + `/admin/schools/${schoolId}/users?name=&role=TEACHER`)
            .then(response=>{
                return response.data;
            })
    };

    updateTeachers(schoolId,userId,data){
        axios.put(Base_URL + `/admin/schools/${schoolId}/users/${userId}`,data)
            .then(response=>{
                return response.data;
            })
    };

    createTeacher(data){
        axios.post(Base_URL + `/admin/teacher`,data)
            .then(response=>{
                return response.data;
            })
    }


    delUser(schoolId,userId){
        axios.get(Base_URL + `/admin/schools/${schoolId}/users/${userId}`)
            .then(response=>{
                return response.data;
            })
    };
}
export default new TeacherService();
