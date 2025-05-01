// import { Routes, Route } from "react-router-dom";
// import TaskDashboard from "./pages/TaskDashboard";
// import AnalyticsDashboard from "./pages/AnalyticsDashboard";
// import ManageMetadata from "./pages/ManageMetadata";
// import Layout from "./components/Shared/Layout";

// function App() {
//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           <Layout>
//             <TaskDashboard />
//           </Layout>
//         }
//       />
//       <Route
//         path="/analytics"
//         element={
//           <Layout>
//             <AnalyticsDashboard />
//           </Layout>
//         }
//       />
//       <Route
//         path="/manage"
//         element={
//           <Layout>
//             <ManageMetadata />
//           </Layout>
//         }
//       />
//     </Routes>
//   );
// }

// export default App;



import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthForm from "./components/AuthForm"; // adjust path if needed
import Layout from "./components/Shared/Layout";
import { auth } from "./firebase/config"; // adjust path if needed
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import ManageMetadata from "./pages/ManageMetadata";
import TaskDashboard from "./pages/TaskDashboard";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/auth" element={<AuthForm />} />

      <Route
        path="/"
        element={
          user ? (
            <Layout>
              <TaskDashboard />
            </Layout>
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
      <Route
        path="/analytics"
        element={
          user ? (
            <Layout>
              <AnalyticsDashboard />
            </Layout>
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
      <Route
        path="/manage"
        element={
          user ? (
            <Layout>
              <ManageMetadata />
            </Layout>
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
