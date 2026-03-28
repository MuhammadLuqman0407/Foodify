import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import ChooseRegister from "../pages/auth/ChooseRegister";
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import CreateFood from "../pages/food-partner/CreateFood";
import Home from "../pages/general/Home";
import Profile from "../pages/food-partner/Profile";
import BottomNav from "../components/BottomNav";  

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<ChooseRegister/>} />
        <Route path="/user/register" element={<UserRegister/>} />
        <Route path="/user/login" element={<UserLogin/>} />
        <Route path="/" element={ <><Home/> <BottomNav/> </>} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister/>} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin/>} />
        <Route path = "/profile" element = {<Profile/>} /> 
        <Route path="/food-partner/profile/:id" element={<Profile/>} /> 
        <Route path="/food-partner/:id" element={<Profile />} />
        <Route path="/create-food" element={<CreateFood />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
