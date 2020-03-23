import Layout from "../src/components/DefaultLayout";
// import Banner from "../src/components/Banner";
import List from "../src/components/General/List";
const queries = require("../db/queries/readings");

function Readings({ readings }) {
  console.log(readings);
  return (
    <Layout>
      HELLO
      {/* <Banner /> */}
      <List list={readings.joined} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;
  const userId = cookie ? Number(cookie.split("=")[1]) : 0;

  const readings = await queries.readings.getUsersReadings(userId);

  return { props: { readings } };
}

export default Readings;
