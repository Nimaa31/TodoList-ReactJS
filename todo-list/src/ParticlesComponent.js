import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesComponent = (props) => {
  const [initDone, setInitDone] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInitDone(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(() => ({
    background: {
      color: {
        value: "#6441a5",
      },
    },
    fpsLimit: 160,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "repulse",
        },
        onHover: {
          enable: true,
          mode: "grab",
        },
      },
      modes: {
        push: {
          distance: 200,
          duration: 15,
        },
        grab: {
          distance: 150,
        },
      },
    },
    particles: {
      color: {
        value: "#30D5C8",
      },
      links: {
        color: "#FEF250",
        distance: 200,
        enable: true,
        opacity: 0.3,
        width: 1.5,
      },
      move: {
        direction: "circle",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 3 ,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 300,
      },
      opacity: {
        value: 1.0,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 0.5, max: 5 },
      },
    },
    detectRetina: true,
  }), []);

  return initDone ? <Particles id={props.id} options={options} loaded={particlesLoaded} /> : null;
};

export default ParticlesComponent;
