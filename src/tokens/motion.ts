/** Shared motion tokens for SELF SABOTAGE world interactions */
export const MOTION = {
  /** Physical lift / drawer pull */
  lift: { duration: 280, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  /** Paper / envelope opening */
  paper: { duration: 420, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  /** Mirror crack reveal */
  crack: { duration: 480, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
  /** Ambient subtle movement */
  ambient: { duration: 16000, easing: 'ease-in-out' },
  /** Route transition */
  transition: { duration: 380, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
} as const;

/** CSS transition string helpers */
export const transition = {
  lift: `transform ${MOTION.lift.duration}ms ${MOTION.lift.easing}, box-shadow ${MOTION.lift.duration}ms ${MOTION.lift.easing}`,
  paper: `transform ${MOTION.paper.duration}ms ${MOTION.paper.easing}, opacity ${MOTION.paper.duration}ms ${MOTION.paper.easing}`,
  crack: `all ${MOTION.crack.duration}ms ${MOTION.crack.easing}`,
  fast: `all 150ms ease-out`,
} as const;
