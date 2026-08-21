export function TechList({ items }: { items: string[] }) {
  return (
    <p className="text-sm text-zinc-400">
      {items.map((item, index) => (
        <span key={item}>
          {index > 0 && ", "}
          {item}
        </span>
      ))}
    </p>
  );
}
