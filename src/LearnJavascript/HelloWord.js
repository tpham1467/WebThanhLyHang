class NodeTree {

    constructor(value, left, right) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

}
function Add(value) {
    if (root == null) {
        root = new NodeTree(value, null, null);
    }
    else {
        let node = root;
        let pre;
        while (node !== null) {
            if (node.value === value) {
                console.log("Exist");
                return;
            }
            else if (node.value > value) {
                pre = node;
                node = node.left;
            }
            else {
                pre = node;
                node = node.right;
            }
        }
        let newnode = new NodeTree(value, null, null);
        if (pre.value > value) {
            pre.left = newnode;
        }
        else {

            pre.right = newnode;
        }

    }
}
function Search(value) {
    let node = root;
    while (node !== null) {
        if (node.value === value) {
            return node;
        }
        else if (node.value > value) {
            node = node.left;
        }
        else {
            node = node.right;
        }
    }
    return node;
    return node;
}
function Delete(value) {
    let node = root;
    let pre;
    while (node !== null) {
        if (node.value === value) {
            break;
        }
        else if (node.value > value) {
            pre = node;
            node = node.left;
        }
        else {
            pre = node;
            node = node.right;
        }
    }


    if (node == null) {
        console.log("Not Found");
    }
    else {
        let nodeleft = node.left;
        let noderight = node.right;
        console.log("Deleting: " + node.value);
        if (nodeleft == null || noderight == null) {
            let nodeswap = (nodeleft == null) ? noderight : nodeleft;
            if (nodeswap == null) {
                RemoveNode(pre, node.value);
            }
            else {
                node.value = nodeswap.value;
                RemoveNode(node, nodeswap.value);
            }
        }
        else {
            nodemin = root.right;
            while (nodemin.left !== null) {
                pre = nodemin;
                nodemin = nodemin.left;
            }
            node.value = nodemin.value;
            RemoveNode(pre, nodemin.value);
        }
    }
}

function RemoveNode(pre, value) {
    if (pre.left != null && pre.left.value == value) pre.left = null;
    else pre.right = null;
}
function Print(root) {
    if (root != null) {
        Print(root.left);
        console.log(root.value);
        Print(root.right);
    }
}
let root;
Add(50);
Add(30);
Add(20);
Add(40);
Add(70);
Add(60);
Add(80);
Delete(20);
Delete(30);
Delete(50);
Print(root);