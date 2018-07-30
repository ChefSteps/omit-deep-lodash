const _ = require("lodash");

module.exports = function omitDeepLodash(input, props) {
  function omitDeepOnOwnProps(obj) {
    if (typeof input === "undefined") {
      return input;
    }

    if (!_.isArray(obj) && !_.isPlainObject(obj)) {
      return obj;
    }

    if (_.isArray(obj)) {
      return omitDeepLodash(obj, props);
    }

    const o = {};
    _.forOwn(obj, (value, key) => {
      o[key] = omitDeepLodash(value, props);
    });

    return _.omit(o, props);
  }

  if (arguments.length > 2) {
    props = Array.prototype.slice.call(arguments).slice(1);
  }

  if (_.isArray(input)) {
    return input.map(omitDeepOnOwnProps);
  }

  return omitDeepOnOwnProps(input);
};
