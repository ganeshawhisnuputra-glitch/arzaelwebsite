export interface CommunityDestination {
  id: string;
  label?: string;
  title: string;
  copy: string[];
  cta: string;
  url: string;
  analyticsEvent: 'arzael_meme_pack_clicked' | 'house_of_zaelion_whatsapp_clicked' | 'house_of_zaelion_instagram_clicked';
}

export const MEME_PACK_DESTINATION: CommunityDestination = {
  id: 'meme-pack',
  title: 'ARZAEL MEME PACK',
  copy: [
    'Bad decisions deserve better reaction images.',
    'Take these. Use them irresponsibly.',
  ],
  cta: 'TAKE THE MEMES',
  url: 'https://whatsapp.com/channel/0029VbDDRbVAYlUJFTdpbt0e',
  analyticsEvent: 'arzael_meme_pack_clicked',
};

export const HOUSE_OF_ZAELION_DESTINATIONS: {
  whatsapp: CommunityDestination;
  instagram: CommunityDestination;
} = {
  whatsapp: {
    id: 'hoz-whatsapp',
    label: 'THE QUIETER ROOM',
    title: 'HOUSE OF ZAELION — WHATSAPP',
    copy: [
      'First looks. Voice notes. Unfinished thoughts.',
      'Things that don’t belong anywhere else.',
    ],
    cta: 'ENTER THE HOUSE',
    url: 'https://whatsapp.com/channel/0029VbD8NKK96H4Qk6zjml2n',
    analyticsEvent: 'house_of_zaelion_whatsapp_clicked',
  },
  instagram: {
    id: 'hoz-instagram',
    label: 'THE LOUDER HALLWAY',
    title: 'HOUSE OF ZAELION — INSTAGRAM',
    copy: [
      'Updates, replies, shared evidence—and whatever we’re collectively pretending is normal.',
    ],
    cta: 'FIND THE OTHERS',
    url: 'https://www.instagram.com/channel/AbZgkI631L4FVv90/',
    analyticsEvent: 'house_of_zaelion_instagram_clicked',
  },
};
