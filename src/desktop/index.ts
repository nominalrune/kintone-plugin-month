import Launcher from '@common/launcher';

import event from './input';

((PLUGIN_ID) => new Launcher(PLUGIN_ID).launch([event]))(kintone.$PLUGIN_ID);
