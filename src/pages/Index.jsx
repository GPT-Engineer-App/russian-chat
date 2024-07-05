import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [score, setScore] = useState(0);
  const [cps, setCps] = useState(0);
  const [autoClickerEnabled, setAutoClickerEnabled] = useState(false);

  useEffect(() => {
    const savedScore = localStorage.getItem("score");
    const savedCps = localStorage.getItem("cps");
    const savedAutoClicker = localStorage.getItem("autoClickerEnabled");

    if (savedScore) setScore(parseInt(savedScore, 10));
    if (savedCps) setCps(parseInt(savedCps, 10));
    if (savedAutoClicker) setAutoClickerEnabled(savedAutoClicker === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("score", score);
    localStorage.setItem("cps", cps);
    localStorage.setItem("autoClickerEnabled", autoClickerEnabled);
  }, [score, cps, autoClickerEnabled]);

  useEffect(() => {
    if (autoClickerEnabled) {
      const interval = setInterval(() => {
        setScore((prevScore) => prevScore + cps);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoClickerEnabled, cps]);

  const handleClick = () => {
    setScore(score + 1);
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl mb-4">Clicker Game</h1>
      <p className="text-xl mb-4">Score: {score}</p>
      <Button onClick={handleClick} className="mb-4">
        Click Me!
      </Button>
      <p className="text-lg">Clicks per second (CPS): {cps}</p>
    </div>
  );
};

export default Index;