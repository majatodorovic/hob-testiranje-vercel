import { useEffect } from "react";

const PlusMinusInputTwo = ({ className, amount, setCount, max }) => {
  // If minus is clicked
  const onMinusHandler = (e) => {
    e.preventDefault();
    if (amount !== 1) setCount((prev) => prev - 1);
    if (amount === "") setCount(1);
  };

  // If plus is clicked
  const onPlusHandler = (e) => {
    e.preventDefault();
    if (amount === "") setCount(1);
    else setCount((prev) => prev + 1);
  };

  // If value is typed in
  const onInputChange = (e) => {
    if (!isNaN(e.target.value)) {
      if (+e.target.value < 1) setCount("");
      else setCount(+e.target.value);
    }
  };

  useEffect(() => {
    if (amount > max) setCount(max);
    if (amount < 0) setCount(1);
  }, [amount]);

  return (
    <div className="rounded-[32px] bg-[#fff3e7] py-1 pl-3 pr-1">
      <div className="flex items-center">
        <input
          max={max ?? 99}
          maxLength="2"
          type="number"
          value={amount}
          readOnly
          onChange={onInputChange}
          className="w-[4.6rem] select-none rounded-full border-none bg-[#fff3e7] text-[30px] font-bold font-extralight focus:border-none focus:outline-none focus:ring-0 md:h-7"
        ></input>
        <div className="flex w-[60px] flex-col items-center justify-center rounded-full bg-black py-1 text-white">
          <span
            className="mb-1 cursor-pointer select-none text-[30px] font-thin leading-[21px]"
            onClick={onPlusHandler}
          >
            +
          </span>
          <span
            className="cursor-pointer select-none text-[30px] font-thin leading-[21px]"
            onClick={onMinusHandler}
          >
            -
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlusMinusInputTwo;
