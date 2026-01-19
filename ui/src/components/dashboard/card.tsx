interface CardProps {
  label: string;
  value: string | number;
}

const Card = ({ label, value }: CardProps) => {
  return (
    <div className="flex items-center bg-white p-4 gap-5 rounded-lg shadow-md w-full min-h-25">
      <h2 className="flex justify-start text-gray-500 text-xl mx-auto max-w-2/3">
        {label}:
      </h2>
      <p className="text-end text-black text-3xl mx-auto">{value}</p>
    </div>
  );
};

export default Card;
