export const ButtonIconText = ({ iconImage, testDisplay, onClick }) => {
  return (
    <button
      className="flex p-2 text-application-color border border-application-color hover:bg-hover-color hover:border-hover-color hover:text-white active:bg-application-color font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      onClick={onClick}
    >
      <div className="my-auto">{iconImage}</div>
      <div className="ml-2">{testDisplay}</div>
    </button>
  );
};
