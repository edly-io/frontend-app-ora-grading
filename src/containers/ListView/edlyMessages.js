import { defineMessages } from '@edx/frontend-platform/i18n';

/**
 * Strings for the Edly-added ORA navigation. Separate from the upstream
 * messages.js so upstream upgrades do not conflict here.
 */
const edlyMessages = defineMessages({
  prevOra: {
    id: 'ora-grading.ListView.prevOra',
    defaultMessage: 'Previous',
    description: 'Button label to navigate to the previous open response in course order',
  },
  nextOra: {
    id: 'ora-grading.ListView.nextOra',
    defaultMessage: 'Next',
    description: 'Button label to navigate to the next open response in course order',
  },
  oraPosition: {
    id: 'ora-grading.ListView.oraPosition',
    defaultMessage: '{current} of {total}',
    description: 'Position of the current open response within the course open response list',
  },
  oraNavLabel: {
    id: 'ora-grading.ListView.oraNavLabel',
    defaultMessage: 'Open response {current} of {total} in this course',
    description: 'Accessible label for the open response navigation controls',
  },
});

export default edlyMessages;
