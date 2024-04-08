import useGetMeInfo from "../../services/auth/useGetMeInfo";

const HomePage = () => {
    const meInfo = useGetMeInfo();
    console.log("________ Me Info ________")
    return (
        <div className="flex">
        <h1>Home PageXXXXXXXXXXXXXXXXXXXX</h1>
        <h2>{meInfo?.name}</h2>
        </div>
    );
}

export default HomePage;