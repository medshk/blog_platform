import NavBar from "./components/layout/navBar";
import Home from "./pages/home";
import Footer from "./components/home/footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Posts from "./pages/posts";
import Authors from "./pages/authors";
import AuthorProfileView from "./components/author/authorProfileView";
import CreatePost from "./components/post/createPost";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import { AuthProvider } from "./contexts/authContext";
import Privateroute from "./components/protectedRoutes/privateRoute";
import ProtectedRouteFromAuthentication from "./components/protectedRoutes/protectedRouteFromAuthentication";
import UpdateProfile from "./components/author/updateProfile";
import PostSearch from "./components/post/postSearch";
import PostDetails from "./components/post/postDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/posts" element={<Posts />} />
            <Route exact path="/post/:id" element={<PostDetails />} />
            <Route exact path="/search/:keyword" element={<PostSearch />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/author/:id" element={<AuthorProfileView />} />
            <Route
              path="/create"
              element={
                <Privateroute redireTo="/">
                  <CreatePost />
                </Privateroute>
              }
            />
            <Route
              path="/update"
              element={
                <Privateroute redireTo="/">
                  <UpdateProfile />
                </Privateroute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRouteFromAuthentication redireTo="/">
                  <Login />
                </ProtectedRouteFromAuthentication>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRouteFromAuthentication redireTo="/">
                  <SignUp />
                </ProtectedRouteFromAuthentication>
              }
            />
          </Routes>
        </AuthProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
