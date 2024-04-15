import axios from "axios";
import {Base_URL} from "../constant";

class StudentService {

    getStudents(schoolId) {
        const accessToken = localStorage.getItem('accessToken');
        return axios.get(`${Base_URL}/admin/schools/${schoolId}/users/students`, {
            headers: { Authorization: `Bearer ${accessToken}`},
                params: {
                    search: ''
                },
        },
        );
    };

    createStudents(data) {
        const accessToken = localStorage.getItem('accessToken');
        return axios.post(`${Base_URL}/admin/students`, data, {
            headers: { Authorization: `Bearer ${accessToken}`}
        });
    };

    getEachStudent(studentId) {
        const accessToken = localStorage.getItem('accessToken');
        return axios.get(`${Base_URL}/admin/students/${studentId}`, {
            headers: { Authorization: `Bearer ${accessToken}`}
        });
    };

    updateStudents(studentId, data) {
        const accessToken = localStorage.getItem('accessToken');
        return axios.put(`${Base_URL}/admin/students/${studentId}`, data, {
            headers: { Authorization: `Bearer ${accessToken}`}
        });
    }

}

const studentServiceInstance = new StudentService();
export default studentServiceInstance;
