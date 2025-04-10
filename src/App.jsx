import AdminLayout from "./components/layouts/AdminLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

const App = () => {
  return (
  <QueryClientProvider client = {queryClient}>
    <AdminLayout />
  </QueryClientProvider>
  );
};

export default App
