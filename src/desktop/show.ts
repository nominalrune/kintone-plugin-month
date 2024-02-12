import { restoreStorage } from '@common/plugin';
// import observeInlineEditCancel from '@common/observeInlineEdit';
const events: kintone.EventType[] = [
  'app.record.index.show',
  'app.record.detail.show'
];

const action: launcher.Action = async (event, pluginId) => {
  const config = restoreStorage(pluginId);

  for (const condition of config.conditions) {
    if (!condition.field) continue;
    if (condition.type !== "password") continue;
    if (event.type === "app.record.index.show") {
      replace(condition.field);
      setInterval(() => replace(condition.field), 500);
      function replace(field: string) {
        const nativeElements = kintone.app.getFieldElements(field);
        if (!nativeElements) return;
        nativeElements.forEach(el => {
          const span = el.querySelector("span");
          if (!span) return;
          span.textContent = (span.textContent ?? "").replaceAll(/./g, "*");
        });
      }
    } else {
      const nativeElement = kintone.app.record.getFieldElement(condition.field);
      if (!nativeElement) continue;
      nativeElement.textContent = (nativeElement.querySelector("span")?.textContent ?? "").replaceAll(/./g, "*");
    }
  }

  console.log('プラグインが有効です', { pluginId, event, config });
  return event;
};

export default { events, action };
