import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

type Inputs = {
  name: string;
  phoneNums: string[];
};

export default function Form() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      phoneNums: ["&nbsp;"],
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const { fields, append } = useFieldArray({
    name: "phoneNums",
    control,
  });

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          {...register("name", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Phone Number
        </label>
        {fields.map((field, index) => (
          <input
            key={field.id}
            {...register(`phoneNums.${index}` as const)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        ))}
        <button onClick={() => append("")}>Add</button>
        <input
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        />
      </form>
    </div>
  );
}
