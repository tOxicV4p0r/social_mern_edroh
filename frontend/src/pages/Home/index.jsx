import Nav from "pages/Nav";
import Widgets from "pages/Widgets";

const Home = ({ user }) => {
    return (
        <>
            <Nav />
            <Widgets userId={user._id} picturePath={user.picturePath} />
        </>
    )
}

export default Home;