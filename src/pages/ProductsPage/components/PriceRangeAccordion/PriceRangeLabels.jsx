export default function PriceRangeLabels({ minPrice, maxPrice }) {
  return (
    <div className="flex justify-between text-sm mb-3 [direction:ltr]">
      <span>
       <strong>{minPrice.toLocaleString()}</strong> تومان
      </span>
      <span>
        <strong>{maxPrice.toLocaleString()}</strong> تومان
      </span>
    </div>
  );
}
