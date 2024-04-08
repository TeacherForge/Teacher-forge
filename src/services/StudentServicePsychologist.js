import axios from "axios";
import {Base_URL} from "../constant";

class StudentServicePsychologist {

    getEachStudent(studentId) {
        const accessToken = localStorage.getItem('accessToken');
        return axios.get(`${Base_URL}/psychologist/students/${studentId}`, {
            headers: { Authorization: `Bearer ${accessToken}`}
        });
    };

    updateStudents(studentId, data) {
        const accessToken = localStorage.getItem('accessToken');
        return axios.put(`${Base_URL}/psychologist/students/${studentId}`, data, {
            headers: { Authorization: `Bearer ${accessToken}`}
        });
    }

}

export default new StudentServicePsychologist();


