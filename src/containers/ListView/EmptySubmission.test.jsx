import { screen } from '@testing-library/react';
import { renderWithIntl } from '../../testUtils';
import EmptySubmission from './EmptySubmission';

jest.mock('./assets/empty-state.svg', () => './assets/empty-state.svg');

describe('EmptySubmission component', () => {
  it('renders the empty state image with correct alt text', () => {
    renderWithIntl(<EmptySubmission />);
    expect(screen.getByAltText('empty state')).toBeInTheDocument();
  });

  it('renders the no results found title message', () => {
    renderWithIntl(<EmptySubmission />);
    expect(screen.getByText('Nothing here yet')).toBeInTheDocument();
  });

  it('leaves the back link to the breadcrumb, which renders above it', () => {
    renderWithIntl(<EmptySubmission />);
    expect(screen.queryByText('Back to all open responses')).not.toBeInTheDocument();
  });
});
