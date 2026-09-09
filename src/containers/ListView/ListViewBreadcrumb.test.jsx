import { screen } from '@testing-library/react';
import { selectors } from 'data/redux';
import { renderWithIntl } from '../../testUtils';
import {
  ListViewBreadcrumb,
  mapStateToProps,
} from './ListViewBreadcrumb';

jest.mock('data/redux', () => ({
  selectors: {
    app: {
      courseId: jest.fn((state) => state.courseId || 'test-course-id'),
      oraParentName: jest.fn((state) => state.oraParentName || 'test-ora-parent-name'),
      ora: {
        name: jest.fn((state) => state.oraName || 'test-ora-name'),
      },
    },
  },
}));

// connected child, exercised in EdlyOraNav.test.jsx
jest.mock('./EdlyOraNav', () => () => null);

jest.mock('data/services/lms/urls', () => ({
  openResponse: (courseId) => `openResponseUrl(${courseId})`,
  ora: (courseId, locationId) => `oraUrl(${courseId}, ${locationId})`,
}));

jest.mock('data/constants/app', () => ({
  locationId: () => 'test-location-id',
}));

describe('ListViewBreadcrumb component', () => {
  const props = {
    courseId: 'test-course-id',
    oraName: 'fake-ora-name',
    oraParentName: 'fake-unit-name',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('behavior', () => {
    it('renders back to responses link with correct destination', () => {
      renderWithIntl(<ListViewBreadcrumb {...props} />);
      const backLink = screen.getAllByRole('link').find(
        link => link.getAttribute('href') === `openResponseUrl(${props.courseId})`,
      );
      expect(backLink).toBeInTheDocument();
    });

    it('displays ORA name in heading', () => {
      renderWithIntl(<ListViewBreadcrumb {...props} />);
      const heading = screen.getByText(props.oraName);
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass('h3');
    });

    it('renders ORA link with correct destination', () => {
      renderWithIntl(<ListViewBreadcrumb {...props} />);
      const oraLink = screen.getAllByRole('link').find(
        link => link.getAttribute('href') === `oraUrl(${props.courseId}, test-location-id)`,
      );
      expect(oraLink).toBeInTheDocument();
    });

    it('displays the parent unit name above the ORA name', () => {
      renderWithIntl(<ListViewBreadcrumb {...props} />);
      expect(screen.getByText(props.oraParentName)).toBeInTheDocument();
    });

    it('omits the parent unit name when it is not available', () => {
      renderWithIntl(<ListViewBreadcrumb {...props} oraParentName="" />);
      expect(screen.queryByText(props.oraParentName)).not.toBeInTheDocument();
    });

    it('displays back to responses text', () => {
      renderWithIntl(<ListViewBreadcrumb {...props} />);
      expect(screen.getByText('Back to all open responses')).toBeInTheDocument();
    });
  });

  describe('mapStateToProps', () => {
    const testState = { some: 'test-state' };

    it('maps courseId from app.courseId selector', () => {
      const mapped = mapStateToProps(testState);
      expect(mapped.courseId).toEqual(selectors.app.courseId(testState));
    });

    it('maps oraName from app.ora.name selector', () => {
      const mapped = mapStateToProps(testState);
      expect(mapped.oraName).toEqual(selectors.app.ora.name(testState));
    });

    it('maps oraParentName from app.oraParentName selector', () => {
      const mapped = mapStateToProps(testState);
      expect(mapped.oraParentName).toEqual(selectors.app.oraParentName(testState));
    });
  });
});
