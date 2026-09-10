/**
 * EDLYPRODUCT-8522 — Prev/Next navigation across the open responses of a course.
 * Self-contained so that ListViewBreadcrumb.jsx stays near-upstream.
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

/**
 * locationId() reads the path as `publicPath + decoded block id`, so rebuild it the
 * same way rather than string-replacing inside the (possibly encoded) pathname.
 */
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
