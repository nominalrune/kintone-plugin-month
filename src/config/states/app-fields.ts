import { selector } from 'recoil';
import { Properties } from '@kintone/rest-api-client/lib/src/client/types';
import { getUserDefinedFields, omitFieldProperties } from '@common/kintone-api';

const state = selector<Properties>({
  key: 'AppFields',
  get: async () => {
    const properties = await getUserDefinedFields();

    const filtered = omitFieldProperties(properties, [
      'CATEGORY',
      'CHECK_BOX',
      'DATE',
      'DATETIME',
      'DROP_DOWN',
      'FILE',
      'GROUP',
      'GROUP_SELECT',
      'LINK',
      'MULTI_SELECT',
      'ORGANIZATION_SELECT',
      'RADIO_BUTTON',
      'RECORD_NUMBER',
      'REFERENCE_TABLE',
      'STATUS',
      'STATUS_ASSIGNEE',
      'SUBTABLE',
      'TIME',
      'USER_SELECT',
    ]);

    return filtered;
  },
});

export default state;
