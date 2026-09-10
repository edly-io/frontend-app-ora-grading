import { screen } from '@testing-library/react';

import { renderWithIntl } from '../../testUtils';
import { EdlyOraBreadcrumb, mapStateToProps } from './EdlyOraBreadcrumb';

jest.mock('data/redux', () => ({
  selectors: {
    app: {
      oraBreadcrumb: jest.fn((state) => state.oraBreadcrumb || []),
    },
  },
}));

const oraBreadcrumb = ['Week 1', 'Peer Assessments', 'Essay unit'];

describe('EdlyOraBreadcrumb component', () => {
  it('renders nothing when the breadcrumb is empty', () => {
    const { container } = renderWithIntl(<EdlyOraBreadcrumb oraBreadcrumb={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders every ancestor name separated by a slash', () => {
    renderWithIntl(<EdlyOraBreadcrumb oraBreadcrumb={oraBreadcrumb} />);
    const crumbs = screen.getByText(/Week 1/);
    expect(crumbs).toHaveTextContent('Week 1/Peer Assessments/Essay unit');
  });

  describe('mapStateToProps', () => {
    it('maps oraBreadcrumb from app.oraBreadcrumb selector', () => {
      expect(mapStateToProps({ oraBreadcrumb }).oraBreadcrumb).toEqual(oraBreadcrumb);
    });
  });
});
