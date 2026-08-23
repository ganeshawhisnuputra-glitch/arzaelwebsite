import { Era } from '../types/era';
import { Track } from '../types/music';

export const SELF_SABOTAGE_ERA: Era = {
  slug: 'self-sabotage',
  title: 'SELF SABOTAGE',
  subtitle: 'The Current Era',
  years: '2026',
  statement: 'I thought my biggest problems were the things happening to me. Then I started noticing the things I was doing to myself. This record came from there.',
  description: 'Every song catches me doing it differently. Maybe you’ll catch yourself somewhere in here too.',
  isCurrent: true,
  artworkPlaceholderId: 'PLACEHOLDER_ALBUM_ART',
  themeColor: {
    primary: '#147287',
    accent: '#d97e78',
  },
  trackIds: ['track-anesthesia', 'track-sabotage', 'track-disappearing'],
};

export const SELF_SABOTAGE_TRACKS: Track[] = [
  {
    id: 'track-anesthesia',
    title: 'ANESTHESIA',
    artist: 'ARZAEL',
    era: 'SELF SABOTAGE',
    statement: 'For when feeling nothing feels safer than feeling everything.',
    artworkPlaceholderId: 'PLACEHOLDER_TRACK_ANESTHESIA',
    isAvailableForPlayback: false,
  },
  {
    id: 'track-sabotage',
    title: 'SELF SABOTAGE',
    artist: 'ARZAEL',
    era: 'SELF SABOTAGE',
    statement: 'Watching yourself ruin something while knowing exactly what you were doing.',
    artworkPlaceholderId: 'PLACEHOLDER_TRACK_SABOTAGE',
    isAvailableForPlayback: false,
  },
  {
    id: 'track-disappearing',
    title: 'DISAPPEARING',
    artist: 'ARZAEL',
    era: 'SELF SABOTAGE',
    statement: 'Leaving emotionally before anyone gets the chance to leave you.',
    artworkPlaceholderId: 'PLACEHOLDER_ALBUM_ART',
    isAvailableForPlayback: false,
  },
];
