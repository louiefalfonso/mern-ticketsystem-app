import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/common/Layout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import TicketsPage from "./pages/TicketsPage";
import ProjectsPage from "./pages/ProjectsPage";
import EmployeesPage from "./pages/EmployeesPage";
import ProjectDetails from "./pages/ProjectDetails";
import TicketDetails from "./pages/TicketDetails";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: import.meta.env.VITE_APOLLO_CLIENT,
  cache,
  fetch,
});

function App() {
  return (
    <>
      <main className="w-full min-h-screen bg-[#f3f4f6] ">
        <ApolloProvider client={client}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="/tickets/:id" element={<TicketDetails/>} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/employees" element={<EmployeesPage />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ApolloProvider>
      </main>
    </>
  );
}

export default App;
