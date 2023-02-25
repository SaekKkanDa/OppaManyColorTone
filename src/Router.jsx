import { Routes, Route, BrowserRouter } from 'react-router-dom';

import MobileLayout from '@Components/Layout/MobileLayout';

import LandingPage from '@Pages/Landing';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MobileLayout />}>
                    <Route path="/" element={<LandingPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
