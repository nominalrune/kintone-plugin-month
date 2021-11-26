import Launcher from '@common/launcher';

import event from './embedding-slider';

((PLUGIN_ID) => new Launcher(PLUGIN_ID).launch([event]))(kintone.$PLUGIN_ID);
