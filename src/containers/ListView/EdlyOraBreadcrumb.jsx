/**
 * <EdlyOraBreadcrumb />
 *
 * Edly addition rendered inside upstream's <ListViewBreadcrumb />: the
 * section > subsection > unit trail, so a grader can tell which part of the
 * course an ORA belongs to. `oraBreadcrumb` comes from the edly-features-app
 * override of the ESG initialize endpoint, and is empty against an LMS
 * without it, which hides the trail.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectors } from 'data/redux';

export const EdlyOraBreadcrumb = ({ oraBreadcrumb }) => {
  if (!oraBreadcrumb.length) { return null; }
  return (
    <p className="ora-header-crumbs small text-gray-600">
      {oraBreadcrumb.map((name, index) => (
        // names are the only identity available; index keeps repeats distinct
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={`${name}-${index}`}>
          {index > 0 && <span className="ora-header-crumb-spacer" aria-hidden="true">/</span>}
          {name}
        </React.Fragment>
      ))}
    </p>
  );
};

EdlyOraBreadcrumb.defaultProps = {
  oraBreadcrumb: [],
};
EdlyOraBreadcrumb.propTypes = {
  oraBreadcrumb: PropTypes.arrayOf(PropTypes.string),
};

export const mapStateToProps = (state) => ({
  oraBreadcrumb: selectors.app.oraBreadcrumb(state),
});

export default connect(mapStateToProps)(EdlyOraBreadcrumb);
