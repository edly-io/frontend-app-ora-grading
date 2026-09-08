/**
 * EDLYPRODUCT-8522 — session identifier + Prev/Next ORA navigation.
 * Self-contained so that ListViewBreadcrumb.jsx stays near-upstream.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ArrowBack, ArrowForward } from '@openedx/paragon/icons';
import { Icon, IconButton } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { selectors } from 'data/redux';
import { locationId } from 'data/constants/app';
import edlyMessages from './edlyMessages';

function navigateToOra(currentId, targetId) {
  const newPathname = window.location.pathname.replace(currentId, targetId);
  window.location.href = `${window.location.origin}${newPathname}`;
}

export const EdlyOraNav = ({ oraParentName, courseOras }) => {
  const intl = useIntl();
  const currentId = locationId();
  const currentIndex = courseOras.findIndex(ora => ora.locationId === currentId);
  const prevOra = currentIndex > 0 ? courseOras[currentIndex - 1] : null;
  const nextOra = (currentIndex >= 0 && currentIndex < courseOras.length - 1)
    ? courseOras[currentIndex + 1] : null;

  if (!oraParentName && courseOras.length <= 1) { return null; }

  return (
    <div className="mb-2">
      {oraParentName && (
        <p className="mb-1 small text-gray-500">{oraParentName}</p>
      )}
      {courseOras.length > 1 && (
        <div className="d-flex align-items-center" style={{ gap: '0.25rem' }}>
          <IconButton
            src={ArrowBack}
            iconAs={Icon}
            variant="primary"
            disabled={!prevOra}
            onClick={() => prevOra && navigateToOra(currentId, prevOra.locationId)}
            aria-label={intl.formatMessage(edlyMessages.prevOra)}
            title={prevOra ? `${prevOra.parentName}: ${prevOra.name}` : undefined}
            size="sm"
          />
          {currentIndex >= 0 && (
            <span className="small text-gray-500 px-1">
              {currentIndex + 1}&nbsp;/&nbsp;{courseOras.length}
            </span>
          )}
          <IconButton
            src={ArrowForward}
            iconAs={Icon}
            variant="primary"
            disabled={!nextOra}
            onClick={() => nextOra && navigateToOra(currentId, nextOra.locationId)}
            aria-label={intl.formatMessage(edlyMessages.nextOra)}
            title={nextOra ? `${nextOra.parentName}: ${nextOra.name}` : undefined}
            size="sm"
          />
        </div>
      )}
    </div>
  );
};

EdlyOraNav.defaultProps = {
  oraParentName: '',
  courseOras: [],
};
EdlyOraNav.propTypes = {
  oraParentName: PropTypes.string,
  courseOras: PropTypes.arrayOf(PropTypes.shape({
    locationId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    parentName: PropTypes.string.isRequired,
  })),
};

export const mapStateToProps = (state) => ({
  oraParentName: selectors.app.oraParentName(state),
  courseOras: selectors.app.courseOras(state),
});

export default connect(mapStateToProps)(EdlyOraNav);
