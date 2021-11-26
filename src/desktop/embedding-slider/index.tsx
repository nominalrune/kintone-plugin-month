import React from 'react';
import { render } from 'react-dom';
import { getFieldId } from '@common/cybozu';
import { restoreStorage } from '@common/plugin';
import { css } from '@emotion/css';

import App from './app';

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

    wrapper.classList.add(css`
      display: flex;
      gap: 8px;
    `);

    const div = document.createElement('div');
    wrapper.prepend(div);
    div.classList.add(css`
      display: flex;
      position: relative;
      padding: 0 16px;
    `);

    const input = wrapper.querySelector('input');

    render(<App {...{ condition, input }} />, div);
  }

  console.log('プラグインが有効です', { pluginId, event, config });
  return event;
};

export default { events, action };
