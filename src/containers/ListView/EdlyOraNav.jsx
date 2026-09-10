/**
 * <EdlyOraNav />
 *
 * Edly addition: steps through the course's open responses in outline order, so
 * a grader need not return to the instructor dashboard between ORAs. `courseOras`
 * comes from the edly-features-app override of the ESG initialize endpoint, and
 * is empty against an LMS without it, which hides these controls. Its own file
 * so upstream's ListViewBreadcrumb.jsx only gains a child tag.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ChevronLeft, ChevronRight } from '@openedx/paragon/icons';
import { Button } from '@openedx/paragon';
import { getConfig, getPath } from '@edx/frontend-platform';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';

import { selectors } from 'data/redux';
import { locationId } from 'data/constants/app';
import edlyMessages from './edlyMessages';

export const oraShape = PropTypes.shape({
  locationId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

// Full reload on purpose: locationId() is read from the URL at load, so the app
// re-initializes for the new ORA. Path is rebuilt the way locationId() parses it.
export const navigateToOra = (targetId) => {
  window.location.assign(`${getPath(getConfig().PUBLIC_PATH)}${encodeURIComponent(targetId)}`);
};

export const EdlyOraNav = ({ courseOras }) => {
  const intl = useIntl();
  const currentIndex = courseOras.findIndex(ora => ora.locationId === locationId());

  if (courseOras.length <= 1 || currentIndex < 0) { return null; }

  const prevOra = currentIndex > 0 ? courseOras[currentIndex - 1] : null;
  const nextOra = currentIndex < courseOras.length - 1 ? courseOras[currentIndex + 1] : null;
  const values = { current: currentIndex + 1, total: courseOras.length };

  return (
    <nav
      className="edly-ora-nav"
      aria-label={intl.formatMessage(edlyMessages.oraNavLabel, values)}
    >
      <Button
        variant="link"
        size="sm"
        className="edly-ora-nav-button"
        disabled={!prevOra}
        iconBefore={ChevronLeft}
        onClick={() => prevOra && navigateToOra(prevOra.locationId)}
      >
        {intl.formatMessage(edlyMessages.prevOra)}
      </Button>
      <span className="edly-ora-nav-count small text-gray-600">
        <FormattedMessage {...edlyMessages.oraPosition} values={values} />
      </span>
      <Button
        variant="link"
        size="sm"
        className="edly-ora-nav-button"
        disabled={!nextOra}
        iconAfter={ChevronRight}
        onClick={() => nextOra && navigateToOra(nextOra.locationId)}
      >
        {intl.formatMessage(edlyMessages.nextOra)}
      </Button>
    </nav>
  );
};

EdlyOraNav.defaultProps = {
  courseOras: [],
};
EdlyOraNav.propTypes = {
  courseOras: PropTypes.arrayOf(oraShape),
};

export const mapStateToProps = (state) => ({
  courseOras: selectors.app.courseOras(state),
});

export default connect(mapStateToProps)(EdlyOraNav);
