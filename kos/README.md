will include script/executables/services for installing and managing the system (kos).
in progres....

## vendor / contrib r&d:

### kubespray:
- ansible provisioning: inventory (hosts) and roles
- cluster + reset (undo) + scale (add node) + remove (node, gracefully), upgrade-cluster (multi-step, control + workers)
- 

+ kubespray-cli project ==> not maintained since 5yrs.

### cluster-api research:

- uses: node-problem-detector, cluster autoscaler, SIG-Multi-cluster.  
    - [ ] //TODO: check for others??
- no mgmmt for externally provisioned clusters
    - [ ] //TODO: check if can be added, even partially, as in Rancher
- cannot make clusters in scattered nodes (ok, not useful)
- [ ] //TODO: check if remove/reset exist..
- [ ] //TODO: test, and add to vendors/contrib, if applicable.

## app modules and requirements:

Note: Only hierarchy is designed here.. Refer to epics and stories in jira for final status.

### user/preferences mgmt module
user federation, identities.. may use/utilize argocd's library or keycloak, wso2 ...etc
may mostly be read-only (provided by provider) except for some preferences ...

### inventory mgmt module
multi-level inventory mgmt.. (machine groups in openstack)
    dynamic node additions (dynamic scaling.. cluster-api supports in cluster level/module) checking
    settings applied when new nodes/groups are added..
    auto add nodes, when auto-scaling is needed, to a limit

### cluster mgmt module
view owned clusters
    get config for user.

add, 
update (change existing configuration),
    settings place, when applied, auto. applies.
    add apps/charts (helm, ...etc). /w their configuration options.
upgrade (to a newer version), 
scale (static.. dynamic scaling may already be provided), 

## Application Libraries/Frameworks:

- https://github.com/gin-gonic/gin  : REST & web?:
    - This or https://github.com/labstack/echo or plain?
    - stdlib + gorilla mux 
        - (muxdoes not have a release for 2 yrs) ??
  https://eli.thegreenplace.net/2021/rest-servers-in-go-part-1-standard-library/
- keycloak or https://github.com/dexidp/dex
    - https://github.com/Nerzal/gocloak  : keycloak adapter. This is probably the only stable and updated library.
        - This or plain?
        - can it be adapted/plugged into gin or will it be used independently?

# Go (REST) frameworks

## versioning:
```
root:
    /api/v1/<module_name>/<path?>
        RESTFUL ==> frontend to backend (and backend to backend comm)..

eg:
    /api/v1/user/:id  ==> get user details with id ....
```

## echo


Following https://echo.labstack.com/guide/ .

# Framework:

A working cluster initialized with cluster-api, is assumed. KOS moduled are installed in here and will be used here ..


//TODO:  
    - [ ] b2b, b2cluster-api, f2b comm via single token, is assumed at first... R&D ==> sec....
        - [ ] split b2cluster-api token soon ???


