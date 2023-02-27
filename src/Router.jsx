import { Routes, Route, BrowserRouter } from 'react-router-dom';

import MobileLayout from '@Components/Layout/MobileLayout';

import LandingPage from '@Pages/Landing';
import ImageUploadPage from '@Pages/ImageUpload';
import ResultPage from '@Pages/Result';
import ChoiceColor from './pages/ChoiceColor/index';
import FaceDetectionPage from '@Pages/FaceDetection';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MobileLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/image-upload" element={<ImageUploadPage />} />
          <Route path="/choice-color" element={<ChoiceColor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
