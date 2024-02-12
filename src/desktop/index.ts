import Launcher from '@common/launcher';

import editEvent from './edit';
import showEvent from './show';

((PLUGIN_ID) => new Launcher(PLUGIN_ID).launch([editEvent, showEvent]))(kintone.$PLUGIN_ID);
