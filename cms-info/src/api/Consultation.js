import request from '@/utils/request'

/**
 *
 * 获取tag标签列表
 *
 */
export function tagManagePage(data) {
  return request({
    url: '/cms/systemManager/tagManagePage',
    method: 'post',
    data,
  })
}

/**
 *
 * tag标签切换页面
 *
 */
export function getTagSign(data) {
  return request({
    url: '/cms/systemManager/getTagSign',
    method: 'get',
    params: data,
  })
}

/**
 *
 * 编辑tag标签
 *
 */
export function editTagSort(data) {
  return request({
    url: '/cms/systemManager/editTagSort',
    method: 'post',
    data,
  })
}

/**
 *
 * 新增tag标签
 *
 */
export function createTagSort(data) {
  return request({
    url: '/cms/systemManager/createTagSort',
    method: 'post',
    data,
  })
}


/**
 *
 * 删除tag类型
 *
 */
export function deleteTagSort(data) {
  return request({
    url: '/cms/systemManager/deleteTagSort',
    method: 'post',
    data,
  })
}


/**
 *
 * 删除tag标签
 *
 */
export function deleteTagSign(data) {
  return request({
    url: '/cms/systemManager/deleteTagSign',
    method: 'post',
    data,
  })
}

/**
 *
 * 编辑tag标签
 *
 */
export function editTagSign(data) {
  return request({
    url: '/cms/systemManager/editTagSign',
    method: 'post',
    data,
  })
}


/**
 *
 * 获取资讯列表
 *
 */
export function consultationDisplay(data) {
  return request({
    url: '/cms/systemManager/consultationDisplay',
    method: 'post',
    data
  })
}

/**
 *
 * 获取所有tag类型
 *
 */
export function getAllTagSort(data) {
  return request({
    url: '/cms/systemManager/getAllTagSort',
    method: 'post',
    data
  })
}

/**
 *
 * 删除咨询到回收站
 *
 */
export function deleteConsultation(data) {
  return request({
    url: '/cms/systemManager/deleteConsultation',
    method: 'post',
    data
  })
}


/**
 *
 * 确认咨询显示行数
 *
 */
export function consultationDisplayNum(data) {
  return request({
    url: '/cms/systemManager/consultationDisplayNum',
    method: 'get',
    params: data,
  })
}

/**
 *
 * 发布资讯
 *
 */
export function createConsultation(data) {
  return request({
    url: '/cms/systemManager/createConsultation',
    method: 'post',
    data
  })
}

/**
 *
 * 修改资讯
 *
 */
export function editConsultation(data) {
  return request({
    url: '/cms/systemManager/editConsultation',
    method: 'post',
    data
  })
}

/**
 *
 * UUID获取资讯
 *
 */
export function showEditConsultation(data) {
  return request({
    url: '/cms/systemManager/showEditConsultation',
    method: 'get',
    params: data
  })
}

/**
 *
 * 获取回收站列表
 *
 */
export function consultationRecycleBin(data) {
  return request({
    url: '/cms/systemManager/consultationRecycleBin',
    method: 'post',
    data
  })
}

/**
 *
 * 回收站恢复
 *
 */
export function recoverConsultation(data) {
  return request({
    url: '/cms/systemManager/recoverConsultation',
    method: 'post',
    data
  })
}

/**
 *
 * 获取咨询banner
 *
 */
export function getConsultationBanner(data) {
  return request({
    url: '/cms/WebSiteShow/getConsultationBanner',
    method: 'post',
    data
  })
}

/**
 *
 * 编辑咨询banner
 *
 */
export function editConsultationBanner(data) {
  return request({
    url: '/cms/WebSiteShow/editConsultationBanner',
    method: 'post',
    data
  })
}

/**
 *
 * 编辑咨询banner
 *
 */
export function updateConsultationBannnerSort(data) {
  return request({
    url: '/cms/WebSiteShow/updateConsultationBannnerSort',
    method: 'post',
    data
  })
}

