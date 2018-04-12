'use strict';

const modifyStrForVoice = (str) => {
  if (str) {
    const pos = str.lastIndexOf(',');
    if (pos !== -1) {
      str = str.substring(0, pos) + ' and ' + str.substring(pos + 1);
    }
    return str;
  } else {
    return false;
  }
};

module.exports = {
  modifyStrForVoice
};
