const Footer = () => {
  return (
    <div className="shadow-lg py-4 bg-slate-500 text-white px-12 mt-80 bottom-0 w-full">
      <div className="mx-auto max-w-7xl flex justify-between">
        <div></div>
        <div>
          <h1 className="text-center text-lg ">
            Copyright &#169; {new Date().getFullYear()} | Aditya
          </h1>
        </div>
        <div className="flex items-center gap-4"></div>
      </div>
    </div>
  );
};

export default Footer;
