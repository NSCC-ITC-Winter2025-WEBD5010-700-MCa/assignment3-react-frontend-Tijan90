import { useQuery } from "@tanstack/react-query";
import BooksTable from '../components/books/BooksTable'
import { Outlet, useLocation } from "react-router-dom";
 
const Books = () => {

  const location = useLocation()

  const { isPending, error, data } = useQuery({
    queryKey: ['booksData'],
    queryFn: async () => {
      console.log('Fetching Data')
      const response = await fetch(`${ import.meta.env.VITE_API_URL }`);
      return response.json();
    },
    staleTime: Infinity,
  });
 
  if (error) return "An error has occurred: " + error.message;
  
  return (
    <div>
      <h1 className="text-2xl font-bold">Books</h1>

      { location.pathname == '/admin/books' ? 
          isPending ? ( <p>Loading...</p> ) : ( <BooksTable books={data}></BooksTable> )
        : 
          <Outlet />
      }
 
    </div>
  );
};
 
export default Books;
