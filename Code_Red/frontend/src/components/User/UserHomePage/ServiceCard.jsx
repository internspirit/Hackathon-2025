const ServiceCard = ({ title, icon: Icon, description, onClick }) => {
    return (
      <div onClick={onClick} className="bg-base-200 shadow-md rounded-xl p-5 w-90 h-60 flex flex-col items-center justify-center text-center 
        transition-all duration-300 hover:shadow-primary/10 cursor-pointer">
        <Icon size={60} className="text-primary" />
        <h3 className="text-lg font-bold mt-2">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">{description}</p>
      </div>
    );
  };
  
export default ServiceCard;
