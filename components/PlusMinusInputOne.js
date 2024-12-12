import { toast } from "react-toastify";
import { useEffect } from "react";

const PlusMinusInputOne = ({
  className,
  quantity,
  maxAmount,
  setQuantity,
  updateCart,
  id,
}) => {
  const onPlus = () => {
    if (quantity < maxAmount) {
      setQuantity(quantity + 1);
      updateCart({
        id: id,
        quantity: quantity + 1,
        type: true,
      });
    }
  };
  const onMinus = () => {
    if (quantity > 1 && quantity <= maxAmount) {
      setQuantity(quantity - 1);
      updateCart({
        id: id,
        quantity: quantity - 1,
        type: true,
      });
    }
  };

  useEffect(() => {
    if (quantity > maxAmount && maxAmount > 0) {
      setQuantity(maxAmount);
      updateCart({
        id: id,
        quantity: maxAmount,
        message: false,
      });
    }
  }, [quantity]);

  return (
    <div className="max-md:h-full">
      <div className="flex w-fit items-center">
        <span
          className="w-fit flex-1 cursor-pointer select-none rounded-[10px] bg-black px-2 py-1 text-[28px] font-extralight leading-[20px] text-white"
          onClick={onMinus}
        >
          -
        </span>
        <input
          maxLength="2"
          type="number"
          value={quantity}
          onChange={(e) => {
            setQuantity(+e.target.value);
            updateCart({
              id: id,
              quantity: +e.target.value,
              type: true,
            });
          }}
          min={1}
          max={maxAmount}
          className="no-spinners mx-auto w-[36px] flex-1 select-none border-none bg-transparent p-0 text-center text-[22px] font-extralight focus:border-none focus:outline-none focus:ring-0"
        ></input>
        <span
          className="w-fit flex-1 cursor-pointer select-none rounded-[10px] bg-black px-2 py-1 text-[28px] font-extralight leading-[20px] text-white"
          onClick={onPlus}
        >
          +{" "}
        </span>
      </div>
    </div>
  );
};

export default PlusMinusInputOne;
