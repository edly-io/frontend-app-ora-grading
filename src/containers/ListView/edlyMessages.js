import { defineMessages } from '@edx/frontend-platform/i18n';

/**
 * EDLYPRODUCT-8522 — i18n strings for Prev/Next ORA navigation.
 * Kept separate to avoid merge conflicts on upstream messages.js upgrades.
 */
const edlyMessages = defineMessages({
  prevOra: {
    id: 'ora-grading.ListView.prevOra',
    defaultMessage: 'Previous ORA',
    description: 'Button label to navigate to the previous ORA in course order',
  },
  nextOra: {
    id: 'ora-grading.ListView.nextOra',
    defaultMessage: 'Next ORA',
    description: 'Button label to navigate to the next ORA in course order',
  },
});

export default edlyMessages;
