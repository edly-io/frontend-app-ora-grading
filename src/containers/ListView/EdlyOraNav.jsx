/**
 * EDLYPRODUCT-8522 — Prev/Next navigation across the open responses of a course.
 * Self-contained so that ListViewBreadcrumb.jsx stays near-upstream.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ChevronLeft, ChevronRight } from '@openedx/paragon/icons';
import { Button, OverlayTrigger, Tooltip } from '@openedx/paragon';
import { getConfig, getPath } from '@edx/frontend-platform';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';

import { selectors } from 'data/redux';
import { locationId } from 'data/constants/app';
import edlyMessages from './edlyMessages';

export const oraShape = PropTypes.shape({
  locationId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  parentName: PropTypes.string,
});

/**
 * locationId() reads the path as `publicPath + decoded block id`, so rebuild it the
 * same way rather than string-replacing inside the (possibly encoded) pathname.
 */
export const navigateToOra = (targetId) => {
  window.location.assign(`${getPath(getConfig().PUBLIC_PATH)}${encodeURIComponent(targetId)}`);
};

export const OraNavButton = ({
  ora, label, icon, isNext, tooltipId,
}) => {
  const button = (
    <Button
      variant="link"
      size="sm"
      className="edly-ora-nav-button"
      disabled={!ora}
      iconBefore={isNext ? undefined : icon}
      iconAfter={isNext ? icon : undefined}
      onClick={() => ora && navigateToOra(ora.locationId)}
    >
      {label}
    </Button>
  );
  // A disabled button emits no pointer events, so it can't anchor a tooltip.
  if (!ora) { return button; }
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={(
        <Tooltip id={tooltipId}>
          <span className="d-block">{ora.name}</span>
          {ora.parentName && <span className="d-block small">{ora.parentName}</span>}
        </Tooltip>
      )}
    >
      {button}
    </OverlayTrigger>
  );
};
OraNavButton.defaultProps = { ora: null };
OraNavButton.propTypes = {
  ora: oraShape,
  label: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  isNext: PropTypes.bool.isRequired,
  tooltipId: PropTypes.string.isRequired,
};

export const EdlyOraNav = ({ courseOras }) => {
  const intl = useIntl();
  const currentIndex = courseOras.findIndex(ora => ora.locationId === locationId());

  if (courseOras.length <= 1 || currentIndex < 0) { return null; }

  const values = { current: currentIndex + 1, total: courseOras.length };

  return (
    <nav
      className="edly-ora-nav"
      aria-label={intl.formatMessage(edlyMessages.oraNavLabel, values)}
    >
      <OraNavButton
        ora={currentIndex > 0 ? courseOras[currentIndex - 1] : null}
        label={intl.formatMessage(edlyMessages.prevOra)}
        icon={ChevronLeft}
        isNext={false}
        tooltipId="edly-ora-nav-prev"
      />
      <span className="edly-ora-nav-count small text-gray-600">
        <FormattedMessage {...edlyMessages.oraPosition} values={values} />
      </span>
      <OraNavButton
        ora={currentIndex < courseOras.length - 1 ? courseOras[currentIndex + 1] : null}
        label={intl.formatMessage(edlyMessages.nextOra)}
        icon={ChevronRight}
        isNext
        tooltipId="edly-ora-nav-next"
      />
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
