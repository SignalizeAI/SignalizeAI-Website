export default function HeaderGlobalStyles() {
  return (
    <style jsx global>{`
      :root {
        --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.1);
        --ease-smooth: cubic-bezier(0.165, 0.84, 0.44, 1);
      }

      @media (min-width: 1024px) {
        .nav-morph {
          transition:
            top 0.5s var(--ease-smooth),
            max-width 0.5s var(--ease-smooth),
            width 0.5s var(--ease-smooth),
            padding 0.5s var(--ease-smooth),
            border-radius 0.5s var(--ease-smooth),
            background-color 0.4s ease,
            backdrop-filter 0.4s ease,
            box-shadow 0.4s ease,
            border 0.4s ease;
        }
      }

      .marker-transition {
        transition:
          left 0.3s var(--ease-spring),
          width 0.3s var(--ease-spring),
          opacity 0.2s ease-out;
      }

      .marker-glow::after {
        content: "";
        position: absolute;
        bottom: -3px;
        left: 18%;
        width: 64%;
        height: 6px;
        background: linear-gradient(90deg, rgba(26, 35, 126, 0.2), rgba(0, 229, 255, 0.2));
        filter: blur(5px);
        opacity: 0.35;
        z-index: -1;
      }
    `}</style>
  );
}
