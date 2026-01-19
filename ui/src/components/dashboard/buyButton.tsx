interface BuyButtonProps {
  buyCornHandler: () => void;
}

const BuyButton = ({ buyCornHandler }: BuyButtonProps) => {
  return (
    <button
      onClick={buyCornHandler}
      className="rounded-md p-2.5 text-white border-amber-700 bg-amber-500 border-2 cursor-pointer hover:cursor-pointer hover:bg-amber-700"
    >
      Buy Corn
    </button>
  );
};

export default BuyButton;
