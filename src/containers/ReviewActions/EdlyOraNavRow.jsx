/**
 * EDLYPRODUCT-8522 — ORA session identifier + navigation row for the grading modal.
 */
import React from 'react';

import EdlyOraNav from 'containers/ListView/EdlyOraNav';

const EdlyOraNavRow = () => (
  <div className="px-4 pb-1 pt-0 border-bottom">
    <EdlyOraNav />
  </div>
);

export default EdlyOraNavRow;
