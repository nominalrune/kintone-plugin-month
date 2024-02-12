export default class PluginStorage<T extends object> {
  private config: T | null = null;
  constructor(private pluginId: string, initialConfig: T | null = null) {
    if(initialConfig){
    }
    this.get();
  }
  get(): T | null {
    if(this.config === null) {
      this.config = kintone.plugin.app.getConfig(this.pluginId);
    }
    return this.config;
  }
  set(config: T): void {
    this.config = config;
    kintone.plugin.app.setConfig(config);
  }
}
