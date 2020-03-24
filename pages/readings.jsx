import Layout from "../src/components/DefaultLayout";
// import Banner from "../src/components/Banner";
import List from "../src/components/General/List";
import TabPanel from "../src/components/General/TabPanel";
const queries = require("../db/queries/readings");

function Readings({ readings, userId }) {
  const displayData = {
    image: "image_url",
    title: "title",
    secondary: "user_count"
  };

  return (
    <Layout>
      {userId !== 0 ? (
        <TabPanel
          tabs={["Joined", "Not Joined"]}
          lists={[
            { joined: readings.joined },
            { notJoined: readings.notJoined }
          ]}
          displayData={displayData}
        />
      ) : (
        <TabPanel
          tabs={["All"]}
          lists={[readings.notJoined]}
          displayData={displayData}
        />
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;
  const userId = cookie ? Number(cookie.split("=")[1]) : 0;

  const readings = await queries.readings.getUsersReadings(userId);

  return { props: { readings, userId } };
}

export default Readings;
