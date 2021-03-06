import request from '@/utils/request'

/**
 *
 * 确定显示行数
 *
 */
export function changeLineNum(data) {
  return request({
    url: '/cms/systemManager/changeLineNum',
    method: 'get',
    params: data,
  })
}

/**
 *
 * 获取友情链接
 *
 */
export function friendlyLink() {
  return request({
    url: '/cms/systemManager/friendlyLink',
    method: 'get',
  })
}

/**
 *
 * 新增友情链接
 *
 */
export function createFriendlyLink(data) {
  return request({
    url: '/cms/systemManager/createFriendlyLink',
    method: 'post',
    data
  })
}

/**
 *
 * 编辑友情链接
 *
 */
export function updateLink(data) {
  return request({
    url: '/cms/systemManager/updateLink',
    method: 'post',
    data
  })
}

/**
 *
 * 删除友情链接
 *
 */
export function deleteLink(data) {
  return request({
    url: '/cms/systemManager/deleteLink',
    method: 'post',
    data
  })
}

/**
 *
 * 获取底部信息列表
 *
 */
export function footerColumn(data) {
  return request({
    url: '/cms/systemManager/footerColumn',
    method: 'post',
    data
  })
}

/**
 *
 * 新增底部信息
 *
 */
export function createFooter(data) {
  return request({
    url: '/cms/systemManager/createFooter',
    method: 'post',
    data
  })
}


/**
 *
 * 删除底部信息
 *
 */
export function deleteFooter(data) {
  return request({
    url: '/cms/systemManager/deleteFooter',
    method: 'post',
    data
  })
}


/**
 *
 * 修改底部信息
 *
 */
export function editFooter(data) {
  return request({
    url: '/cms/systemManager/editFooter',
    method: 'post',
    data
  })
}

/**
 *
 * 获取网站地图列表
 *
 */
export function websiteMap(data) {
  return request({
    url: '/cms/systemManager/websiteMap',
    method: 'post',
    data
  })
}

/**
 *
 * 新增网站地图
 *
 */
export function createWebsiteMap(data) {
  return request({
    url: '/cms/systemManager/createWebsiteMap',
    method: 'post',
    data
  })
}

/**
 *
 * 删除一级网站地图
 *
 */
export function deleteWebsiteMap(data) {
  return request({
    url: '/cms/systemManager/deleteWebsiteMap',
    method: 'post',
    data
  })
}

/**
 *
 * 删除二级网站地图
 *
 */
export function deleteWebsiteMapChild(data) {
  return request({
    url: '/cms/systemManager/deleteWebsiteMapChild',
    method: 'post',
    data
  })
}

/**
 *
 * 编辑一级网站地图
 *
 */
export function editWebsiteMap(data) {
  return request({
    url: '/cms/systemManager/editWebsiteMap',
    method: 'post',
    data
  })
}


/**
 *
 * 二级网站地图切换页面
 *
 */
export function websiteMapChild(data) {
  return request({
    url: '/cms/systemManager/websiteMapChild',
    method: 'get',
    params: data,
  })
}

/**
 *
 * 编辑二级网站地图
 *
 */
export function editWebsiteMapChild(data) {
  return request({
    url: '/cms/systemManager/editWebsiteMapChild',
    method: 'post',
    data,
  })
}

