import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './componenets/login/LoginPage';
import {createContext, useContext, useEffect, useState} from 'react';
import Navbar from './componenets/navbar/Navbar';
import SchoolsPage from "./componenets/admin/schools/SchoolsPage";
import ReportsPage from "./componenets/teacher/report-teacher/ReportsPage";
import EachStudentPage from "./componenets/admin/schools/each/EachStudentPage";
import AppealsPageTeacher from "./componenets/teacher/appeals-teacher/AppealsPageTeacher";
import ReportsPagePsychologist from './componenets/psychologist/report-psychologist/ReportsPagePsychologist';
import AppealsPagePsychologist from "./componenets/psychologist/appeals-psychologist/AppealsPagePsychologist";
import EachSchoolPage from "./componenets/admin/schools/EachSchoolPage";
import TestPageTeacher from "./componenets/teacher/test-teacher/TestPageTeacher"
import TestPagePsychologist from "./componenets/psychologist/test-psychologist/TestPagePsychologist"


function App() {
    const [accessToken, setAccessToken] = useState(false);
    const [role, setRole] = useState(false);
    
    const getHomePagePath = () => {
        switch (role) {
            case 'ADMIN': return '/schools';
            case 'TEACHER': return '/report-teacher';
            case 'PSYCHOLOGIST': return '/report-psychologist';
            default: return '/login';
        }
    };

    return (
        <UserContext.Provider value={{ accessToken, setAccessToken, role, setRole }}>
            <div className={accessToken ? 'main-page' : 'login-page'}>
                <Router>
                    {accessToken && <Navbar />}
                    <Routes>
                        <Route path='/' element={<Navigate to={getHomePagePath()} />} />
                        <Route path='/login' element={<LoginPage/>} />
                        <Route path='/schools' element={<ComponentWithMargin><SchoolsPage /></ComponentWithMargin>} />
                        <Route path='/schools/:id' element={<ComponentWithMargin><EachSchoolPage/></ComponentWithMargin>} />
                        <Route path='/schools/student/:studentId' element={<ComponentWithMargin><EachStudentPage /></ComponentWithMargin>} />
                        <Route path='/report-teacher' element={<ReportsPage />} />
                        <Route path='/report-psychologist' element={<ReportsPagePsychologist />}/>
                        <Route path='/report-psychologist/:id' element={<ReportsPagePsychologist />} />
                        <Route path='/appeals-psychologist' element={<AppealsPagePsychologist />} />
                        <Route path='/appeals-teacher' element={<AppealsPageTeacher />} />
                        <Route path='/test-teacher' element={<TestPageTeacher />} />
                        <Route path='/test-psychologist' element={<TestPagePsychologist />} />
                        {/* Другие маршруты */}
                    </Routes>
                </Router>
            </div>
        </UserContext.Provider>
    );

}
const ComponentWithMargin = ({ children }) => (
    <div style={{ margin: '100px' }}>
        {children}
    </div>
);


export const UserContext = createContext({
    accessToken: false,
    setAccessToken: () => {},
    role: '',
    setRole: () => {}
});
export const useUserContext = () => useContext(UserContext);
export default App;