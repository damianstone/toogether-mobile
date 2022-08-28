import Profile from '../models/profile';
import Group from '../models/group';

const GROUPS = [
  new Group('g1', 3, [
    new Profile(
      'p1',
      'Vitacura',
      [
        require('../assets/images/Profiles/profile-6.jpeg'),
        require('../assets/images/Profiles/profile-2.jpeg'),
        require('../assets/images/Profiles/profile-3.jpeg'),
      ],
      'Fernanda',
      'Vuskasic',
      '22',
      'Universidad de Chile',
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ),
    new Profile(
      'p2',
      'Vitacura',
      [
        require('../assets/images/Profiles/profile-7.jpeg'),
        require('../assets/images/Profiles/profile-2.jpeg'),
        require('../assets/images/Profiles/profile-3.jpeg'),
      ],
      'Francisca',
      'Silva',
      '22',
      'Universidad de Chile',
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ),
    new Profile(
      'p3',
      'Vitacura',
      [
        require('../assets/images/Profiles/profile-8.jpeg'),
        require('../assets/images/Profiles/profile-2.jpeg'),
        require('../assets/images/Profiles/profile-3.jpeg'),
      ],
      'Emilia',
      'Sanchez',
      '22',
      'Universidad de Chile',
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ),
  ]),
  new Group('g2', 3, [
    new Profile(
      'p4',
      'Vitacura',
      [
        require('../assets/images/Profiles/profile-3.jpeg'),
        require('../assets/images/Profiles/profile-2.jpeg'),
        require('../assets/images/Profiles/profile-6.jpeg'),
      ],
      'Fernanda',
      'Vuskasic',
      '22',
      'Universidad de Chile',
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ),
    new Profile(
      'p5',
      'Vitacura',
      [
        require('../assets/images/Profiles/profile-2.jpeg'),
        require('../assets/images/Profiles/profile-7.jpeg'),
        require('../assets/images/Profiles/profile-3.jpeg'),
      ],
      'Francisca',
      'Silva',
      '22',
      'Universidad de Chile',
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ),
    new Profile(
      'p6',
      'Vitacura',
      [
        require('../assets/images/Profiles/profile-9.jpg'),
        require('../assets/images/Profiles/profile-2.jpeg'),
        require('../assets/images/Profiles/profile-3.jpeg'),
      ],
      'Emilia',
      'Sanchez',
      '22',
      'Universidad de Chile',
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ),
  ]),
  new Group('g3', 1, [
    new Profile(
      'p4',
      'Vitacura',
      [
        require('../assets/images/Profiles/profile-3.jpeg'),
        require('../assets/images/Profiles/profile-2.jpeg'),
        require('../assets/images/Profiles/profile-6.jpeg'),
      ],
      'Fernanda',
      'Vuskasic',
      '22',
      'Universidad de Chile',
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ),
  ]),
];

export default GROUPS;
