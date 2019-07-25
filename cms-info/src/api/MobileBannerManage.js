import request from '@/utils/request'

/**
 *
 * 获取banner列表
 *
 */
export function getWebSiteBannerDetail(data) {
  return request({
    url: '/cms/WebSiteShow/getWebSiteBannerDetail',
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
    url: '/cms/WebSiteShow/createBannner',
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
    url: '/cms/WebSiteShow/saveWebSiteBanner',
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
    url: '/cms/WebSiteShow/editWebSiteBannerStatus',
    method: 'post',
    data,
  })
}
/**
 *
 * banner排序
 *
 */
export function updateBannnerSort(data) {
  return request({
    url: '/cms/WebSiteShow/updateBannnerSort',
    method: 'post',
    data,
  })
}
