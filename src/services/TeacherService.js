import axios from "axios";
import {Base_URL} from "../constant";

class TeacherService{
    getTeachers(schoolId){
        const accessToken = localStorage.getItem('accessToken');
        return axios.get(Base_URL + `/admin/schools/${schoolId}/users?name=&role=TEACHER`, {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
    };

    updateTeachers(schoolId, userId, data){
        const accessToken = localStorage.getItem('accessToken');
        return axios.put(Base_URL + `/admin/schools/${schoolId}/users/${userId}`,data, {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
    };

    createTeacher(data){
        const accessToken = localStorage.getItem('accessToken');
        return axios.post(Base_URL + `/admin/users`,data, {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
    }


    delUser(schoolId,userId){
        const accessToken = localStorage.getItem('accessToken');
        return axios.delete(Base_URL + `/admin/schools/${schoolId}/users/${userId}`, {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
    };
}

const teacherServiceInstance = new TeacherService();
export default teacherServiceInstance;

