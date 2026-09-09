import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { selectors } from 'data/redux';
import { renderWithIntl } from '../../testUtils';
import { EdlyOraNav, mapStateToProps } from './EdlyOraNav';

jest.mock('data/redux', () => ({
  selectors: {
    app: {
      courseOras: jest.fn((state) => state.courseOras || []),
    },
  },
}));

jest.mock('data/constants/app', () => ({
  locationId: () => 'ora-2',
}));

jest.mock('@edx/frontend-platform', () => ({
  getConfig: () => ({ PUBLIC_PATH: '/ora-grading/' }),
  getPath: (path) => path,
}));

const courseOras = [
  { locationId: 'ora-1', name: 'Peer essay', parentName: 'Week 1' },
  { locationId: 'ora-2', name: 'Self review', parentName: 'Week 2' },
  { locationId: 'ora-3', name: 'Final project', parentName: 'Week 3' },
];

describe('EdlyOraNav component', () => {
  const assign = jest.fn();

  beforeAll(() => {
    delete window.location;
    window.location = { assign };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('visibility', () => {
    it('renders nothing when the course has a single ORA', () => {
      const { container } = renderWithIntl(<EdlyOraNav courseOras={[courseOras[0]]} />);
      expect(container).toBeEmptyDOMElement();
    });

    it('renders nothing when the current ORA is not in the list', () => {
      const { container } = renderWithIntl(<EdlyOraNav courseOras={[
        courseOras[0],
        courseOras[2],
      ]}
      />);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('behavior', () => {
    it('displays the position of the current ORA', () => {
      renderWithIntl(<EdlyOraNav courseOras={courseOras} />);
      expect(screen.getByText('2 of 3')).toBeInTheDocument();
    });

    it('navigates to the previous ORA', async () => {
      const user = userEvent.setup();
      renderWithIntl(<EdlyOraNav courseOras={courseOras} />);
      await user.click(screen.getByRole('button', { name: 'Previous' }));
      expect(assign).toHaveBeenCalledWith('/ora-grading/ora-1');
    });

    it('navigates to the next ORA', async () => {
      const user = userEvent.setup();
      renderWithIntl(<EdlyOraNav courseOras={courseOras} />);
      await user.click(screen.getByRole('button', { name: 'Next' }));
      expect(assign).toHaveBeenCalledWith('/ora-grading/ora-3');
    });

    it('disables the previous button on the first ORA', () => {
      renderWithIntl(<EdlyOraNav courseOras={[courseOras[1], courseOras[2]]} />);
      expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();
    });

    it('disables the next button on the last ORA', () => {
      renderWithIntl(<EdlyOraNav courseOras={[courseOras[0], courseOras[1]]} />);
      expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Previous' })).toBeEnabled();
    });
  });

  describe('mapStateToProps', () => {
    it('maps courseOras from app.courseOras selector', () => {
      const testState = { courseOras };
      expect(mapStateToProps(testState).courseOras).toEqual(selectors.app.courseOras(testState));
    });
  });
});
