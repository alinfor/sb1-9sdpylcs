export interface Participant {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  present: boolean;
}

export interface Session {
  id: string;
  title: string;
  type: string;
  date: string;
  lieu: string;
  formateur: string;
  participants: Participant[];
}

const mockSessions: Session[] = [
  {
    id: '1',
    title: 'Initiation au développement React Native',
    type: 'Technique',
    date: '12 Juin 2025 • 09:00 - 17:00',
    lieu: 'Salle Neuilly - Paris',
    formateur: 'Jean Dupont',
    participants: [
      {
        id: '101',
        nom: 'Martin',
        prenom: 'Sophie',
        email: 'sophie.martin@example.com',
        present: true,
      },
      {
        id: '102',
        nom: 'Bernard',
        prenom: 'Thomas',
        email: 'thomas.bernard@example.com',
        present: false,
      },
      {
        id: '103',
        nom: 'Petit',
        prenom: 'Marie',
        email: 'marie.petit@example.com',
        present: true,
      },
      {
        id: '104',
        nom: 'Leroy',
        prenom: 'Paul',
        email: 'paul.leroy@example.com',
        present: false,
      },
      {
        id: '105',
        nom: 'Moreau',
        prenom: 'Julie',
        email: 'julie.moreau@example.com',
        present: true,
      },
    ],
  },
  {
    id: '2',
    title: 'Gestion de projet Agile',
    type: 'Management',
    date: '20 Juin 2025 • 10:00 - 16:00',
    lieu: 'Campus Technologique - Lyon',
    formateur: 'Émilie Laurent',
    participants: [
      {
        id: '201',
        nom: 'Dubois',
        prenom: 'Alexandre',
        email: 'alexandre.dubois@example.com',
        present: false,
      },
      {
        id: '202',
        nom: 'Lefebvre',
        prenom: 'Camille',
        email: 'camille.lefebvre@example.com',
        present: false,
      },
      {
        id: '203',
        nom: 'Richard',
        prenom: 'Maxime',
        email: 'maxime.richard@example.com',
        present: false,
      },
    ],
  },
  {
    id: '3',
    title: 'Cybersécurité pour Développeurs',
    type: 'Technique',
    date: '5 Juillet 2025 • 09:30 - 17:30',
    lieu: 'Centre Digital - Bordeaux',
    formateur: 'Lucas Mercier',
    participants: [
      {
        id: '301',
        nom: 'Simon',
        prenom: 'Clara',
        email: 'clara.simon@example.com',
        present: false,
      },
      {
        id: '302',
        nom: 'Laurent',
        prenom: 'Nicolas',
        email: 'nicolas.laurent@example.com',
        present: false,
      },
      {
        id: '303',
        nom: 'Michel',
        prenom: 'Emma',
        email: 'emma.michel@example.com',
        present: false,
      },
      {
        id: '304',
        nom: 'Lefevre',
        prenom: 'Hugo',
        email: 'hugo.lefevre@example.com',
        present: false,
      },
    ],
  },
  {
    id: '4',
    title: 'Design UI/UX pour applications mobiles',
    type: 'Design',
    date: '15 Juillet 2025 • 09:00 - 17:00',
    lieu: 'Studio Créatif - Marseille',
    formateur: 'Sarah Dupuis',
    participants: [
      {
        id: '401',
        nom: 'Lambert',
        prenom: 'Léa',
        email: 'lea.lambert@example.com',
        present: false,
      },
      {
        id: '402',
        nom: 'Bonnet',
        prenom: 'Antoine',
        email: 'antoine.bonnet@example.com',
        present: false,
      },
      {
        id: '403',
        nom: 'Girard',
        prenom: 'Manon',
        email: 'manon.girard@example.com',
        present: false,
      },
      {
        id: '404',
        nom: 'Fontaine',
        prenom: 'Julien',
        email: 'julien.fontaine@example.com',
        present: false,
      },
      {
        id: '405',
        nom: 'Rousseau',
        prenom: 'Chloé',
        email: 'chloe.rousseau@example.com',
        present: false,
      },
      {
        id: '406',
        nom: 'Mercier',
        prenom: 'Victor',
        email: 'victor.mercier@example.com',
        present: false,
      },
    ],
  },
  {
    id: '5',
    title: 'Intelligence Artificielle pour non-spécialistes',
    type: 'Innovation',
    date: '22 Juillet 2025 • 14:00 - 18:00',
    lieu: 'Lab Innovation - Toulouse',
    formateur: 'Marc Roussel',
    participants: [
      {
        id: '501',
        nom: 'Vincent',
        prenom: 'Aurélie',
        email: 'aurelie.vincent@example.com',
        present: false,
      },
      {
        id: '502',
        nom: 'Fournier',
        prenom: 'Baptiste',
        email: 'baptiste.fournier@example.com',
        present: false,
      },
      {
        id: '503',
        nom: 'Morel',
        prenom: 'Anaïs',
        email: 'anais.morel@example.com',
        present: false,
      },
    ],
  },
];

export function getSessions(): Session[] {
  return mockSessions;
}

export function getSessionById(id: string | string[]): Session | undefined {
  const sessionId = Array.isArray(id) ? id[0] : id;
  return mockSessions.find(session => session.id === sessionId);
}

export function updateParticipantAttendance(
  sessionId: string,
  participantId: string,
  isPresent: boolean
): Session[] {
  return mockSessions.map(session => {
    if (session.id === sessionId) {
      return {
        ...session,
        participants: session.participants.map(participant => {
          if (participant.id === participantId) {
            return { ...participant, present: isPresent };
          }
          return participant;
        }),
      };
    }
    return session;
  });
}