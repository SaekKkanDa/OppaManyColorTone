import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import MobileLayout from '@Components/Layout/MobileLayout';

import LandingPage from '@Pages/Landing';
import ImageUploadPage from '@Pages/ImageUpload';
import ResultPage from '@Pages/Result';
import ChoiceColor from '@Pages/ChoiceColor';
import WrongAccessPage from '@Pages/WrongAccess';

import ROUTE_PATH from '@Constant/routePath';

function AppRouter() {
  const { landing, imageUpload, choiceColor, result } = ROUTE_PATH;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MobileLayout />}>
          <Route path={landing} element={<LandingPage />} />
          <Route path={imageUpload} element={<ImageUploadPage />} />
          <Route path={choiceColor} element={<ChoiceColor />} />
          <Route path={result} element={<ResultPage />} />
          <Route path="/*" element={<WrongAccessPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
