type Dict = { [key: string]: string };

declare let process: {
  env: {
    ENTRIES: Dict;
  };
};

const getLinks = () => {
  let linkStr = '';
  Object.keys(process.env.ENTRIES).forEach((k: string) => {
    if (k === 'examples/index') {
      return;
    }
    const arr = k.split('/');
    linkStr += `<a target="_blank" href='${k}'>${arr[arr.length - 1]}</a>`;
  });
  return linkStr;
};

const links = document.querySelector('#list');
if (links !== null) {
  links.innerHTML = getLinks();
}
