import { useState } from "react";

export default function App() {
  return (
    <div>
      <BillCalculator />
    </div>
  );
}

function BillCalculator() {
  const [bill, setBill] = useState("");
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);

  const tip = bill * ((p1 + p2) / 2 / 100);

  function handleReset() {
    setBill("");
    setP1(0);
    setP2(0);
  }

  return (
    <div>
      <Bill bill={bill} onSetBill={setBill} />
      <Tip percentage={p1} onSelect={setP1}>
        <span>How did you like the service?</span>
      </Tip>
      <Tip percentage={p2} onSelect={setP2}>
        <span>How did your friend like the service?</span>
      </Tip>

      {bill > 0 && (
        <>
          <Result bill={bill} tip={tip} />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}

function Bill({ bill, onSetBill }) {
  return (
    <div>
      <span>How much was the bill?</span>
      <input
        type="text"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </div>
  );
}

function Tip({ children, percentage, onSelect }) {
  return (
    <div>
      {children}
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Result({ bill, tip }) {
  return (
    <h2>
      You pay ${bill + tip} (${bill} + ${tip} tip)
    </h2>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
