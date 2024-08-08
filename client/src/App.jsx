import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/common/Layout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

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
