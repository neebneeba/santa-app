import { FC } from "react";

// Layout
import Layout from "../layout";

// Components
import FormForSanta from "../components/home/form";

const Home: FC = () => {
  return (
    <Layout>
      <div className="container flex h-full">
        <FormForSanta />
      </div>
    </Layout>
  );
};

export default Home;
