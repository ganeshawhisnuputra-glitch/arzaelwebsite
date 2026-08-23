export interface ProfileFrameVariant {
  id: string;
  headline: string;
  subcopy: string;
  frameSrc: string;
  baseFrameSrc: string;
  cutout: {
    cx: number;
    cy: number;
    radius: number;
  };
  exportFilename: string;
  isAvailable: boolean;
}

export const PROFILE_FRAME_VARIANTS: ProfileFrameVariant[] = [
  {
    id: 'working-on-it',
    headline: 'I’M WORKING ON IT.',
    subcopy: 'probably.',
    frameSrc: '/assets/self-sabotage/profile-picture/working-on-it-frame-cutout.png',
    baseFrameSrc: '/assets/self-sabotage/profile-picture/working-on-it-frame.png',
    cutout: {
      cx: 540,
      cy: 478,
      radius: 286,
    },
    exportFilename: 'arzael-self-sabotage-im-working-on-it.png',
    isAvailable: true,
  },
  // Future planned variants for extensible architecture
  {
    id: 'know-better',
    headline: 'I KNOW BETTER.',
    subcopy: 'and yet.',
    frameSrc: '',
    baseFrameSrc: '',
    cutout: { cx: 540, cy: 478, radius: 286 },
    exportFilename: 'arzael-self-sabotage-i-know-better.png',
    isAvailable: false,
  },
  {
    id: 'here-we-go-again',
    headline: 'HERE WE GO AGAIN.',
    subcopy: 'round three.',
    frameSrc: '',
    baseFrameSrc: '',
    cutout: { cx: 540, cy: 478, radius: 286 },
    exportFilename: 'arzael-self-sabotage-here-we-go-again.png',
    isAvailable: false,
  },
  {
    id: 'do-not-text-them',
    headline: 'DO NOT TEXT THEM.',
    subcopy: 'already did.',
    frameSrc: '',
    baseFrameSrc: '',
    cutout: { cx: 540, cy: 478, radius: 286 },
    exportFilename: 'arzael-self-sabotage-do-not-text-them.png',
    isAvailable: false,
  },
  {
    id: 'work-in-progress',
    headline: 'WORK IN PROGRESS.',
    subcopy: 'permanent.',
    frameSrc: '',
    baseFrameSrc: '',
    cutout: { cx: 540, cy: 478, radius: 286 },
    exportFilename: 'arzael-self-sabotage-work-in-progress.png',
    isAvailable: false,
  },
];

export const MASTER_FRAME_VARIANT = PROFILE_FRAME_VARIANTS[0];
