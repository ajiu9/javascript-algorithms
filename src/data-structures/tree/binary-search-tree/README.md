# 二叉搜索树(Binary Search Tree)

在计算机科学中，**二叉搜索树**(BST)，有时也称为有序二叉树或排序二叉树，是一种特殊类型的容器：在内存中存储“项目”（例如数字、名称等）的数据结构。它们允许快速查找、添加和删除项目，并且可用于实现动态项目集或允许通过其键查找项目（例如，通过姓名查找某人的电话号码）的查找表。

二叉搜索树将它们的键按顺序排列，这样查找和其他操作就可以利用二叉搜索的原理：在树中寻找一个键（或插入新键的地方）时，它们从根遍历树到叶，与树节点中存储的键进行比较并根据比较进行选择，继续在左子树或右子树中搜索。平均而言，这意味着每次比较都允许操作跳过大约一半的树，因此每次查找、插入或删除所花费的时间与树中存储的项目数的对数成正比。这比在（未排序的）数组中按键查找项目所需的线性时间要好得多，但比哈希表上的相应操作慢。

大小为 9，深度为 3，根为 8 的二叉搜索树。叶子没有画。
![二叉搜索树](https://upload.wikimedia.org/wikipedia/commons/d/da/Binary_search_tree.svg)

## 基本操作的伪代码
### 插入

```txt
insert(value)
  Pre: value has passed custom type checks for type T
  Post: value has been placed in the correct location in the tree
  if root = ø
    root ← node(value)
  else
    insertNode(root, value)
  end if
end insert
``

```txt
insertNode(current, value)
  Pre: current is the node to start from
  Post: value has been placed in the correct location in the tree
  if value < current.value
    if current.left = ø
      current.left ← node(value)
    else
      InsertNode(current.left, value)
    end if
  else
    if current.right = ø
      current.right ← node(value)
    else
      InsertNode(current.right, value)
    end if
  end if
end insertNode

``

## 复杂性

### 时间复杂度

| 访问 | 搜索 | 插入 | 删除 |
| :-------: | :-------: | :-------: | :-------: |
| O(log(n)) | O(log(n)) | O(log(n)) | O(log(n)) |

### 空间复杂度

O(n)