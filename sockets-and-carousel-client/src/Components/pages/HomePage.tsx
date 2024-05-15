export default function HomePage(): JSX.Element {
  return (
    <div className="flex h-full">
      <section className="flex-1 min-w-[500px] h-full border-2 border-green-500">
        Карусель
      </section>
      <section className="min-w-[360px] h-full bg-[#F1F3F5] border-2 border-sky-500">
        <div className="sticky top-0 min-h-[56px] text-xl font-semibold p-4 bg-white">Чат с поддержкой</div>
        <div>Сообщения</div>
      </section>
    </div>
  );
}
