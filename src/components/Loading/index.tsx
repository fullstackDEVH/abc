const Loading = () => {
  return (
    <div className="bg-[#0C111D] opacity-80 fixed top-0 left-0 right-0 bottom-0 z-[99999] flex_center">
      <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
    </div>
  );
};

export default Loading;
