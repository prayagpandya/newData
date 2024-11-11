import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './components/About/About';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword';
import Contact from './components/Contact/Contact';
import Courses from './components/Courses/Courses';
import AboutCourse from './components/CoursesDetailes/AboutCourse';
import CoursesDetailes from './components/CoursesDetailes/CoursesDetailes';
import Home from './components/Home/Home';
import Footer from './components/layout/Footer/Footer';
import Header from './components/layout/Header/Header';
import NotFound from './components/layout/NotFound/NotFound';
import PaymentFailed from './components/Payment/PaymentFailed';
import PaymentSuccess from './components/Payment/PaymentSuccess';
import ChangePassword from './components/Profile/ChangePassword';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdatePassword';
import Request from './components/Request/Request';
// import Users from './components/Admin/Users/Users';
import Lenis from 'lenis';
import { useEffect } from 'react';
import Blogs from './components/Blogs/Blogs';
import BlogsSingle from './components/Blogs/BlogsSingle';
// import Dashboard from './Admin/Dashboard/Dashboard';
import BookDemos from './Admin/Dashboard/Booked Demos/bookDemos';
import BookServices from './Admin/Dashboard/Booked Demos/bookServices';
import ContactList from './Admin/Dashboard/Contactus/contactUs';
import CreateCourseForm from './Admin/Dashboard/Courses/courseCreate';
import CourseDetailsAdmin from './Admin/Dashboard/Courses/courseDetailsAdmin';
import ManageCourses from './Admin/Dashboard/Courses/courseManage';
import ManageJobs from './Admin/Dashboard/Jobs/createJob';
import Users from './Admin/Dashboard/Users/userstable';
import HomePage from './components/JobPortal/page/HomePage';
import JobDetailsPage from './components/JobPortal/page/JobDetailsPage';
import AboutService from './components/Services/ServicesCard';
import Payment from './payment/payment';
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
        <Route path="/jobs" element={<HomePage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
        <Route
          path="/admin/manage-courses/:courseId"
          element={<CourseDetailsAdmin />}
        />

        <Route path="/admin/create-course" element={<CreateCourseForm />} />
        <Route path="/admin/create-job" element={<ManageJobs />} />
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
