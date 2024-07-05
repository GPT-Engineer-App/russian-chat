import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Shop = () => {
  const [score, setScore] = useState(0);
  const [cps, setCps] = useState(0);

  const items = [
    { name: "Auto Clicker", cost: 100, effect: 1 },
    { name: "Double Clicks", cost: 500, effect: 2 },
  ];

  useEffect(() => {
    const savedScore = localStorage.getItem("score");
    const savedCps = localStorage.getItem("cps");

    if (savedScore) setScore(parseInt(savedScore, 10));
    if (savedCps) setCps(parseInt(savedCps, 10));
  }, []);

  useEffect(() => {
    localStorage.setItem("score", score);
    localStorage.setItem("cps", cps);
  }, [score, cps]);

  const handlePurchase = (item) => {
    if (score >= item.cost) {
      setScore(score - item.cost);
      setCps(cps + item.effect);
      toast.success(`Purchased ${item.name}!`);
    } else {
      toast.error("Not enough points!");
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl mb-4">Shop</h1>
      <p className="text-xl mb-4">Score: {score}</p>
      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.name} className="border p-4 rounded-lg">
            <h2 className="text-2xl mb-2">{item.name}</h2>
            <p className="mb-2">Cost: {item.cost}</p>
            <p className="mb-4">Effect: +{item.effect} CPS</p>
            <Button onClick={() => handlePurchase(item)}>Purchase</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;