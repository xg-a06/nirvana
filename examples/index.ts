type Dict = { [key: string]: string };

const getEntries = () => {
  let linkStr = '';
  const entries = process.env.ENTRIES as unknown;
  Object.keys(entries as Dict).forEach((k: string) => {
    if (k === 'examples/index') {
      return;
    }
    const arr = k.split('/');
    linkStr += `<a target="_blank" href='${k}'>${arr[arr.length - 1]}</a>`;
  });
  return linkStr;
};

const list = document.querySelector('#list');
if (list !== null) {
  list.innerHTML = getEntries();
}
