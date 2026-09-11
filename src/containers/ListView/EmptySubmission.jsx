import React from 'react';

import { FormattedMessage } from '@edx/frontend-platform/i18n';

import emptyStateSVG from './assets/empty-state.svg';
import messages from './messages';

// Upstream put a back button here because the breadcrumb was hidden on the empty
// state; the breadcrumb now always renders, so this would be the same CTA twice.
const EmptySubmission = () => (
  <div className="empty-submission">
    <img src={emptyStateSVG} alt="empty state" />
    <h3>
      <FormattedMessage {...messages.noResultsFoundTitle} />
    </h3>
    <p>
      <FormattedMessage {...messages.noResultsFoundBody} />
    </p>
  </div>
);

export default EmptySubmission;
