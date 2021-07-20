import {del, get} from "@/plugins/request"


const ingressUrl = (cluster_name) => {
  return `/api/v1/proxy/${cluster_name}/k8s/apis/networking.k8s.io/v1/ingresses`
}

const namespaceIngressUrl = (cluster_name,namespace) => {
  return `/api/v1/proxy/${cluster_name}/k8s/apis/networking.k8s.io/v1/namespaces/${namespace}/ingresses`
}

export function listIngresses (cluster_name, limit, continueToken, search) {
  let url = ingressUrl(cluster_name)
  if (limit) {
    url += "?limit=" + limit
  }
  if (continueToken) {
    url += "&continue=" + continueToken
  }
  if (search && search !== "") {
    url += "&fieldSelector=metadata.name=" + search
  }
  return get(url)
}

export function deleteIngress (cluster_name, name) {
  return del(`${namespaceIngressUrl(cluster_name)}/${name}`)
}
