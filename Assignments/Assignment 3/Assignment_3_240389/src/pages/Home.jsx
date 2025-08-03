import Cards from '../components/Cards.jsx'
import Footer from '../components/Footer.jsx'

function Home() {
  const handleFilterMyItems = () => {
    const token = localStorage.getItem("token");
    const email = token ? jwtDecode(token).email : null;
  
    if (email) {
      setFilteredItems(allItems.filter(item => item.user_email === email));
    }
  };

  return (
    <>
      <Cards />
      <Footer />
    </>
  )
}

export default Home;