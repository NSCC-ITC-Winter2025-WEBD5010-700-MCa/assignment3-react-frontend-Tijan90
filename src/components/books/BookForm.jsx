import { useForm, useFieldArray } from "react-hook-form"
import { useEffect } from "react"

export default function BookForm({ onDataCollected, initialData }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      characters: [{ name: "" }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "characters"
  })

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title)
      setValue("author", initialData.author)
      setValue("published_year", initialData.published_year)
      setValue("genre", initialData.genre)
      setValue("critics", initialData.ratings?.critics)
      setValue("readers", initialData.ratings?.readers)

      if (initialData.characters?.length) {
        setValue("characters", initialData.characters.map(name => ({ name })))
      }
    }
  }, [initialData, setValue])

  const onSubmit = (data) => {
    const formattedData = {
      ...(initialData?._id && { _id: initialData._id }),
      title: data.title,
      author: data.author,
      published_year: parseInt(data.published_year),
      genre: data.genre,
      characters: data.characters.map(c => c.name),
      ratings: {
        critics: parseFloat(data.critics),
        readers: parseFloat(data.readers),
        ...(initialData?.ratings?._id && { _id: initialData.ratings._id })
      }
    }
    console.log(formattedData, 'data')
    onDataCollected(formattedData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register("title", { required: "Title is required!" })}
          type="text"
          placeholder="Title"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <input
          {...register("author", { required: "Author is required!" })}
          type="text"
          placeholder="Author"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
      </div>

      <div>
        <input
          {...register("published_year", {
            required: "Year is required!",
            min: { value: 1700, message: "Year must be greater than 1700" },
          })}
          type="number"
          placeholder="Year"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.published_year && <p className="text-red-500 text-sm mt-1">{errors.published_year.message}</p>}
      </div>

      <div>
        <input
          {...register("genre")}
          type="text"
          placeholder="Genre (Optional)"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <p className="font-semibold mb-1">Characters:</p>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-start mb-2">
            <input
              {...register(`characters.${index}.name`, {
                required: "Character name is required!"
              })}
              placeholder={`Character ${index + 1}`}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {errors.characters && <p className="text-red-500 text-sm mb-1">{errors.characters.message}</p>}

        {errors.characters?.map?.((charError, idx) =>
          charError?.name ? (
            <p key={idx} className="text-red-500 text-sm mb-1">
              {charError.name.message}
            </p>
          ) : null
        )}

        <button
          type="button"
          onClick={() => append({ name: "" })}
          className="text-blue-500 hover:underline"
        >
          + Add Character
        </button>
      </div>

      <div>
        <p className="font-semibold mb-1">Ratings:</p>
        <input
          {...register("critics", { required: "Critics rating is required!" })}
          type="number"
          step="0.1"
          placeholder="Critics Rating"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
        />
        {errors.critics && <p className="text-red-500 text-sm mb-2">{errors.critics.message}</p>}

        <input
          {...register("readers", { required: "Readers rating is required!" })}
          type="number"
          step="0.1"
          placeholder="Readers Rating"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.readers && <p className="text-red-500 text-sm mt-1">{errors.readers.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
      >
        Submit Book
      </button>
    </form>
  )
}
