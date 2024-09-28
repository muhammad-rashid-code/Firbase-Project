"use client";
type ButtonComponentsType = { btnLabel: string; btnHandler: () => void };
export default function ButtonComponents({
  btnLabel,
  btnHandler,
}: ButtonComponentsType) {
  return (
    <>
      <button
        onClick={btnHandler}
        style={{
          padding: "7px 10px",
          backgroundColor: "#4267B2",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          fontWeight: "bolder",
          color: "white",
          transition: "background-color 0.3s",
          cursor: "pointer",
        }}
      >
        {btnLabel}
      </button>
    </>
  );
}
