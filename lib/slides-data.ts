export interface SlideData {
  id: number;
  type: 'title' | 'content' | 'grid' | 'image' | 'quote';
  title: string;
  subtitle?: string;
  content?: string[];
  image?: string;
  gridItems?: { title: string; text: string }[];
  accentColor?: string;
  tagline?: string;
}

export const slides: SlideData[] = [
  {
    id: 1,
    type: 'title',
    title: 'Lamarckism',
    subtitle: 'The First Theory of Organic Evolution',
    tagline: 'Jean Baptiste Lamarck (1744–1829)',
    accentColor: '#d4a574',
  },
  {
    id: 2,
    type: 'content',
    title: 'Who Was Lamarck?',
    content: [
      'French naturalist who published his theory in "Philosophic Zoologique" (1809).',
      'First scientist to attempt a systematic explanation of evolution.',
      'His theory is popularly known as the "Inheritance of Acquired Characters".',
      'Proposed that complex life forms developed from simpler, earlier ones.',
    ],
    image: '/assets/lamarck_portrait.png',
    accentColor: '#d4a574',
  },
  {
    id: 3,
    type: 'content',
    title: 'The Core Idea',
    subtitle: 'How Evolution Works According to Lamarck',
    content: [
      'Environmental Change: Nature creates new challenges and needs.',
      'New Needs: Organisms adapt their behavior to meet these needs.',
      'Use & Disuse: Body parts used more grow stronger; unused ones shrink.',
      'Inheritance: These acquired changes are passed to the next generation.',
      'Speciation: Over time, these changes accumulate into new species.',
    ],
    accentColor: '#d4a574',
  },
  {
    id: 4,
    type: 'grid',
    title: '4 Main Propositions',
    gridItems: [
      {
        title: 'Internal Urge',
        text: 'Living organisms have an inner drive to increase in size and complexity.',
      },
      {
        title: 'Environmental Effect',
        text: 'Changed environments create new needs, leading to new habits or organs.',
      },
      {
        title: 'Use and Disuse',
        text: 'Constant use strengthens an organ; lack of use causes it to atrophy.',
      },
      {
        title: 'Inheritance',
        text: 'Acquired characters developed during life are passed to offspring.',
      },
    ],
    accentColor: '#d4a574',
  },
  {
    id: 5,
    type: 'image',
    title: 'Use: The Giraffe\'s Neck',
    subtitle: 'A Classic Example of "Use"',
    image: '/assets/giraffe_evolution.png',
    content: [
      'Ancestors stretched their necks to reach higher leaves.',
      'Each generation stretched more, and the trait was inherited.',
      'Eventually, this led to the modern long-necked giraffe.',
    ],
    accentColor: '#d4a574',
  },
  {
    id: 6,
    type: 'image',
    title: 'Disuse: The Snake\'s Limbs',
    subtitle: 'A Classic Example of "Disuse"',
    image: '/assets/snake_limb_loss.png',
    content: [
      'Ancestors of snakes originally had four limbs.',
      'Adapting to burrowing, they stopped using their limbs.',
      'Limbs gradually shrunk and eventually disappeared entirely.',
    ],
    accentColor: '#d4a574',
  },
  {
    id: 7,
    type: 'content',
    title: 'Criticism of Lamarckism',
    subtitle: 'August Weismann\'s Disproof (1890)',
    content: [
      'Weismann cut the tails of white mice for over 20 generations.',
      'Offspring were always born with normal-length tails.',
      'Proved that somatic changes (body cells) are NOT inherited.',
      'Only changes in germplasm (sex cells) are passed down.',
    ],
    image: '/assets/weismann_experiment.png',
    accentColor: '#e86b5f',
  },
  {
    id: 8,
    type: 'grid',
    title: 'Further Criticisms',
    gridItems: [
      {
        title: 'Size Reduction',
        text: 'Evolution sometimes shows smaller size, contradicting the "internal urge" to grow.',
      },
      {
        title: 'Desire != Reality',
        text: 'Humans have desired to fly for ages but haven\'t grown wings.',
      },
      {
        title: 'Usage Paradox',
        text: 'People who read a lot often get weaker eyesight, not stronger.',
      },
      {
        title: 'Somatoplasm',
        text: 'Injuries or muscle gain during life are never passed to babies.',
      },
    ],
    accentColor: '#e86b5f',
  },
  {
    id: 9,
    type: 'content',
    title: 'Neo-Lamarckism',
    subtitle: 'The Modified Version',
    content: [
      'Revised by Cope, Spencer, Packard, and Kammerer.',
      'Dropped "internal urge" and "use/disuse" concepts.',
      'Focused on direct effect of environment on somatic cells.',
      'Argued that somatic changes CAN be inherited if they reach germ cells.',
    ],
    accentColor: '#5bc8af',
  },
  {
    id: 10,
    type: 'quote',
    title: 'Kammerer\'s Proof',
    subtitle: 'The Cave Amphibian Experiment',
    image: '/assets/proteus_anguineus.png',
    content: [
      'Proteus anguineus (colorless cave salamander) was brought to daylight.',
      'It developed black skin and normal eyes.',
      'These changes were inherited by its offspring.',
      'Summary: Lamarckism laid the foundation for evolutionary biology.',
    ],
    accentColor: '#5bc8af',
  },
];
