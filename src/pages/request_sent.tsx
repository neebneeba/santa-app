import { FC } from "react";

// React router dom
import { useNavigate } from "react-router-dom";

// Layout
import Layout from "../layout";

const RequestSent: FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex h-full">
        <div className="flex flex-col space-y-5 m-auto">
          <div className="m-auto text-white text-4xl font-bold">
            Dear child your request has been sent 😇
          </div>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="border py-5 rounded text-white hover:bg-white hover:text-black transition"
          >
            Back to form
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default RequestSent;
