import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ArrowBack, Launch } from '@openedx/paragon/icons';
import { Hyperlink, Icon } from '@openedx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';

import { selectors } from 'data/redux';
import { locationId } from 'data/constants/app';
import urls from 'data/services/lms/urls';
import messages from './messages';
import EdlyOraNav from './EdlyOraNav';

/**
 * <ListViewBreadcrumb />
 */
export const ListViewBreadcrumb = ({ courseId, oraName, oraParentName }) => (
  <>
    <Hyperlink className="py-4" destination={urls.openResponse(courseId)}>
      <Icon src={ArrowBack} className="d-inline-block mr-3 breadcrumb-arrow" />
      <FormattedMessage {...messages.backToResponses} />
    </Hyperlink>
    <div className="ora-header">
      <div className="ora-header-heading">
        {oraParentName && (
          <p className="ora-header-unit small text-gray-600">{oraParentName}</p>
        )}
        <p className="mb-0">
          <span className="h3">{oraName}</span>
          <Hyperlink className="align-middle" destination={urls.ora(courseId, locationId())}>
            <Icon src={Launch} className="d-inline-block" />
          </Hyperlink>
        </p>
      </div>
      <EdlyOraNav />
    </div>
  </>
);
ListViewBreadcrumb.defaultProps = {
  courseId: '',
  oraName: '',
  oraParentName: '',
};
ListViewBreadcrumb.propTypes = {
  courseId: PropTypes.string,
  oraName: PropTypes.string,
  oraParentName: PropTypes.string,
};

export const mapStateToProps = (state) => ({
  courseId: selectors.app.courseId(state),
  oraName: selectors.app.ora.name(state),
  oraParentName: selectors.app.oraParentName(state),
});

export const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ListViewBreadcrumb);
