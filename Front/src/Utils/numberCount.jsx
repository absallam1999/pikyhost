import { useEffect, useState } from 'react';

export default function NumberCounter({ target, duration = 2000, decimals = 0 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = null;

    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const current = parseFloat((target * progress).toFixed(decimals));
      setCount(current);
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [target, duration, decimals]);

  return <span>{count}</span>;
}