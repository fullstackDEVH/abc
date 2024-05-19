import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigation = useNavigate();
  return (
    <div className="w-screen h-screen flex_center flex-col gap-5">
      <h4 className="text-3xl text-[#0E2259] font-semibold">
        Can't find this page ...{" "}
      </h4>
      <h6>Press the button to return to the home page.</h6>
      <Button
        type="primary"
        size="large"
        onClick={() => navigation("/")}
        className="font-medium"
      >
        Home Page
      </Button>
    </div>
  );
};

export default NotFoundPage;
