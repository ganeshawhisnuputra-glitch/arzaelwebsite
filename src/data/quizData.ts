import { QuizQuestion, QuizResult } from '../types/quiz';

export const QUIZ_METADATA = {
  title: 'HOW DO YOU SELF SABOTAGE?',
  subtitle: 'I made this because apparently therapy is expensive.',
  disclaimer: 'Answer honestly. Nobody is watching. Probably.',
  startCta: 'START REFLECTION',
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'When something in your life starts going suspiciously well, what is your first instinct?',
    note: 'First reaction only. No intellectualizing.',
    options: [
      {
        id: '1a',
        label: 'Disappear before anything goes wrong',
        subtext: 'Leave emotionally first so nobody can leave you.',
        patternKey: 'DISAPPEARING',
      },
      {
        id: '1b',
        label: 'Pick a fight or cause a sudden fracture',
        subtext: 'If it’s going to break, you want to be the one who broke it.',
        patternKey: 'PROVOCATION',
      },
      {
        id: '1c',
        label: 'Hyper-analyze every word until the joy is dead',
        subtext: 'Scanning the exits and counting imaginary knives.',
        patternKey: 'CONTROL',
      },
      {
        id: '1d',
        label: 'Freeze completely and pretend you don’t care',
        subtext: 'Numb is safe. Feeling nothing is easier.',
        patternKey: 'ANESTHESIA',
      },
    ],
  },
  {
    id: 2,
    question: 'How do you handle being noticed or complimented?',
    options: [
      {
        id: '2a',
        label: 'I change the subject or deflect with a joke',
        subtext: 'Puncture the sincerity immediately.',
        patternKey: 'PROVOCATION',
      },
      {
        id: '2b',
        label: 'I become suspicious of what they want from me',
        subtext: 'Nobody is nice without an angle.',
        patternKey: 'CONTROL',
      },
      {
        id: '2c',
        label: 'I feel deeply uncomfortable and physically withdraw',
        subtext: 'Vanishing is the safest defense.',
        patternKey: 'DISAPPEARING',
      },
      {
        id: '2d',
        label: 'I smile blankly and feel completely disconnected inside',
        subtext: 'The glass pane between me and the room.',
        patternKey: 'ANESTHESIA',
      },
    ],
  },
];

export const QUIZ_RESULTS: Record<string, QuizResult> = {
  DISAPPEARING: {
    patternKey: 'DISAPPEARING',
    patternTitle: 'DISAPPEARING',
    tagline: 'You leave emotionally before anyone gets the chance to leave you.',
    observation: 'You call it independence. Sometimes it’s just fear wearing better clothes. I know the feeling.',
    songTitle: 'DISAPPEARING',
    songId: 'track-disappearing',
    actionText: 'LISTEN TO THE SOUNDTRACK',
  },
  ANESTHESIA: {
    patternKey: 'ANESTHESIA',
    patternTitle: 'ANESTHESIA',
    tagline: 'For when feeling nothing feels safer than feeling everything.',
    observation: 'You shut off the valves because you thought feeling less would hurt less. Now you’re just cold. I wrote this for you.',
    songTitle: 'ANESTHESIA',
    songId: 'track-anesthesia',
    actionText: 'LISTEN TO ANESTHESIA',
  },
  CONTROL: {
    patternKey: 'CONTROL',
    patternTitle: 'HYPER-VIGILANCE',
    tagline: 'Reading every room until you invent the hostility yourself.',
    observation: 'You spend so much energy anticipating the collision that you steer straight into the guardrail.',
    songTitle: 'HYPER-VIGILANT',
    songId: 'track-ego-death',
    actionText: 'LISTEN TO HYPER-VIGILANT',
  },
  PROVOCATION: {
    patternKey: 'PROVOCATION',
    patternTitle: 'SELF SABOTAGE',
    tagline: 'Watching yourself ruin it while knowing exactly what you’re doing.',
    observation: 'Better to break the glass house yourself than wait in silence for someone else to throw the stone.',
    songTitle: 'SELF SABOTAGE',
    songId: 'track-sabotage',
    actionText: 'LISTEN TO SELF SABOTAGE',
  },
};
