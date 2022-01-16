import Profile from '../models/profile';
import Group from '../models/group';

const GROUPS = [
  new Group('g1', 3, [
    new Profile(
      'p1',
      'Vitacura',
      [
        require('../../assets/images/profile-1.jpg'),
        require('../../assets/images/profile-2.jpg'),
        require('../../assets/images/profile-3.jpg'),
      ],
      'Fernanda',
      'Vuskasic',
      '22',
      'Universidad de Chile',
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ),
    new Profile(
        'p1',
        'Vitacura',
        [
          require('../../assets/images/profile-1.jpg'),
          require('../../assets/images/profile-2.jpg'),
          require('../../assets/images/profile-3.jpg'),
        ],
        'Fernanda',
        'Vuskasic',
        '22',
        'Universidad de Chile',
        'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      ),
      new Profile(
        'p1',
        'Vitacura',
        [
          require('../../assets/images/profile-1.jpg'),
          require('../../assets/images/profile-2.jpg'),
          require('../../assets/images/profile-3.jpg'),
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