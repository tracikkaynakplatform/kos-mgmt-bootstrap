# Management Cluster Generator for Kubernetes Orchestration System (KOS) project.
This project helps in provisioning a [management cluster](https://cluster-api.sigs.k8s.io/user/concepts.html#management-cluster) for [KOS](https://github.com/tracikkaynakplatform/KOS).


in progress..

# Cloning:
Use one of the following, to (properly and completely) clone this project:

A- clone directly with submodules:
```bash
git clone --recurse-submodules <this_repo_https_or_ssh_address>
```

B- Clone submodules after cloning the root project (kos):
```bash
git submodule init 
git submodule update
```

# Usage:

## Provision

Cluster api needs a management cluster. Kind can be used for test and demonstration purpose, but a 
proper High Available (HA) Kubernetes cluster is needed for production (nd staging) environments,
To solve this chicken-or-egg problem, this project proposes a ready build management cluster provisioning option
for cluster-api, using [Kubespray](https://github.com/kubernetes-sigs/kubespray) and related components. In a future release, we may include clusters
provisioned using other vendors like microk8s and RKE2.

### management cluster with kubespray
Please follow [vendors/kubespray/setup/RUN.md](./vendors/kubespray/setup/RUN.md) for a single node management cluster installation.
Orher configs for multi-node and HA cluster will be available, soon.

### management cluser with kind
For test and demo systems, you can apply the below simple steps to provision a simple management cluster, where 
resource constraints limit your options:


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

**NOTE:** You can add as many infrastructure providers (alongside docker) as you want.


__Now you can continue with [KOS](https://github.com/tracikkaynakplatform/KOS) and add this cluster as a management cluster__

---

_NOTE: You can also check out [manual workload cluster generation](./manual-cluster-generation.md)._

---

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
