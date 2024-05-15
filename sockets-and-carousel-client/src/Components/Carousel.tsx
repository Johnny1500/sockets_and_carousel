export default function Carousel(): JSX.Element {
  const slugs = [
    "unsplash_7AcMUSYRZpU.png",
    "unsplash_Cx949d6dIFI.png",
    "unsplash_dC-z4r8tr6U.png",
    "unsplash_DpphPG9ENsI.png",
    "unsplash_mpw37yXc_WQ.png",
    "unsplash_NoRsyXmHGpI.png",
    "unsplash_W5XTTLpk1-I.png",
  ];

  return (
    <section className="home-carousel-container">
      {slugs.map((slug) => (
        <img src={`http://localhost:3000/${slug}`} className="bg-cover" />
      ))}
      <button className="arrow arrow-left">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 10L15 10M5 10L10.303 5M5 10L10.303 15"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button className="arrow arrow-right">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 10L5 10M15 10L9.69697 5M15 10L9.69697 15"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </section>
  );
}
