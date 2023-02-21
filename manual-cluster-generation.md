# Manual Cluster Generation

The below legacy steps are included for demonstration purposes, to gain insight on how clusterctl can be used
manually to provision clusters. Refer to [KOS](https://github.com/tracikkaynakplatform/KOS) to easily create 
and manage workload cluster, using a user-friendly UI.

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