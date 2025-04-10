import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import BookForm from './BookForm';

function BookEdit(){

    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {data} = useQuery({
        queryKey: ['books', id],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/books/${id}`);
            return response.json()
        }
    })

    const editBookMutation = useMutation({
      mutationFn: async (data) => {
        const response = await fetch(`http://localhost:3000/books/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })

        return response.json()
      },
      onSuccess : () => {
          queryClient.invalidateQueries(['booksData']),
          navigate('/admin/books')
      },
    })

    useEffect(() => {
        console.log(data)
        
    }, [data])


    const processData = (data) => {
      editBookMutation.mutate(data)
    }

    return (
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Book - Id: {data?._id}</h2>
      <BookForm onDataCollected={ processData } initialData={ data } />
    </div>
    )
}

export default BookEdit;