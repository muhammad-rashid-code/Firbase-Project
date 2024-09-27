"use client";
type ButtonComponentsType = { btnLabel: string; btnHandler: () => void };
export default function ButtonComponents({
  btnLabel,
  btnHandler,
}: ButtonComponentsType) {
  return (
    <>
      <button onClick={btnHandler}>{btnLabel}</button>
    </>
  );
}
