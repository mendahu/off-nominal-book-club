import Layout from "../src/components/LandingLayout";
import HeroImage from "../src/components/HomePage/HeroImage";
import CommunityList from "../src/components/HomePage/CommunityList";
import CommunitySearchBar from "../src/components/HomePage/CommunitySearchBar";
import { Box, Container } from '@material-ui/core'

const dates = [
  new Date('2020', '02', '11'),
  new Date('2020', '01', '18'),
  new Date('2019', '11', '02'),
  new Date('2019', '10', '11'),
  new Date('2019', '09', '13'),
  new Date('2020', '01', '06'),
]

const mockCommunityData = [
  {
    name: "Books from Space!",
    desc: "A community for lovers of space. Rockets, planets, science, technology and more!",
    url: "/community",
    img_url: "https://www.spacestationexplorers.org/wp-content/uploads/2018/06/KateRubins-RosieRevere-screengrab-square.jpg",
    members: 11,
    books: 120,
    created_at: dates[0]
  },
  {
    name: "Books for Cooks!",
    desc: "Learn to cook and become a home chef by using our recommdations!",
    url: "/community",
    img_url: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2014/5/1/0/original_Marian-Parsons-handmade-cookbook-stand-beauty-horiz2.jpg.rend.hgtvcom.1280.960.suffix/1400989965441.jpeg",
    members: 19,
    books: 166,
    created_at: dates[1]
  },
  {
    name: "Account on Us!",
    desc: "There's more to accounting than numbers and meetings! Peruse our ledger of incredible recommends!",
    url: "/community",
    img_url: "https://cdn.merchantmaverick.com/wp-content/uploads/2016/08/bigstock-ACCOUNTING-inscription-coming-324977827.jpg",
    members: 3,
    books: 19,
    created_at: dates[2]
  },
  {
    name: "Don't over React",
    desc: "React has changed the way we build web applications, and we can't stop reading about it!",
    url: "/community",
    img_url: "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
    members: 35,
    books: 56,
    created_at: dates[3]
  },
  {
    name: "Crime Time",
    desc: "It's tough to find good reading on how to do crime. We've done the hard work for you, so you can get to crime.",
    url: "/community",
    img_url: "https://harvardmagazine.com/sites/default/files/styles/4x3_main/public/img/article/0817/SO17_CJ_bars_0.jpg?itok=3J_N-LMq",
    members: 13,
    books: 666,
    created_at: dates[4]
  },
  {
    name: "Gradient Gang",
    desc: "The humble gradient is a staple of the design world, and we want to explore every last pixel.",
    url: "/community",
    img_url: "https://img.freepik.com/free-vector/abstract-blurred-gradient-background_97886-2814.jpg?size=338&ext=jpg",
    members: 11,
    books: 1,
    created_at: dates[5]
  },
]

const Home = () => (
  <Layout>
    <HeroImage />
    
    <Container component="main" maxWidth={false}>
      <CommunitySearchBar />
      <CommunityList commData={mockCommunityData}/>
    </Container>
  </Layout>
);

export default Home;
