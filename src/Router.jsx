import { Routes, Route, BrowserRouter } from 'react-router-dom';

import MobileLayout from '@Components/Layout/MobileLayout';

import LandingPage from '@Pages/Landing';
import ImageUploadPage from '@Pages/ImageUpload';
import ResultPage from '@Pages/Result';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MobileLayout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/result" element={<ResultPage />} />
                    <Route path="/image-upload" element={<ImageUploadPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
