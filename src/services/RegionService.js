import axios from "axios";
import {Base_URL} from "../constant";

class RegionService {
    getRegions(){
        const accessToken = localStorage.getItem('accessToken');
        return axios.get(Base_URL + '/admin/regions', {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
    };
}

export default new RegionService();
