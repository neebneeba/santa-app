import { FC } from "react";
import { AxiosError } from "axios";

// For form validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// // React router dom
import { useNavigate } from "react-router-dom";

// Just for alert, too lazy to write it on my own.
import { Toaster, toast } from "alert";

// Axios
import axiosInstance from "../../api";

const schema = yup
  .object({
    uid: yup.string().uuid().required(),
    request: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const FormForSanta: FC = () => {
  const navigate = useNavigate();

  // Schema-based validation
  // I thought it does not necessary to create any state.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // This function sends user request to santa.
  const onSubmit = (data: FormData) => {
    axiosInstance
      .post<string>("send-request", data)
      .then(() => {
        navigate("/request-sent");
      })
      .catch((e: AxiosError<string>) => {
        if (e.response) {
          toast(e.response.data);
        }

        throw e;
      });
  };

  return (
    <form
      className="flex flex-col justify-between w-full max-w-[500px] m-auto p-10 bg-white rounded shadow-lg h-full max-h-[600px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* This component will display alert when form submitted */}
      <Toaster
        position="top-right"
        options={{
          style: {
            whiteSpace: "pre-line",
          },
        }}
      />

      <div className="flex flex-col space-y-5">
        {/* User id section */}
        <div className="flex flex-col">
          <label htmlFor="userId">User ID</label>
          <input
            id="userId"
            type="text"
            className="border h-10 rounded px-2 outline-none focus:border-black"
            placeholder="Enter your id"
            {...register("uid")}
          />
          <p>{errors.uid?.message}</p>
        </div>

        {/* User request for santa */}
        <div className="flex flex-col">
          <label htmlFor="userRequest">User Request</label>
          <textarea
            id="userRequest"
            className="border rounded p-2 outline-none focus:border-black"
            cols={40}
            {...register("request")}
          />
          <p>{errors.request?.message}</p>
        </div>
      </div>

      {/* Form submittion */}
      <button
        type="submit"
        className="bg-blue-500 font-bold uppercase py-5 rounded text-white"
      >
        Send your wish 🌠
      </button>
    </form>
  );
};

export default FormForSanta;
