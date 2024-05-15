import Carousel from "../Carousel";

export default function HomePage(): JSX.Element {
  return (
    <div className="flex h-full min-w-[800px]">
      <Carousel />

      <section className="home-chat-container">
        <div className="sticky top-0 min-h-[56px] text-xl font-semibold p-4 bg-white">
          Чат с поддержкой
        </div>
        <div>Сообщения</div>
        <div className="absolute h-12 bottom-0 bg-white w-full">
          Новое сообщение
        </div>
      </section>
    </div>
  );
}
