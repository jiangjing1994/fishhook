/**
 * @param {string} path
 * @returns {Boolean}
 */
export const isExternal = path => {
  return /^(https?:|mailto:|tel:)/.test(path);
};
/**
 * 对api返回数据判断
 * @param response
 * @param showSuccessTip
 */
const result = (response, showSuccessTip) => {
  return new Promise((resolve, reject) => {
    if (response) {
      if (response.status === 1 || response.status === -2) {
        if (showSuccessTip) {
          switch (showSuccessTip) {
            case "add":
              Notification.success("增加成功");
              break;
            case "update":
              Notification.success("更新成功");
              break;
            case "delete":
              Notification.success("删除成功");
              break;
            default:
              Notification.success(response.msg || "操作成功");
          }
        }
        resolve(response.info);
      } else {
        Notification.error(response.msg);
        reject(response.msg);
      }
    }
  });
};

export { result };
