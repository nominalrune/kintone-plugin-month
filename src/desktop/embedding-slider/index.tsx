import React from 'react';
import { render } from 'react-dom';
import { getFieldId } from '@common/cybozu';
import { restoreStorage } from '@common/plugin';
import { css } from '@emotion/css';

import App from './app';
import { isMobile } from '@common/kintone';

const events: kintone.EventType[] = ['app.record.create.show', 'app.record.edit.show'];

const action: launcher.Action = async (event, pluginId) => {
  const config = restoreStorage(pluginId);

  for (const condition of config.conditions) {
    if (!condition.field) {
      continue;
    }

    const fieldId = getFieldId(condition.field);

    const wrapper =
      document.querySelector<HTMLDivElement>(`.value-${fieldId} > div`) ||
      document.querySelector<HTMLDivElement>(`.value-${fieldId}`);

    if (!wrapper) {
      return event;
    }

    if (!isMobile()) {
      const fieldWrapper = document.querySelector(`.field-${fieldId}`);

      if (fieldWrapper) {
        const width = fieldWrapper.clientWidth;

        fieldWrapper.classList.add(css`
          width: ${width + 250}px !important;
        `);
      }
    }

    wrapper.classList.add(css`
      display: flex;
      align-items: center;
      input {
        min-width: 60px;
      }
    `);

    const div = document.createElement('div');
    wrapper.prepend(div);
    div.classList.add(css`
      display: flex;
      position: relative;
      padding: 0 32px 0 24px;
    `);

    const fieldValue = event.record[condition.field].value;

    const initialValue = isFinite(fieldValue) ? Number(fieldValue) : condition.min;

    render(<App {...{ condition, initialValue }} />, div);
  }

  console.log('プラグインが有効です', { pluginId, event, config });
  return event;
};

export default { events, action };
