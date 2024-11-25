import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import SignupPage from "./components/SignupPage";
import "./App.css";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import BookDetails from "./components/BookDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import UploadPage from "./components/UploadPage";
import MyProfile from "./components/MyProfile";
import ReviewPage from "./components/ReviewPage";
import SuccessView from "./components/SuccessView";
import NotFound from "./components/NotFound";
import MyBooks from "./components/MyBooks";

function App() {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <BrowserRouter>
        <Routes>
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                {" "}
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/books/:id"
            element={
              <ProtectedRoute>
                <BookDetails />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/upload"
            element={
              <ProtectedRoute>
                {" "}
                <UploadPage />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute>
                {" "}
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/user/review"
            element={
              <ProtectedRoute>
                {" "}
                <ReviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/success"
            element={
              <ProtectedRoute>
                {" "}
                <SuccessView />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/user"
            element={
              <ProtectedRoute>
                {" "}
                <MyBooks />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
