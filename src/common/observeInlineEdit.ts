export default function observeInlineEditCancel(el: HTMLElement, onCancel: (elements: HTMLElement[], event:{record:any}) => void) {
  kintone.events.on('app.record.index.edit.show', function (event) {
    const observer = new MutationObserver(function (mutationsList, observer) {
      const targets = [...new Set<HTMLElement>(mutationsList.map(m => m.target).filter(t => t instanceof HTMLElement) as HTMLElement[])];
      onCancel(targets, event);
      observer.disconnect();
    });
    observer.observe(el, { characterData: false, childList: true, attributes: true });
  });
}
