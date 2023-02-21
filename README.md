# Kubernetes Orchestration System project.
in progress..

# Cloning:
Use one of the following, to clone this project:

A- clone directly with submodules:
```bash
git clone --recurse-submodules
```

B- Clone submodules after cloning the root project (kos):
```bash
git submodule init 
git submodule update
```

# cluster-api
Cluster api needs a management cluster. Kind can be used for this purpose, or a single node kubespray cluster can be provisioned.

## management cluster with kubespray
please follow vendors/kubespray/setup/RUN.md for a single node management cluster installation.

## management cluser with kind
First, follow this guide to install kind: https://kind.sigs.k8s.io/docs/user/quick-start/

Then follow this guide to install clusterctl: https://cluster-api.sigs.k8s.io/user/quick-start.html#install-clusterctl


To fire-up the management cluster via kind, use:

```bash
cat > kind-cluster-with-extramounts.yaml <<EOF
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  extraMounts:
    - hostPath: /var/run/docker.sock
      containerPath: /var/run/docker.sock
EOF

kind create cluster --config kind-cluster-with-extramounts.yaml
```
Test it with:

```bash
kind get clusters
## and/or
kubectl cluster-info --context kind-kind
```

clusterctl uses current kubectl config/context, so test it with:
```bash
kubectl config get-contexts
kubectl cluster-info
```
switch to kind-kind context, if it is not the current one.


`CLUSTER_TOPOLOGY` can be left as it is.

## initialize the management cluster

For docker targets (as used in kind), use:

```bash
clusterctl init --infrastructure docker
```
output:

```bash
Fetching providers
Installing cert-manager Version="v1.5.3"
Waiting for cert-manager to be available...
Installing Provider="cluster-api" Version="v1.1.3" TargetNamespace="capi-system"
Installing Provider="bootstrap-kubeadm" Version="v1.1.3" TargetNamespace="capi-kubeadm-bootstrap-system"
Installing Provider="control-plane-kubeadm" Version="v1.1.3" TargetNamespace="capi-kubeadm-control-plane-system"
Installing Provider="infrastructure-docker" Version="v1.1.3" TargetNamespace="capd-system"

Your management cluster has been initialized successfully!

You can now create your first workload cluster by running the following:

  clusterctl generate cluster [name] --kubernetes-version [version] | kubectl apply -f -
```

**NOTE:** In any of the above and below steps, if a “too many open files” error occurs (can be seen as docker/pod logs?), see: https://kind.sigs.k8s.io/docs/user/known-issues/#pod-errors-due-to-too-many-open-files

## initialize the workload cluster

For the docker provider, run the following command to produce a cluster yaml file:

```bash
clusterctl generate cluster capi-quickstart --flavor development \
  --kubernetes-version v1.23.6 \
  --control-plane-machine-count=3 \
  --worker-machine-count=3 \
  > capi-quickstart-v1.23.6.yaml

```

Run the output:

```bash
kubectl apply -f capi-quickstart-v1.23.6.yaml
```
Output:

```bash
cluster.cluster.x-k8s.io/capi-quickstart created
dockercluster.infrastructure.cluster.x-k8s.io/capi-quickstart created
kubeadmcontrolplane.controlplane.cluster.x-k8s.io/capi-quickstart-control-plane created
dockermachinetemplate.infrastructure.cluster.x-k8s.io/capi-quickstart-control-plane created
dockermachinetemplate.infrastructure.cluster.x-k8s.io/capi-quickstart-md-0 created
kubeadmconfigtemplate.bootstrap.cluster.x-k8s.io/capi-quickstart-md-0 created
machinedeployment.cluster.x-k8s.io/capi-quickstart-md-0 created
```

Wait for a few minutes for the workload cluster (docker) to be formed by the management cluster (kind).
view the resulting cluster (crd) object:

```bash
kubectl get cluster
```

describe it with:
```bash
clusterctl describe cluster capi-quickstart
```

NOTE: 
get the kubeconfig for the workload cluster with:
```bash
clusterctl get kubeconfig capi-quickstart > $HOME/.kube/capi-quickstart.kubeconfig
```

apply cni with:
```bash

kubectl --kubeconfig=$HOME/.kube/capi-quickstart.kubeconfig apply -f https://projectcalico.docs.tigera.io/manifests/calico.yaml

```

That's it.

(## produces single node (even if 3+3=6 nodes are reuired..))

## finishing and cleanup

to delete resources (if needed):

### delete workload clusters with:

```bash
kubectl delete cluster capi-quickstart
```

### pause all docker containers:
```bash
docker pause $(docker ps -q)
```
unpause:
```bash
docker unpause $(docker ps -q)
```

### delete the management cluster:
If kubespray is used to produce the management cluster, the image provisioned using it, should be removed manually.

If kind is used, run:

```bash
kind delete cluster
```

# Alternative Solutions:

## Backend:
- [ ] Direct access to upstream cluster-api backend
- [ ] Fork & Customize (or extend) cluster-api backend and direct access

## Frontend:
- [ ] make extension to and existing one
- [ ] extend an existing one
- [ ] build a brand new one

### Existing client-based solutions:
- [?] lens
  react (typescript) on electron. 
  extension dev: https://api-docs.k8slens.dev/v5.4.3/
  (probably) active development
- [?] kubenav
  has backend with gomobile ?
  ricoberger@staffbase, diminishing development.

## Existing server-based solutions:
- [?] dashboard
  - constant low contribution.
  + rationale for a backend : https://github.com/kubernetes/dashboard/blob/master/docs/developer/architecture.md
  - go + angular (+google stuff)
- [-] rancher?
  - own oci extensions, ...etc. Found no way for ui extensions..
- [-] octant
  diminished development: https://tanzu.vmware.com/content/blog/welcoming-heptio-open-source-projects-to-vmware

## IAM:
- [ ] use a library (like dex?)
- [ ] use a prodiction app and api, like keycloak
- [ ] in-house impl.

### existing libs/solutions:
- permission manager (SIGHUPIO):
  + https://github.com/sighupio/permission-manager
  - low freq. diminished development.

+ sa uses rfc-7519 tokens (JWT)

### resources:
RBAC: 
  https://kubernetes.io/docs/reference/access-authn-authz/rbac/
Api internal access (from a pod) (/w sa): 
  https://kubernetes.io/docs/tasks/run-application/access-api-from-pod/
Api external acces:
  https://kubernetes.io/docs/tasks/administer-cluster/access-cluster-api/
  JS client:
  https://kubernetes.io/docs/tasks/administer-cluster/access-cluster-api/#javascript-client

### Authentication strategies:
- client certs (-client-ca-file=SOMEFILE ==> one or more certs)
- static tokens (--token-auth-file=SOMEFILE)
- bootstrap tokens (kubeadm?) (--enable-bootstrap-token-auth) ...
- sa tokens
- oidc connect tokens (--oidc-** parameters)
  there are similar parameters for clients (kubectl, ...etc)
- webhook token (--authentication-token-webhook-** parameters)
  - can be used with client-go
- authenticating proxy ?? (--requestheader-** )
- anonymous (--anonymous-auth=true)
- Extra:
  Impersonation (should have this role)

# Similar work:
- [ ] WKSctl ? : https://www.weave.works/oss/wksctl/
  - utilizes gitops
- [ ] k3d : single node /w k3s
- [ ] Rancher: Suse
- [ ] OpenShift: Redhat

# Keywords:

LF
  CNCF

kubernetes.io/docs
  kubeadm
  minukube
  k3s - rancher

client:
  kubectl - cli
  lens


- cluster-api: server impl.. 

kubeconfig
