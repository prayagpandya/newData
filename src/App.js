import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/layout/Header/Header';
import Courses from './components/Courses/Courses';
import Footer from './components/layout/Footer/Footer';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import Subscribe from './components/Payment/Subscribe';
import NotFound from './components/layout/NotFound/NotFound';
import PaymentSuccess from './components/Payment/PaymentSuccess';
import PaymentFailed from './components/Payment/PaymentFailed';
import CoursesDetailes from './components/CoursesDetailes/CoursesDetailes';
import AboutCourse from './components/CoursesDetailes/AboutCourse';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdatePassword';
// import Users from './components/Admin/Users/Users';
import { useEffect } from 'react';
import Lenis from 'lenis';
import BlogsSingle from './components/Blogs/BlogsSingle';
import Blogs from './components/Blogs/Blogs';
import ServicesCard from './components/Services/ServicesCard';
// import Dashboard from './Admin/Dashboard/Dashboard';
import Users from './Admin/Dashboard/Users/userstable';
import ManageCourses from './Admin/Dashboard/Courses/courseManage';
import CreateCourseForm from './Admin/Dashboard/Courses/courseCreate';
import ContactList from './Admin/Dashboard/Contactus/contactUs';
import BookDemos from './Admin/Dashboard/Booked Demos/bookDemos';
import CourseDetailsAdmin from './Admin/Dashboard/Courses/courseDetailsAdmin';
import Payment from './payment/payment';
import AboutService from './components/Services/ServicesCard';
import BookServices from './Admin/Dashboard/Booked Demos/bookServices';
function App() {
  // window.addEventListener('contextmenu', e => e.preventDefault());
  useLenis();
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<AboutCourse />} />
        <Route path="/blogs/:id" element={<BlogsSingle />} />
        <Route path="/services/:id" element={<AboutService />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/profile/course/:id" element={<CoursesDetailes />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request" element={<Request />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/paymentFailed" element={<PaymentFailed />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/manage-courses" element={<ManageCourses />} />
        <Route
          path="/admin/manage-courses/:courseId"
          element={<CourseDetailsAdmin />}
        />

        <Route path="/admin/create-course" element={<CreateCourseForm />} />
        <Route path="/admin/contacts" element={<ContactList />} />
        <Route path="/admin/bookings" element={<BookDemos />} />
        <Route path="/admin/book-services" element={<BookServices />} />
        {/* <Route path="/admin/users" element={<Users />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.5,
      easing: t => t,
      lerp: 0.05,
      smooth: true,
      direction: 'vertical',
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
};
