import request from '@/utils/request'

/**
 *
 * 获取banner列表
 *
 */
export function getWebSiteBannerDetail(data) {
  return request({
    url: '/cms/systemManager/getPcWebSiteBannerDetail',
    method: 'post',
    data,
  })
}

/**
 *
 * 新增banner
 *
 */
export function createBannner(data) {
  return request({
    url: '/cms/systemManager/createPcBannner',
    method: 'post',
    data,
  })
}

/**
 *
 * 新增banner
 *
 */
export function saveWebSiteBanner(data) {
  return request({
    url: '/cms/systemManager/savePcWebSiteBanner',
    method: 'post',
    data,
  })
}

/**
 *
 * banner上下架
 *
 */
export function editWebSiteBannerStatus(data) {
  return request({
    url: '/cms/systemManager/editPcWebSiteBannerStatus',
    method: 'post',
    data,
  })
}

/**
 *
 * banner上下架
 *
 */
export function updatePcBannnerSort(data) {
  return request({
    url: '/cms/systemManager/updatePcBannnerSort',
    method: 'post',
    data,
  })
}
