import { ServiceInfoType } from '@nobush/core'

export const getServiceInfo = (): ServiceInfoType => {
  const pluginInfo: ServiceInfoType = {
    serviceName: 'OAuthPlugin',
    serviceDescription: 'OAuth plugin which registers commands and routes',
    serviceVersion: '1.0.0',
  }

  return pluginInfo
}
