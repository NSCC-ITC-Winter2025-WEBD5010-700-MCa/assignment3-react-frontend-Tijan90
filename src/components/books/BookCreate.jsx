import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import BookForm from './BookForm';

const BookCreate = () => {

    const queryClient = useQueryClient()
    const navigate = useNavigate()



    const createBookMutation = useMutation({
        mutationFn: async (data) => {
            console.log(data)
            const response = await fetch(`http://localhost:3000/books`, {
              method: 'POST',
              headers: {'Content-Type' : 'application/json'},
              body: JSON.stringify(data)
            })
            return response.json()
        },
        onSuccess : () => {
            queryClient.invalidateQueries(['booksData']),
            navigate('/admin/books')
        }
    })

    const processData = (data) => {
        console.log(data)
        createBookMutation.mutate(data)
    }

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Book</h2>
          <BookForm onDataCollected={ processData }  />
        </div>
    )
}

export default BookCreate;