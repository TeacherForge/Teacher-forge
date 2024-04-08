import axios from "axios";
import {Base_URL} from "../constant";

class TeacherService{
    getTeachers(schoolId){
        const accessToken = localStorage.getItem('accessToken');
        return axios.get(Base_URL + `/admin/schools/${schoolId}/users?name=&role=TEACHER`, {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
    };

    updateTeachers(schoolId,userId,data){
        const accessToken = localStorage.getItem('accessToken');
        return axios.put(Base_URL + `/admin/schools/${schoolId}/users/${userId}`,data, {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
    };

    createTeacher(data){
        const accessToken = localStorage.getItem('accessToken');
        return axios.post(Base_URL + `/admin/teacher`,data, {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
    }


    delUser(schoolId,userId){
        const accessToken = localStorage.getItem('accessToken');
        return axios.get(Base_URL + `/admin/schools/${schoolId}/users/${userId}`, {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
    };
}
export default new TeacherService();
