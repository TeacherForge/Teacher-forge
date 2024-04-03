import axios from "axios";
import {Base_URL} from "../constant";

class StudentService{
    getStudents(schoolId){
        axios.get(Base_URL + `/admin/schools/${schoolId}/users?name=&role=STUDENT`)
            .then(response=>{
                return response.data;
            })
    };

    createStudents(data){
        axios.post(Base_URL + `/admin/students`,data)
            .then(response=>{
                return response.data;
            })
    };

    getEachStudent(studentId){
        axios.get(Base_URL + `/admin/students/${studentId}`)
            .then(response=>{
                return response.data;
            })
    };

    updateStudents(studentId, data){
        axios.put(Base_URL + `/admin/students/${studentId}`,data)
            .then(response=>{
                return response.data;
            })
    }

}
export default new StudentService();
