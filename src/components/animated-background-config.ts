export type Section = "hero" | "about" | "skills" | "experience" | "projects" | "contact";

type Vec3 = { x: number; y: number; z: number };

type KeyboardPoseState = {
  scale: Vec3;
  position: Vec3;
  rotation: Vec3;
  /**
   * Solo mobile: la posizione è tarata su uno schermo alto 844 px e il contenuto sotto (titolo,
   * card) parte dall'alto, quindi su schermi più bassi o più alti la tastiera si ancora al bordo
   * superiore invece che al centro dello schermo.
   */
  anchorTop?: boolean;
};

// Altezza dello schermo (mobile) per cui sono tarate le posizioni con `anchorTop`.
const MOBILE_REF_HEIGHT = 844;
// Quanto una unità di y (mondo) sposta la tastiera sullo schermo: la camera guarda a 45° dall'alto.
const Y_TO_SCREEN = Math.SQRT1_2;

export const STATES: Record<Section, { desktop: KeyboardPoseState; mobile: KeyboardPoseState }> = {
  hero: {
    desktop: {
      scale: { x: 0.20, y: 0.20, z: 0.20 },
      position: { x: 225, y: -100, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    mobile: {
      // Nudged down/smaller from the original (0.30, y:-200): the hero grew
      // an availability badge, tagline and location row since this was
      // tuned, and the keyboard sat right on top of the CTA/social row.
      // (Le scale mobile sono quelle a 390 px di larghezza: vedi getScaleOffset.)
      scale: { x: 0.132, y: 0.132, z: 0.132 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
  },
  about: {
    desktop: {
      scale: { x: 0.4, y: 0.4, z: 0.4 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 12,
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.24, y: 0.24, z: 0.24 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 6,
        z: 0,
      },
    },
  },
  experience: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: Math.PI / 12, // Slight tilt forward
        y: -Math.PI / 4, // Rotate opposite to skills
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.18, y: 0.18, z: 0.18 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: Math.PI / 6,
        y: -Math.PI / 6,
        z: 0,
      },
    },
  },
  skills: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      // Più in basso di prima (-40): la punta della tastiera non tocca più la descrizione sotto il titolo.
      position: { x: 0, y: -90, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 12,
        z: 0,
      },
    },
    mobile: {
      // Vista frontale (y = azimut della camera, -30°): la scheda mobile è alta e stretta, così i
      // 5 tasti per riga riempiono la larghezza e i loghi restano dritti e leggibili.
      scale: { x: 0.27, y: 0.27, z: 0.27 },
      position: { x: 0, y: -100, z: 0 },
      rotation: {
        x: 0,
        y: -Math.PI / 6,
        z: 0,
      },
    },
  },
  projects: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
    mobile: {
      scale: { x: 0.18, y: 0.18, z: 0.18 },
      // Sta tra la descrizione e le card dei progetti.
      position: { x: 0, y: 60, z: 0 },
      anchorTop: true,
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
  },
  contact: {
    desktop: {
      scale: { x: 0.2, y: 0.2, z: 0.2 },
      position: { x: 350, y: -250, z: 0 },
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.15, y: 0.15, z: 0.15 },
      position: { x: 0, y: 150, z: 0 },
      anchorTop: true,
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
  },
};

export const getKeyboardState = ({
  section,
  isMobile,
}: {
  section: Section;
  isMobile: boolean;
}) => {
  const baseTransform = STATES[section][isMobile ? "mobile" : "desktop"];

  const getScaleOffset = () => {
    const width = window.innerWidth;
    // Reference widths for "ideal" size
    // Using 1024 for desktop to maintain backward compatibility with previous look
    const DESKTOP_REF_WIDTH = 1280;
    const DESKTOP_REF_HEIGHT = 800;
    const MOBILE_REF_WIDTH = 390;

    // Su desktop conta anche l'altezza (1440x900 resta com'era): su un 1366x768 la tastiera
    // scalata solo sulla larghezza saliva sotto titolo e descrizione.
    const targetScale = isMobile
      ? width / MOBILE_REF_WIDTH
      : Math.min(width / DESKTOP_REF_WIDTH, window.innerHeight / DESKTOP_REF_HEIGHT);

    // Clamp values to prevent extremes. Su mobile le scale di STATES valgono a 390 px
    // e seguono la larghezza (360 px -> 0.92) senza uscire dallo schermo.
    const minScale = isMobile ? 0.8 : 0.5;
    const maxScale = isMobile ? 1.3 : 1.15;

    return Math.min(Math.max(targetScale, minScale), maxScale);
  };

  const scaleOffset = getScaleOffset();

  const { anchorTop, ...transform } = baseTransform;
  const position = anchorTop
    ? {
        ...transform.position,
        y: transform.position.y + (window.innerHeight - MOBILE_REF_HEIGHT) / 2 / Y_TO_SCREEN,
      }
    : transform.position;

  return {
    ...transform,
    position,
    scale: {
      x: Math.abs(baseTransform.scale.x * scaleOffset),
      y: Math.abs(baseTransform.scale.y * scaleOffset),
      z: Math.abs(baseTransform.scale.z * scaleOffset),
    },
  };
};
